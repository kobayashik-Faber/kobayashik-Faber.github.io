<script>
  import Counter from "./Counter.svelte";
  import welcome from "$lib/images/svelte-welcome.webp";
  import welcome_fallback from "$lib/images/svelte-welcome.png";
</script>

<svelte:head>
  <title>Home</title>
  <meta name="description" content="Svelte demo app" />
  <!-- Mieruca Optimize Tag -->
  <script type="text/javascript" id="mierucaOptimizejs">
    window.__optimizeid = window.__optimizeid || [];
    __optimizeid.push([1150133615]);
    (function () {
      var fjs = document.createElement("script");
      fjs.type = "text/javascript";
      fjs.async = true;
      fjs.id = "fjssync";
      var timestamp = new Date();
      fjs.src =
        "https://dev.opt.mieru-ca.com/service/js/mieruca-optimize-dev.js?v=" +
        timestamp.getTime();
      var x = document.getElementsByTagName("script")[0];
      x.parentNode.insertBefore(fjs, x);
    })();
  </script>
  <!-- End Mieruca Optimize Tag -->
</svelte:head>

<section>
  <h1>
    <span class="welcome">
      <picture>
        <source srcset={welcome} type="image/webp" />
        <img src={welcome_fallback} alt="Welcome" />
      </picture>
    </span>

    to your new<br />SvelteKit app
  </h1>

  <h2>
    try editing <strong>src/routes/+page.svelte</strong>
  </h2>

  <Counter />
</section>

<style>
  section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 0.6;
  }

  h1 {
    width: 100%;
  }

  .welcome {
    display: block;
    position: relative;
    width: 100%;
    height: 0;
    padding: 0 0 calc(100% * 495 / 2048) 0;
  }

  .welcome img {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    display: block;
  }
</style>
