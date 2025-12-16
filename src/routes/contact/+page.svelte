<script lang="ts">
	import { css } from 'styled-system/css';

	const mainStyles = css({
		backgroundColor: 'black',
		color: 'white',
		minHeight: '100vh',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		paddingX: { base: 'lg', lg: 'xl' }
	});

	const containerStyles = css({
		textAlign: 'center',
		maxWidth: '600px'
	});

	const titleStyles = css({
		fontSize: '3xl',
		marginBottom: '2xl',
		letterSpacing: 'wide'
	});

	const descriptionStyles = css({
		fontSize: 'lg',
		color: 'lightGrey',
		marginBottom: '3xl',
		lineHeight: 'loose'
	});

	const buttonStyles = css({
		display: 'inline-block',
		backgroundColor: 'white',
		color: 'black',
		paddingX: '3xl',
		paddingY: 'xl',
		fontSize: 'sm',
		letterSpacing: 'wide',
		textDecoration: 'none',
		border: '1px solid',
		borderColor: 'white',
		transition: 'all 0.2s ease',
		cursor: 'pointer',
		_hover: {
			backgroundColor: 'black',
			color: 'white'
		}
	});

	const noteStyles = css({
		fontSize: 'sm',
		color: 'mediumGrey',
		marginTop: '2xl',
		fontStyle: 'italic'
	});
</script>

<svelte:head>
	<title>Contact - Kobayashi Kota</title>
	<meta name="description" content="Contact Kobayashi Kota" />
</svelte:head>

<main class={mainStyles}>
	<div class={containerStyles}>
		<h1 class={titleStyles}>CONTACT</h1>
		
		<p class={descriptionStyles}>
			お仕事のご依頼やお問い合わせは<br />
			下記のフォームよりご連絡ください．
		</p>
		
		<!-- Google Form link placeholder - URL will be set later -->
		<a 
			href="#contact-form"
			class={buttonStyles}
			role="button"
			aria-label="Contact form (will be updated with Google Form URL)"
		>
			CONTACT FORM
		</a>

		<p class={noteStyles}>
			* フォームのリンクは後ほど設定されます
		</p>
	</div>
</main>