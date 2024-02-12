<script lang="ts">
  import { slide } from 'svelte/transition';

	import Lock from './Lock.svelte';

  export let categoryData: CategoryData;

  let hovering = false;
</script>

<button 
  class="w-full bg-secondary hover:brightness-125 px-4 py-3 rounded-md flex justify-between hover:ring-1 ring-primary transition"
  on:focus={() => hovering = true}
  on:focusout={() => hovering = false}
  on:mouseover={() => hovering = true}
  on:mouseleave={() => hovering = false}
  on:click={() => document.location.href = `/category/${categoryData.id}`}
>
  <section class="text-left">
    <h1 class="text-xl">{categoryData.name}</h1>
    {#if hovering}
      <div transition:slide={{ duration: 200 }} class="text-white/50">
        {categoryData.description}
      </div>
    {/if}
  </section>
  <div class="{categoryData.isLocked ? "" : "hidden"} opacity-50 my-auto">
    <Lock width="20" height="20" />
  </div>
</button>