<script>
  import Footer from "../components/Footer.svelte";

</script>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta
      name="description"
      content="Audio Timer - Create timers with audio notifications."
    />
    <meta
      name="keywords"
      content="timers, timer, audio, notifications, countdown, svelte, browser timer"
    />
    <title>Audio Timer</title>
  </head>
  <body>
    <noscript
      >Enable JavaScript for the best experience with Audio Timers.</noscript
    >
    <div class="mx-auto max-w-7xl my-8 px-4 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-3xl">
        <slot />
      </div>
    </div>

	<Footer />
  </body>
</html>
