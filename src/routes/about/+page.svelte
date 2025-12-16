<script lang="ts">
	import { css } from 'styled-system/css';

	const mainStyles = css({
		backgroundColor: 'black',
		color: 'white',
		minHeight: '100vh',
		paddingY: '4xl'
	});

	const containerStyles = css({
		maxWidth: '1280px',
		marginX: 'auto',
		paddingX: { base: 'lg', lg: '5xl' },
		display: 'grid',
		gridTemplateColumns: { base: '1fr', lg: '1fr 2fr' },
		gap: '4xl',
		alignItems: 'start'
	});

	const titleStyles = css({
		fontSize: '3xl',
		letterSpacing: 'wide',
		marginBottom: '3xl',
		textAlign: { base: 'center', lg: 'left' }
	});

	const portraitStyles = css({
		aspectRatio: '3/4',
		backgroundColor: 'darkGrey',
		border: '1px solid',
		borderColor: 'accentGrey',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		fontSize: 'lg',
		color: 'mediumGrey'
	});

	const contentStyles = css({
		lineHeight: 'loose',
		fontSize: 'lg'
	});

	const sectionStyles = css({
		marginBottom: '2xl'
	});

	const sectionTitleStyles = css({
		fontSize: 'xl',
		marginBottom: 'lg',
		color: 'lightGrey',
		letterSpacing: 'wide'
	});

	const listStyles = css({
		paddingLeft: 'xl',
		color: 'mediumGrey'
	});
</script>

<svelte:head>
	<title>About - Kobayashi Kota</title>
	<meta name="description" content="About Kobayashi Kota - Product Engineer" />
</svelte:head>

<main class={mainStyles}>
	<div class={containerStyles}>
		<div>
			<h1 class={titleStyles}>ABOUT</h1>
			<div class={portraitStyles}>
				<!-- Portrait image placeholder -->
				Portrait
			</div>
		</div>
		
		<div class={contentStyles}>
			<section class={sectionStyles}>
				<h2 class={sectionTitleStyles}>Profile</h2>
				<p>
					スマートで，目先が利いて，几帳面，負けじ魂，これぞ船乗り．
				</p>
			</section>

			<section class={sectionStyles}>
				<h2 class={sectionTitleStyles}>Experience</h2>
				<p>
					2022年春に新卒でFaber Companyにジョインし，
					現在まで同社のミエルカシリーズの設計・開発・運用に携わる．
					ビジネス要件の理解から技術実装まで，
					プロダクトの成功に必要な幅広い領域に対応．
				</p>
			</section>

			<section class={sectionStyles}>
				<h2 class={sectionTitleStyles}>Skills</h2>
				<ul class={listStyles}>
					<li>プロダクト開発全般</li>
					<li>フロントエンド・バックエンド開発</li>
					<li>システム設計・アーキテクチャ</li>
					<li>インフラ・DevOps</li>
					<li>プロダクトマネジメント</li>
					<li>チーム開発・コラボレーション</li>
				</ul>
			</section>
		</div>
	</div>
</main>
