<script lang="ts">
	import { css } from 'styled-system/css';

	const footerStyles = css({
		backgroundColor: 'black',
		color: 'mediumGrey',
		textAlign: 'center',
		paddingY: 'xl',
		paddingX: 'lg',
		borderTop: '1px solid',
		borderColor: 'accentGrey'
	});

	const footerTextStyles = css({
		fontSize: 'sm',
		margin: 0
	});
</script>

<footer class={footerStyles}>
	<p class={footerTextStyles}>
		© 2024 kobayashik-Faber
	</p>
</footer>