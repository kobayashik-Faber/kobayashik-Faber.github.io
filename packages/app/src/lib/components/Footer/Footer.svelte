<script lang="ts">
  import {
    faFacebook,
    faGithub,
    faXTwitter,
  } from '@fortawesome/free-brands-svg-icons';
  import Fa from 'svelte-fa';

  import { footer } from './footer.recipe';
    import { FooterLink } from '.';

  const classes = footer();
</script>

<footer class={classes.root}>
  <div class={classes.links}>
    <FooterLink href="https://github.com/kobayashik-Faber" ariaLabel="GitHub">
      <Fa icon={faGithub} />
    </FooterLink>
    <FooterLink href="https://www.facebook.com/GLAEHD737WPBTL4GFRDF0IXXTVG364EQ" ariaLabel="Facebook">
      <Fa icon={faFacebook} />
    </FooterLink>
    <FooterLink href="https://x.com/cobacoch" ariaLabel="X (Twitter)">
      <Fa icon={faXTwitter} />
    </FooterLink>
  </div>
  <div class={classes.copyright}>&copy; 2025 kobayashik-Faber</div>
</footer>
