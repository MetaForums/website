<script lang="ts">
	import { onMount } from 'svelte';
  import { baseApiUrl } from "$src/constants";
  import { page } from "$app/stores";

  import Thread from '$lib/Thread.svelte';

  export let data: { category: string, categoryData: CategoryData };

  const user = $page.data.user as Option<UserData>;
  const canPost = (user && !data.categoryData.isLocked) || ['OWNER', 'ADMIN'].includes(user?.role ?? '');

  let threads: ThreadData[] = [];
  
  let nextPage = 1;
  let loading = false;
  let endOfPage = false;

  let yPosition = 0;
  let scrollHeight = 0;

  let createThreadMenuVisible = false;
  let creating = false;

  $: {
    if (yPosition >= scrollHeight && nextPage > 1 && !loading) {
      getThreads(nextPage);
    }
  }

  async function getThreads(page: number) {
    if (endOfPage || loading) return;
    loading = true;
    const newThreads: ThreadData[] = await fetch(`${baseApiUrl}/categories/${data.category}/threads?page=${page}`)
      .then((data) => data.json());
    if (newThreads.length < 10)
      endOfPage = true;
    threads = [...threads, ...newThreads];
    nextPage++
    loading = false;
  }

  onMount(async () => {
    await getThreads(nextPage);
  });
</script>

<main class="w-full max-w-7xl mx-auto px-8 flex flex-col gap-2 pt-2">
  <div class="flex items-center justify-between">
    <h1 class="text-2xl">Threads</h1>
    <button 
      class="rounded-md px-3 py-2 transition { canPost ? "bg-blue-700 hover:bg-blue-800" : "bg-secondary cursor-not-allowed" }"
      disabled={!user}
      on:click={() => {
        if (canPost)
          createThreadMenuVisible = !createThreadMenuVisible;
      }}
    >Create a Thread</button>
  </div>

  {#each threads as thread}
    <Thread threadData={thread} />
  {/each}

  {#if loading}
    <p>Loading more...</p>
  {/if}
  
  {#if endOfPage}
    <p class="text-foreground/50">Theres nothing else here {"¯\\_(ツ)_/¯"}</p>
  {/if}
</main>

{#if createThreadMenuVisible}
  <div class="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
    <form 
      class="bg-background p-4 rounded-md max-w-lg w-full mx-8 my-8"
      method="post"
    >
      <h1 class="text-2xl">Create a Thread</h1>
      <div class="flex flex-col gap-1 w-full">
        <input type="text" name="title" placeholder="Title" class="w-full rounded-md p-2 bg-secondary" />
        <textarea name="content" placeholder="Content" class="w-full rounded-md p-2 bg-secondary" />
        <input type="text" name="tags" placeholder="Tags (comma separated)" class="w-full rounded-md p-2 bg-secondary" />
        <button class="w-full bg-primary rounded-md p-2 mt-2" type="submit">Create</button>
        <button 
          class="w-full bg-secondary rounded-md p-2 mt-2"
          on:click={() => createThreadMenuVisible = false}
        >Cancel</button>
      </div>
    </form>
  </div>
{/if}

<svelte:window bind:scrollY={yPosition} />
<svelte:body bind:offsetHeight={scrollHeight} />
