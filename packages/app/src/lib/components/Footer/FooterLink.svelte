<script lang="ts">
  import type { HTMLAttributeAnchorTarget } from 'svelte/elements';

  import { footerLink } from './footerLink.recipe';

  export let href: string;
  export let ariaLabel: string | undefined = undefined;
  export let target: HTMLAttributeAnchorTarget = '_blank';

  const classes = footerLink();
</script>

<a class={classes.root} {href} {target} tabindex={0} aria-label={ariaLabel}>
  <slot />
</a>
