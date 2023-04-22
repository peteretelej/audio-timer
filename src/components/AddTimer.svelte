<script>
  import { createEventDispatcher } from "svelte";
  import db from "./db";

  const dispatch = createEventDispatcher();

  let name = "";
  let duration = 0;
  let audio = "";
  let unit = "seconds";

  async function addTimer() {
    let seconds = 0;
    if (unit === "seconds") {
        seconds = duration;
    } else if (unit === "minutes") {
        seconds = duration * 60;
    } else if (unit === "hours") {
        seconds = duration * 3600;
    }
    await db.timers.add({ duration, unit, audio, seconds });
    name = "";
    duration = 0;
    audio = "";
    dispatch("timeradded");
  }
</script>

<div>
  <h2>Add Timer</h2>

  <div class="flex justify-between pt-2 my-4 mx-4">
    <div>
      <label
        for="price"
        class="block text-sm font-medium leading-6 text-gray-900"
        >Duration</label
      >
      <div class="relative mt-2 rounded-md shadow-sm">
        <input
          type="text"
          name="price"
          id="price"
          class="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          bind:value={duration}
          placeholder="0"
        />
        <div class="absolute inset-y-0 right-0 flex items-center">
          <label for="unit" class="sr-only">unit</label>
          <select
            id="unit"
            name="unit"
            bind:value={unit} min="0"
            class="h-full rounded-md border-0 bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
          >
            <option>seconds</option>
            <option>minutes</option>
            <option>hours</option>
          </select>
        </div>
      </div>
    </div>
    <div class="w-full mx-4">
      <label
        for="name"
        class="ml-px block pl-4 text-sm font-medium leading-6 text-gray-900"
        >Text to Play</label
      >
      <div class="mt-2">
        <input
          type="text"
          name="name"
          id="name"
          class="block w-full rounded-full border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="Time is up!"
          bind:value={audio} 
        />
      </div>
    </div>
  </div>
  <div class="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
    <button type="submit" class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" on:click={addTimer}>Add Timer</button>
  </div>

</div>
