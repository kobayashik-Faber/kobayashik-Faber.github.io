<script lang="ts">
  import { globalNavigationItem } from './globalNavigationItem.recipe';

  export let href: string;

  const classes = globalNavigationItem();
</script>

<li class={classes.root}>
  <a {href} tabindex={0}>
    <span class={classes.text}>
      <slot />
    </span>
  </a>
</li>
