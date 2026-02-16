<script lang="ts">
	import { css } from 'styled-system/css';
	import type { BlogPost } from '$lib/types';
	import { onMount, onDestroy } from 'svelte';

	interface Props {
		posts: BlogPost[];
		autoPlay?: boolean;
		interval?: number;
	}

	let { posts, autoPlay = false, interval = 5000 }: Props = $props();

	let currentIndex = $state(0);
	let intervalId: NodeJS.Timeout | null = null;
	let innerWidth = $state(0);


	// 画面サイズに応じたスライド数 (リアクティブに計算)
	let slidesPerView = $derived(innerWidth < 768 ? 1 : innerWidth < 1024 ? 2 : Math.min(3, posts.length));
	let maxIndex = $derived(Math.max(0, posts.length - slidesPerView));

	// 画面サイズ変更時に currentIndex を調整
	$effect(() => {
		if (currentIndex > maxIndex) {
			currentIndex = maxIndex;
		}
	});

	const nextSlide = () => {
		currentIndex = currentIndex >= maxIndex ? 0 : currentIndex + 1;
	};

	const prevSlide = () => {
		currentIndex = currentIndex <= 0 ? maxIndex : currentIndex - 1;
	};

	const goToSlide = (index: number) => {
		currentIndex = index;
	};

	const startAutoPlay = () => {
		if (autoPlay && posts.length > 1) {
			intervalId = setInterval(nextSlide, interval);
		}
	};

	const stopAutoPlay = () => {
		if (intervalId) {
			clearInterval(intervalId);
			intervalId = null;
		}
	};

	onMount(() => {
		startAutoPlay();
	});

	onDestroy(() => {
		stopAutoPlay();
	});

	// autoPlayが変更されたときの処理
	$effect(() => {
		stopAutoPlay();
		if (autoPlay && posts.length > 1) {
			startAutoPlay();
		}
	});

	const carouselContainerStyles = css({
		position: 'relative',
		width: '100%'
	});

	const carouselWrapperStyles = css({
		overflow: 'hidden',
		width: '100%',
		paddingY: 'xs'
	});

	const carouselTrackStyles = css({
		display: 'flex',
		transition: 'transform 0.5s ease-in-out',
		alignItems: 'stretch'
	});

	const slideContainerStyles = css({
		flexShrink: 0,
		paddingX: 'sm',
		paddingY: 'xs',
		display: 'flex',
		height: '100%'
	});

	const cardStyles = css({
		backgroundColor: 'darkGrey',
		border: '1px solid',
		borderColor: 'accentGrey',
		padding: 'lg',
		borderRadius: 'sm',
		flex: '1',
		minWidth: '0',
		transition: 'transform 0.2s ease, box-shadow 0.2s ease',
		_hover: {
			transform: 'translateY(-4px)',
			boxShadow: '0 8px 25px rgba(0,0,0,0.3)'
		}
	});

	const cardTitleStyles = css({
		fontSize: 'lg',
		fontWeight: 'medium',
		marginBottom: 'sm',
		color: 'white',
		lineHeight: 'tight',
		lineClamp: 2,
		overflow: 'hidden'
	});

	const cardMetaStyles = css({
		display: 'flex',
		alignItems: 'center',
		gap: 'sm',
		marginBottom: 'sm'
	});

	const cardDateStyles = css({
		fontSize: 'xs',
		color: 'mediumGrey'
	});

	const externalBadgeStyles = css({
		backgroundColor: 'accentGrey',
		color: 'white',
		fontSize: 'xs',
		paddingX: 'xs',
		paddingY: '1',
		borderRadius: 'xs'
	});

	const cardExcerptStyles = css({
		fontSize: 'sm',
		color: 'lightGrey',
		lineHeight: 'normal',
		lineClamp: 3,
		overflow: 'hidden'
	});

	const navigationStyles = css({
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginTop: 'xl'
	});

	const navButtonStyles = css({
		backgroundColor: 'transparent',
		border: '1px solid',
		borderColor: 'accentGrey',
		color: 'white',
		padding: 'sm',
		cursor: 'pointer',
		transition: 'all 0.2s ease',
		_hover: {
			backgroundColor: 'white',
			color: 'black'
		},
		_disabled: {
			opacity: '0.5',
			cursor: 'not-allowed'
		}
	});

	const dotsStyles = css({
		display: 'flex',
		gap: 'sm'
	});

	const dotStyles = css({
		width: '8px',
		height: '8px',
		borderRadius: '50%',
		backgroundColor: 'accentGrey',
		cursor: 'pointer',
		transition: 'backgroundColor 0.2s ease',
		_hover: {
			backgroundColor: 'lightGrey'
		}
	});

	const activeDotStyles = css({
		backgroundColor: 'white'
	});

	// Mobile responsive: show 1 slide on mobile, 2 on tablet, 3 on desktop
	const responsiveContainerStyles = css({
		display: 'grid',
		gridTemplateColumns: {
			base: '1fr',
			md: 'repeat(2, 1fr)',
			lg: 'repeat(3, 1fr)'
		},
		gap: 'xl'
	});
</script>

<svelte:window bind:innerWidth={innerWidth} />


<!-- Responsive Carousel -->
<div class={carouselContainerStyles}>
	<div class={carouselWrapperStyles}>
		<div 
			class={carouselTrackStyles}
			style="transform: translateX(-{currentIndex * (100 / slidesPerView)}%);"
		>
			{#each posts as post, index}
				<div class={slideContainerStyles} style="width: {100 / slidesPerView}%; flex: 0 0 {100 / slidesPerView}%;">
					{#if post.isExternal}
						<a href={post.url} target="_blank" rel="noopener noreferrer" style="color: inherit; text-decoration: none; display: flex; width: 100%; height: 100%;">
							<article class={cardStyles} style="width: 100%; margin: 0 auto; display: flex; flex-direction: column;">
								<h3 class={cardTitleStyles}>
									{post.title}
								</h3>
								<div class={cardMetaStyles}>
									<time class={cardDateStyles}>{post.date}</time>
									<span class={externalBadgeStyles}>External</span>
								</div>
								<p class={cardExcerptStyles} style="flex: 1;">{post.excerpt}</p>
							</article>
						</a>
					{:else}
						<a href="/blog/{post.slug}" style="color: inherit; text-decoration: none; display: flex; width: 100%; height: 100%;">
							<article class={cardStyles} style="width: 100%; margin: 0 auto; display: flex; flex-direction: column;">
								<h3 class={cardTitleStyles}>
									{post.title}
								</h3>
								<div class={cardMetaStyles}>
									<time class={cardDateStyles}>{post.date}</time>
								</div>
								<p class={cardExcerptStyles} style="flex: 1;">{post.excerpt}</p>
							</article>
						</a>
					{/if}
				</div>
			{/each}
		</div>
	</div>

	{#if posts.length > 1}
		<div class={navigationStyles}>
			<button 
				class={navButtonStyles}
				onclick={prevSlide}
				aria-label="Previous slide"
			>
				‹ Prev
			</button>

			<div class={dotsStyles}>
				{#each Array(maxIndex + 1) as _, index}
					<button
						class="{dotStyles} {currentIndex === index ? activeDotStyles : ''}"
						onclick={() => goToSlide(index)}
						aria-label="Go to slide {index + 1}"
					></button>
				{/each}
			</div>

			<button 
				class={navButtonStyles}
				onclick={nextSlide}
				aria-label="Next slide"
			>
				Next ›
			</button>
		</div>
	{/if}
</div>

<style>
	.hidden {
		display: none;
	}
	.block {
		display: block;
	}
	@media (min-width: 1024px) {
		.lg\\:block {
			display: block;
		}
		.lg\\:hidden {
			display: none;
		}
	}
</style>