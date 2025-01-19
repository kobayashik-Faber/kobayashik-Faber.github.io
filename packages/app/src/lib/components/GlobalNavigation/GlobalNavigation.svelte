<script lang="ts">
  import { GlobalNavigationItem } from '.';
  import { globalNavigation } from './globalNavigation.recipe';

  const classes = globalNavigation();
</script>

<div class={classes.root}>
  <button class={classes.button} type="button" aria-label="Toggle navigation">
    <span class={classes.icon}></span>
  </button>
  <input type="checkbox" class={classes.toggle} />
  <nav>
    <ul class={classes.menu}>
      <GlobalNavigationItem href="/blog/">Blog</GlobalNavigationItem>
      <GlobalNavigationItem href="/about/">About</GlobalNavigationItem>
      <GlobalNavigationItem href="/contact/">Contact</GlobalNavigationItem>
    </ul>
  </nav>
</div>
