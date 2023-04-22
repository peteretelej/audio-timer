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
  <body class="bg-gray-100">
    <noscript
      >Enable JavaScript for the best experience with Audio Timers.</noscript
    >
	<div >

    <div class="flex items-center justify-center my-6">
      <div class="text-center">
        <img
          src="images/audio-timer.png"
          alt="Audio Timer Logo"
          class="mx-auto mb-4 w-32 h-32 rounded"
		  max-width="32"  max-height="32"
        />
        <h1 class="text-4xl font-bold text-gray-800">Audio Timer</h1>
      </div>
    </div>

    <div class="mx-auto max-w-7xl my-8 px-4 sm:px-6 lg:px-8 ">
      <div class="mx-auto max-w-3xl rounded-lg shadow-md p-4 bg-white" >
        <slot />
      </div>
    </div>

    <Footer />
	</div>
  </body>
</html>
