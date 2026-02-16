<script lang="ts">
  import {css} from 'styled-system/css';
  import type {PageData} from './$types';

  // サーバーから取得したデータを受け取り
  let {data}: {data: PageData} = $props();

  const mainStyles = css({
    backgroundColor: 'black',
    color: 'white',
    minHeight: '100vh',
    paddingY: '4xl',
  });

  const containerStyles = css({
    maxWidth: '800px',
    marginX: 'auto',
    paddingX: {base: 'lg', lg: 'xl'},
  });

  const titleStyles = css({
    fontSize: '3xl',
    letterSpacing: 'wide',
    marginBottom: '3xl',
    textAlign: 'center',
  });

  const articleStyles = css({
    borderBottom: '1px solid',
    borderColor: 'accentGrey',
    paddingY: '2xl',
    _last: {borderBottom: 'none'},
  });

  const articleTitleStyles = css({
    fontSize: 'xl',
    marginBottom: 'sm',
    color: 'white',
  });

  const articleLinkStyles = css({
    textDecoration: 'none',
    color: 'inherit',
    _hover: {
      color: 'lightGrey',
    },
  });

  const metaStyles = css({
    fontSize: 'sm',
    color: 'mediumGrey',
    marginBottom: 'md',
    display: 'flex',
    alignItems: 'center',
    gap: 'md',
    flexWrap: 'wrap',
  });

  const externalBadgeStyles = css({
    backgroundColor: 'accentGrey',
    color: 'white',
    fontSize: 'xs',
    paddingX: 'sm',
    paddingY: 'xs',
    borderRadius: 'sm',
  });

  const tagsStyles = css({
    display: 'flex',
    gap: 'sm',
    flexWrap: 'wrap',
  });

  const tagStyles = css({
    backgroundColor: 'darkGrey',
    color: 'lightGrey',
    fontSize: 'xs',
    paddingX: 'sm',
    paddingY: 'xs',
    borderRadius: 'sm',
  });

  const excerptStyles = css({
    color: 'lightGrey',
    lineHeight: 'normal',
    marginBottom: 'md',
  });
</script>

<svelte:head>
  <title>Blog - Kobayashi Kota</title>
  <meta name="description" content="Blog articles by Kobayashi Kota" />
</svelte:head>

<main class={mainStyles}>
  <div class={containerStyles}>
    <h1 class={titleStyles}>BLOG</h1>

    {#each data.allPosts as post}
      <article class={articleStyles}>
        <h2 class={articleTitleStyles}>
          {#if post.isExternal && post.url}
            <a
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              class={articleLinkStyles}
            >
              {post.title}
            </a>
          {:else}
            <a href="/blog/{post.id}" class={articleLinkStyles}>
              {post.title}
            </a>
          {/if}
        </h2>

        <div class={metaStyles}>
          <time>{post.date}</time>
          {#if post.isExternal}
            <span class={externalBadgeStyles}>External</span>
          {/if}
          {#if post.categories && post.categories.length > 0}
            <div class={tagsStyles}>
              {#each post.categories as category}
                <span class={tagStyles}>{category}</span>
              {/each}
            </div>
          {/if}
        </div>

        <p class={excerptStyles}>{post.excerpt}</p>
      </article>
    {/each}
  </div>
</main>
