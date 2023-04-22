<script>
  import { createEventDispatcher } from "svelte";
  import db from "./db";

  const dispatch = createEventDispatcher();

  import { onDestroy } from "svelte";
  import Play from "../icons/Play.svelte";
  import Trash from "../icons/Trash.svelte";
  import Stop from "../icons/Stop.svelte";

  export let timer;

  let interval;
  let remainingTime = timer.seconds;
  let running = false;

  function startTimer() {
    if (running) return;
    running = true;
    const endTime = Date.now() + remainingTime * 1000;
    interval = setInterval(() => {
      remainingTime = Math.round((endTime - Date.now()) / 1000);
      if (remainingTime <= 0) {
        clearInterval(interval);
        running = false;
        remainingTime = timer.seconds;
        playAudio();
      }
    }, 1000);
  }

  function stopTimer() {
    clearInterval(interval);
    running = false;
    remainingTime = timer.seconds;
  }

  function playAudio() {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(timer.audio);
    synth.speak(utterance);
  }

  function deleteTimer() {
    stopTimer();
    db.timers.delete(timer.id);
    dispatch("timerdeleted");
  }

  onDestroy(() => {
    clearInterval(interval);
  });
</script>

<div>
  <h3 class="text-base font-semibold text-gray-900">{timer.audio}</h3>
  <p>Duration: {timer.duration} {timer.unit}</p>
  <p>Remaining time: {remainingTime} seconds</p>
  <div class="w-full flex justify-between my-2">
    <div>
      {#if running}
        <button
          on:click={stopTimer}
          class="flex items-center bg-gray-700 text-white text-sm font-bold rounded-lg p-2"
        >
          <Stop />
          Stop Timer</button
        >
      {:else}
        <button
          on:click={startTimer}
          class="flex items-center bg-green-500 text-white text-sm font-bold rounded-lg p-2"
        >
          <Play />
          Start Timer
        </button>
      {/if}
    </div>
    <div>
      <button
        on:click={deleteTimer}
        class="flex items-center bg-red-500 text-white text-sm font-bold rounded-lg p-2"
      >
        <Trash />
        Delete Timer</button
      >
    </div>
  </div>
</div>
