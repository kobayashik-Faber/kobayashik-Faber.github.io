<script lang="ts">
  import { GlobalNavigation, Logo } from '$lib/components';

  import { header } from './header.recipe';

  $: classes = header();
</script>

<header class={classes.root}>
  <a href="/">
    <Logo />
  </a>

  <GlobalNavigation />
</header>
