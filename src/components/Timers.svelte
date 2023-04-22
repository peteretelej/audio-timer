<script>
  import { onMount } from "svelte";
  import db from "./db";
  import AddTimer from "./AddTimer.svelte";
  import Timer from "./Timer.svelte";

  let timers = [];
  let addingTimer = false;

  onMount(async () => {
    timers = await db.timers.toArray();
  });

  async function updateTimers() {
    timers = await db.timers.toArray();
  }

  function beforeUnload() {
    // Cancel the event as stated by the standard.
    event.preventDefault();
    // Chrome requires returnValue to be set.
    event.returnValue = "";
    // more compatibility
    return "...";
  }

  
</script>

<main>
  <h1>Timers App</h1>
  <button on:click={() => (addingTimer = !addingTimer)}>
    {addingTimer ? "Cancel" : "Add Timer"}
  </button>
  {#if addingTimer}
    <AddTimer on:timeradded={updateTimers} />
  {/if}
  <ul>
    {#each timers as timer (timer.id)}
      <li>
        <Timer {timer} />
      </li>
    {/each}
  </ul>
</main>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }

  ul {
    list-style: none;
    padding: 0;
  }

  li {
    background-color: #eee;
    margin-bottom: 1em;
    padding: 1em;
    border-radius: 8px;
  }
</style>

<svelte:window on:beforeunload={beforeUnload}/>