<script lang="ts">
	import { page } from '$app/stores';
	import { css } from 'styled-system/css';
	import type { NavigationItem } from '$lib/types';

	const navigationItems: NavigationItem[] = [
		{ href: '/', label: 'Home' },
		{ href: '/about', label: 'About' },
		{ href: '/blog', label: 'Blog' },
		{ href: '/contact', label: 'Contact' }
	];

	$: currentPath = $page.url.pathname;

	const navStyles = css({
		position: 'fixed',
		top: 0,
		left: 0,
		right: 0,
		backgroundColor: 'black/80',
		backdropBlur: 'md',
		paddingY: 'md',
		paddingX: { base: 'lg', lg: '5xl' },
		zIndex: 50
	});

	const navListStyles = css({
		display: 'flex',
		justifyContent: 'center',
		gap: '2xl',
		listStyle: 'none',
		margin: 0,
		padding: 0
	});

	const navItemStyles = css({
		color: 'white',
		textDecoration: 'none',
		fontSize: 'sm',
		letterSpacing: 'wide',
		position: 'relative',
		transition: 'color 0.2s ease',
		_after: {
			content: '""',
			position: 'absolute',
			bottom: '-4px',
			left: 0,
			width: '0',
			height: '1px',
			backgroundColor: 'white',
			transition: 'width 0.3s ease'
		},
		_hover: {
			_after: {
				width: '100%'
			}
		}
	});

	const activeNavItemStyles = css({
		_after: {
			width: '100%'
		}
	});
</script>

<nav class={navStyles}>
	<ul class={navListStyles}>
		{#each navigationItems as item}
			<li>
				<a
					href={item.href}
					class="{navItemStyles} {currentPath === item.href ? activeNavItemStyles : ''}"
				>
					{item.label}
				</a>
			</li>
		{/each}
	</ul>
</nav>

<!-- Spacer for fixed navigation -->
<div class={css({ height: '80px' })}></div>