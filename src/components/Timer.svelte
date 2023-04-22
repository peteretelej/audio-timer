<script>
    import { onDestroy } from "svelte";
  
    export let timer;
  
    let interval;
    let remainingTime = timer.duration;
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
          remainingTime = timer.duration;
          playAudio();
        }
      }, 1000);
    }
  
    function playAudio() {
      const synth = window.speechSynthesis;
      const utterance = new SpeechSynthesisUtterance(timer.audio);
      synth.speak(utterance);
    }
  
    onDestroy(() => {
      clearInterval(interval);
    });
  </script>
  
  <div>
    <h3>{timer.name}</h3>
    <p>Duration: {timer.duration} seconds</p>
    <p>Remaining time: {remainingTime} seconds</p>
    <button on:click="{startTimer}" disabled="{running}">
      {running ? "Running..." : "Start Timer"}
    </button>
  </div>
  