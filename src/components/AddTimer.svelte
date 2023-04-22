<script>
  import { createEventDispatcher } from "svelte";
  import db from "./db";

  const dispatch = createEventDispatcher();

  let name = "";
  let duration = 0;
  let audio = "";

  async function addTimer() {
    await db.timers.add({ name, duration, audio });
    name = "";
    duration = 0;
    audio = "";
    dispatch("timeradded");
  }
</script>

<div>
  <h2>Add Timer</h2>
  <label>
    Name:
    <input type="text" bind:value={name} />
  </label>
  <label>
    Duration (seconds):
    <input type="number" min="0" bind:value={duration} />
  </label>
  <label>
    Audio Text:
    <input type="text" bind:value={audio} />
  </label>
  <button on:click={addTimer}>Add Timer</button>
</div>
