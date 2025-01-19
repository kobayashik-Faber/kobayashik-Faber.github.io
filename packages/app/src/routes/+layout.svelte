<script lang="ts">
  import '../app.css';

  import SvelteSEO from 'svelte-seo';

  import '@fontsource/oswald/latin-700.css';
  import '@fontsource-variable/noto-sans-jp';

  import { Footer, Header } from '$lib/components';
  import { css } from 'styled-system/css';
</script>

<SvelteSEO title="@kobayashik-Faber" />

<div
  class={css({
    display: 'grid',
    gridTemplateRows: 'auto 1fr auto',
    minH: 'screen',
  })}
>
  <Header />

  <div
    class={css({
      px: {
        md: 10,
        mdDown: 5,
      },
    })}
  >
    <slot />
  </div>

  <Footer />
</div>
