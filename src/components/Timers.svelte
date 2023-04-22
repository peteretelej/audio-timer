<script>
    
  import { onMount } from "svelte";
  import db from "./db";
  import AddTimer from "./AddTimer.svelte";
  import Timer from "./Timer.svelte";

  let timers = [];
  let addingTimer = false;

  onMount(async () => {
    timers = await db.timers.toArray();
    // reverse timers array
    timers = timers.reverse();
  });

  async function updateTimers() {
    timers = await db.timers.toArray();
    timers = timers.reverse();
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

<main class="">
  <div class="relative ">
    <div class="absolute inset-0 flex items-center" aria-hidden="true">
      <div class="w-full border-t border-gray-300" />
    </div>
    <div class="relative flex items-center justify-between">
      <span
        class="bg-white pr-3 text-base font-semibold leading-6 text-gray-900"
        >Timers</span
      >
      <button
        type="button"
        class="inline-flex items-center gap-x-1.5 rounded-full bg-white px-3 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
      >
        <svg
          class="-ml-1 -mr-0.5 h-5 w-5 text-gray-400"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z"
          />
        </svg>
        <button on:click={() => (addingTimer = !addingTimer)}>
          {addingTimer ? "Cancel" : "Add Timer"}
        </button>
      </button>
    </div>
  </div>

  {#if addingTimer}
  <div class="mx-auto rounded-lg shadow my-3 p-3">
    <AddTimer on:timeradded={updateTimers} />
  </div>
   
  {/if}

  <div class="overflow-hidden rounded-md bg-white shadow">
    <ul class="divide-y divide-gray-200">
      {#each timers as timer (timer.id)}
        <li class="px-6 py-4">
          <Timer {timer}  on:timerdeleted={updateTimers} />
        </li>
      {/each}
    </ul>
  </div>
  
</main>

<svelte:window on:beforeunload={beforeUnload} />
