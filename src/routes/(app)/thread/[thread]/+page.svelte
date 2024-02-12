<script lang="ts">
	import { onMount } from 'svelte';
  import { baseApiUrl } from "$src/constants";

  import Post from '$src/lib/Post.svelte';

  export let data: { thread: string };

  let posts: PostData[] = [];
  
  let nextPage = 1;
  let loading = false;
  let endOfPage = false;

  let yPosition = 0;
  let scrollHeight = 0;

  let createPostMenuVisible = false;

  $: {
    if (yPosition >= scrollHeight && nextPage > 1 && !loading) {
      getPosts(nextPage);
    }
  }

  async function getPosts(page: number) {
    if (endOfPage || loading) return;
    loading = true;
    const newPosts: PostData[] = await fetch(`${baseApiUrl}/threads/${data.thread}/posts?page=${page}`)
      .then((data) => data.json());
    if (newPosts.length < 10)
      endOfPage = true;
    posts = [...posts, ...newPosts];
    nextPage++
    loading = false;
  }

  onMount(async () => {
    await getPosts(nextPage);
  });
</script>

<main class="w-full max-w-7xl mx-auto px-8 flex flex-col gap-2 pt-2">
  {#if posts.length > 0}
    <div class="flex justify-between">
      <section class="flex gap-4 items-center">
        <h1 class="text-2xl">{posts[0].thread.title}</h1>
        <div class="flex gap-2">
          {#each posts[0].thread.tags as tag}
            <div class="rounded-md px-2 py-1 bg-sky-800/20">#{tag}</div>
          {/each}
        </div>
      </section>
      <button 
        class="rounded-md px-3 py-2 transition { posts[0].thread.isLocked ? "bg-secondary cursor-not-allowed" : "bg-blue-700 hover:bg-blue-800" }"
        disabled={posts[0].thread.isLocked}
        on:click={() => createPostMenuVisible = !createPostMenuVisible}
      >Create a Post</button>
    </div>
  {/if}

  {#each posts as post}
    <Post postData={post} />
  {/each}
</main>

{#if createPostMenuVisible && !posts[0].thread.isLocked}
  <div class="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
    <form 
      class="bg-background p-4 rounded-md max-w-lg w-full mx-8 my-8"
      method="post"
    >
      <h1 class="text-2xl">Create a Post</h1>
      <div class="flex flex-col gap-1 w-full">
        <textarea name="content" placeholder="Content" class="w-full rounded-md p-2 bg-secondary" />
        <button class="w-full bg-primary rounded-md p-2 mt-2">Create</button>
        <button 
          class="w-full bg-secondary rounded-md p-2 mt-2"
          on:click={() => createPostMenuVisible = false}
        >Cancel</button>
      </div>
    </form>
  </div>
{/if}

<svelte:window bind:scrollY={yPosition} />
<svelte:body bind:offsetHeight={scrollHeight} />
