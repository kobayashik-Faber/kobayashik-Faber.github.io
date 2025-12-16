<script lang="ts">
	import { css } from 'styled-system/css';
	import type { PageData } from './$types';
	
	// サーバーから取得したデータを受け取り
	let { data }: { data: PageData } = $props();

	const mainStyles = css({
		backgroundColor: 'black',
		color: 'white',
		minHeight: '100vh',
		paddingY: '4xl'
	});

	const containerStyles = css({
		maxWidth: '800px',
		marginX: 'auto',
		paddingX: { base: 'lg', lg: 'xl' }
	});

	const backLinkStyles = css({
		display: 'inline-block',
		color: 'lightGrey',
		textDecoration: 'none',
		marginBottom: '2xl',
		fontSize: 'sm',
		transition: 'color 0.2s ease',
		_hover: {
			color: 'white'
		}
	});

	const headerStyles = css({
		marginBottom: '3xl',
		borderBottom: '1px solid',
		borderColor: 'accentGrey',
		paddingBottom: '2xl'
	});

	const titleStyles = css({
		fontSize: { base: '2xl', lg: '4xl' },
		fontWeight: 'light',
		letterSpacing: 'tight',
		marginBottom: 'lg',
		lineHeight: 'tight'
	});

	const metaStyles = css({
		fontSize: 'sm',
		color: 'mediumGrey',
		display: 'flex',
		alignItems: 'center',
		gap: 'md',
		flexWrap: 'wrap',
		marginBottom: 'lg'
	});

	const badgeStyles = css({
		backgroundColor: 'darkGrey',
		color: 'lightGrey',
		fontSize: 'xs',
		paddingX: 'sm',
		paddingY: 'xs',
		borderRadius: 'sm'
	});

	const contentStyles = css({
		lineHeight: 'loose',
		fontSize: 'lg',
		color: 'lightGrey',
		'& h1': {
			fontSize: '2xl',
			fontWeight: 'medium',
			color: 'white',
			marginTop: '3xl',
			marginBottom: 'xl',
			letterSpacing: 'tight'
		},
		'& h2': {
			fontSize: 'xl',
			fontWeight: 'medium',
			color: 'white',
			marginTop: '2xl',
			marginBottom: 'lg',
			letterSpacing: 'tight'
		},
		'& h3': {
			fontSize: 'lg',
			fontWeight: 'medium',
			color: 'white',
			marginTop: 'xl',
			marginBottom: 'md'
		},
		'& p': {
			marginBottom: 'lg'
		},
		'& ul': {
			listStyle: 'disc',
			paddingLeft: 'xl',
			marginBottom: 'lg'
		},
		'& li': {
			marginBottom: 'xs'
		},
		'& pre': {
			backgroundColor: 'charcoal',
			border: '1px solid',
			borderColor: 'accentGrey',
			borderRadius: 'sm',
			padding: 'lg',
			marginY: 'xl',
			overflow: 'auto'
		},
		'& code': {
			backgroundColor: 'darkGrey',
			color: 'white',
			padding: 'xs',
			borderRadius: 'xs',
			fontSize: 'sm',
			fontFamily: 'mono'
		},
		'& pre code': {
			backgroundColor: 'transparent',
			padding: '0'
		}
	});

	const tagsStyles = css({
		display: 'flex',
		gap: 'sm',
		flexWrap: 'wrap'
	});

	const tagStyles = css({
		backgroundColor: 'accentGrey',
		color: 'white',
		fontSize: 'xs',
		paddingX: 'sm',
		paddingY: 'xs',
		borderRadius: 'sm'
	});
</script>

<svelte:head>
	<title>{data.post.title} - Kobayashi Kota</title>
	<meta name="description" content={data.post.excerpt} />
</svelte:head>

<main class={mainStyles}>
	<div class={containerStyles}>
		<!-- Back to blog link -->
		<a href="/blog" class={backLinkStyles}>
			← Back to Blog
		</a>

		<!-- Article header -->
		<header class={headerStyles}>
			<h1 class={titleStyles}>{data.post.title}</h1>
			
			<div class={metaStyles}>
				<time>{data.post.date}</time>
				
				{#if !data.post.isExternal}
					<span class={badgeStyles}>Internal</span>
				{/if}
				
				{#if data.post.source}
					<span>Source: {data.post.source}</span>
				{/if}
			</div>

			{#if data.post.categories && data.post.categories.length > 0}
				<div class={metaStyles}>
					<span>Categories:</span>
					{#each data.post.categories as category}
						<span class={badgeStyles}>{category}</span>
					{/each}
				</div>
			{/if}

			{#if data.post.tags && data.post.tags.length > 0}
				<div class={metaStyles}>
					<span>Tags:</span>
					<div class={tagsStyles}>
						{#each data.post.tags as tag}
							<span class={tagStyles}>{tag}</span>
						{/each}
					</div>
				</div>
			{/if}
		</header>

		<!-- Article content -->
		<article class={contentStyles}>
			{@html data.content}
		</article>
	</div>
</main>