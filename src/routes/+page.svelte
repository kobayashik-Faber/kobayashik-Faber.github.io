<script lang="ts">
  import {css} from 'styled-system/css';
  import BlogCarousel from '$lib/components/BlogCarousel.svelte';
  import type {PageData} from './$types';

  // サーバーから取得したデータを受け取り
  let {data}: {data: PageData} = $props();

  const heroStyles = css({
    minHeight: '100vh',
    backgroundColor: 'black',
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    paddingX: {base: 'lg', lg: '5xl'},
    paddingY: '4xl',
  });

  const nameStyles = css({
    fontSize: {base: '3xl', lg: '4xl'},
    fontWeight: 'light',
    letterSpacing: 'tight',
    marginBottom: 'md',
  });

  const titleStyles = css({
    fontSize: 'lg',
    color: 'lightGrey',
    letterSpacing: 'wide',
  });

  const blogSectionStyles = css({
    backgroundColor: 'charcoal',
    paddingY: '4xl',
    paddingX: {base: 'lg', lg: '5xl'},
  });

  const sectionTitleStyles = css({
    fontSize: '2xl',
    color: 'white',
    marginBottom: '2xl',
    letterSpacing: 'wide',
  });
</script>

<svelte:head>
  <title>Kobayashi Kota - Portfolio</title>
  <meta name="description" content="Product Engineer Portfolio" />
</svelte:head>

<!-- Hero Section -->
<section class={heroStyles}>
  <h1 class={nameStyles}>KOBAYASHI KOTA</h1>
  <p class={titleStyles}>Product Engineer</p>
</section>

<!-- Blog Section -->
<section class={blogSectionStyles}>
  <h2 class={sectionTitleStyles}>LATEST ARTICLES</h2>

  <BlogCarousel posts={data.latestPosts} autoPlay={true} interval={6000} />
</section>
