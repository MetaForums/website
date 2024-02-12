<script lang="ts">
  import Lock from './Lock.svelte';

  export let threadData: ThreadData;
</script>

<button 
  class="w-full bg-secondary hover:brightness-125 px-4 py-3 rounded-md flex justify-between hover:ring-1 ring-primary transition"
  on:click={() => document.location.href = `/thread/${threadData.id}`}
>
  <section class="text-left">
    <div class="flex gap-4 items-center">
      <h1 class="text-xl">{threadData.title}</h1>
      <div class="flex gap-2">
        {#each threadData.tags as tag}
          <div class="rounded-md px-2 py-1 bg-sky-800/20">#{tag}</div>
        {/each}
      </div>
    </div> 
    <p class="text-foreground/50">By <span class="text-foreground">{threadData.author.displayName}</span> at {new Date(threadData.createdAt).toLocaleDateString()}</p>
  </section>
  <div class="{threadData.isLocked ? "" : "hidden"} opacity-50 my-auto">
    <Lock width="20" height="20" />
  </div>
</button>