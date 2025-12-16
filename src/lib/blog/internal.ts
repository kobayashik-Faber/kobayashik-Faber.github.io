import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';
import type { BlogPost } from '$lib/types';

interface FrontMatter {
	title: string;
	date: string;
	slug: string;
	excerpt: string;
	categories?: string[];
	tags?: string[];
}

/**
 * Frontmatterを解析する
 * @param content Markdownファイルの内容
 * @returns Frontmatterオブジェクトとコンテンツ
 */
function parseFrontMatter(content: string): { frontmatter: FrontMatter; content: string } {
	const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
	
	if (!match) {
		throw new Error('Invalid frontmatter format');
	}

	const frontmatterText = match[1];
	const markdownContent = match[2];

	// 簡易YAML解析（基本的なkey: value形式のみ）
	const frontmatter: Partial<FrontMatter> = {};
	
	frontmatterText.split('\n').forEach(line => {
		const [key, ...valueParts] = line.split(':');
		if (key && valueParts.length > 0) {
			const value = valueParts.join(':').trim();
			
			// 配列の処理
			if (value.startsWith('[') && value.endsWith(']')) {
				const arrayValue = value.slice(1, -1)
					.split(',')
					.map(item => item.trim().replace(/['"]/g, ''));
				frontmatter[key.trim() as keyof FrontMatter] = arrayValue as any;
			} else {
				// 文字列値の処理（クォートを除去）
				frontmatter[key.trim() as keyof FrontMatter] = value.replace(/['"]/g, '') as any;
			}
		}
	});

	// 必須フィールドの検証
	if (!frontmatter.title || !frontmatter.date || !frontmatter.slug || !frontmatter.excerpt) {
		throw new Error('Missing required frontmatter fields');
	}

	return {
		frontmatter: frontmatter as FrontMatter,
		content: markdownContent.trim()
	};
}

/**
 * MarkdownからHTMLに変換（改良版）
 * @param markdown Markdownコンテンツ  
 * @returns HTML文字列
 */
function markdownToHtml(markdown: string): string {
	// 行ごとに処理
	const lines = markdown.split('\n');
	const htmlLines: string[] = [];
	let inCodeBlock = false;
	let inList = false;
	let codeBlockContent: string[] = [];

	for (let i = 0; i < lines.length; i++) {
		const line = lines[i];
		
		// コードブロックの処理
		if (line.startsWith('```')) {
			if (inCodeBlock) {
				// コードブロック終了
				const language = lines[i - codeBlockContent.length - 1].slice(3);
				const code = codeBlockContent.join('\n');
				htmlLines.push(`<pre><code class="language-${language}">${escapeHtml(code)}</code></pre>`);
				codeBlockContent = [];
				inCodeBlock = false;
			} else {
				// コードブロック開始
				inCodeBlock = true;
			}
			continue;
		}

		if (inCodeBlock) {
			codeBlockContent.push(line);
			continue;
		}

		// リストの処理
		if (line.startsWith('- ')) {
			if (!inList) {
				htmlLines.push('<ul>');
				inList = true;
			}
			const text = processInlineMarkdown(line.slice(2));
			htmlLines.push(`<li>${text}</li>`);
			continue;
		} else if (inList) {
			htmlLines.push('</ul>');
			inList = false;
		}

		// ヘッダーの処理
		if (line.startsWith('### ')) {
			htmlLines.push(`<h3>${processInlineMarkdown(line.slice(4))}</h3>`);
		} else if (line.startsWith('## ')) {
			htmlLines.push(`<h2>${processInlineMarkdown(line.slice(3))}</h2>`);
		} else if (line.startsWith('# ')) {
			htmlLines.push(`<h1>${processInlineMarkdown(line.slice(2))}</h1>`);
		} else if (line.trim() === '') {
			// 空行はそのまま
			htmlLines.push('');
		} else {
			// 通常の段落
			htmlLines.push(`<p>${processInlineMarkdown(line)}</p>`);
		}
	}

	// 最後にリストが開いている場合は閉じる
	if (inList) {
		htmlLines.push('</ul>');
	}

	return htmlLines.join('\n');
}

/**
 * インラインマークダウン要素の処理
 * @param text テキスト
 * @returns 処理済みHTML
 */
function processInlineMarkdown(text: string): string {
	return text
		// インラインコード
		.replace(/`([^`]+)`/g, '<code>$1</code>')
		// ボールド
		.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
		// イタリック
		.replace(/\*([^*]+)\*/g, '<em>$1</em>');
}

/**
 * HTMLエスケープ
 * @param text テキスト
 * @returns エスケープ済みテキスト
 */
function escapeHtml(text: string): string {
	return text
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#39;');
}

/**
 * 内部記事を全て取得
 * @returns BlogPost配列
 */
export async function getInternalBlogPosts(): Promise<BlogPost[]> {
	try {
		const postsDirectory = join(process.cwd(), 'content', 'posts');
		const filenames = readdirSync(postsDirectory);
		const markdownFiles = filenames.filter(name => name.endsWith('.md'));

		const posts = markdownFiles.map(filename => {
			const filePath = join(postsDirectory, filename);
			const fileContent = readFileSync(filePath, 'utf8');
			
			const { frontmatter } = parseFrontMatter(fileContent);

			const blogPost: BlogPost = {
				id: frontmatter.slug,
				title: frontmatter.title,
				excerpt: frontmatter.excerpt,
				date: frontmatter.date,
				url: `/blog/${frontmatter.slug}`,
				slug: frontmatter.slug,
				isExternal: false,
				categories: frontmatter.categories || [],
				source: 'Internal',
				tags: frontmatter.tags
			};

			return blogPost;
		});

		// 日付順（新しい順）でソート
		return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

	} catch (error) {
		console.error('Error reading internal blog posts:', error);
		return [];
	}
}

/**
 * 特定の記事を取得
 * @param slug 記事のslug
 * @returns 記事データとHTMLコンテンツ
 */
export async function getInternalBlogPost(slug: string): Promise<{
	post: BlogPost;
	content: string;
} | null> {
	try {
		const postsDirectory = join(process.cwd(), 'content', 'posts');
		const filePath = join(postsDirectory, `${slug}.md`);
		
		const fileContent = readFileSync(filePath, 'utf8');
		const { frontmatter, content } = parseFrontMatter(fileContent);

		const post: BlogPost = {
			id: frontmatter.slug,
			title: frontmatter.title,
			excerpt: frontmatter.excerpt,
			date: frontmatter.date,
			url: `/blog/${frontmatter.slug}`,
			slug: frontmatter.slug,
			isExternal: false,
			categories: frontmatter.categories || [],
			source: 'Internal',
			tags: frontmatter.tags
		};

		const htmlContent = markdownToHtml(content);

		return {
			post,
			content: htmlContent
		};

	} catch (error) {
		console.error(`Error reading blog post "${slug}":`, error);
		return null;
	}
}

/**
 * サーバーサイド環境判定
 * @returns サーバーサイドかどうか
 */
function isServerSide(): boolean {
	return typeof window === 'undefined';
}

/**
 * ビルド時環境に応じた内部記事取得
 */
export async function getInternalBlogPostsForEnvironment(): Promise<BlogPost[]> {
	if (isServerSide()) {
		return await getInternalBlogPosts();
	}
	// クライアントサイドでは空配列（必要に応じてAPIエンドポイントから取得）
	return [];
}