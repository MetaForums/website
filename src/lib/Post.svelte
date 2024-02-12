<script lang="ts">
  import { slide } from 'svelte/transition';
  import { cubicOut } from 'svelte/easing';
  import { page } from '$app/stores';
  import { baseApiUrl } from '$src/constants';

  import SvelteMarkdown from 'svelte-markdown';
  import sanitizeHtml from 'sanitize-html';

  export let postData: PostData;

  const user = $page.data.user as Option<UserData>;
  const token = $page.data.token as string;

  let hovering = false;

  async function editPost() {
    const newContent = prompt('Edit your post:', postData.content);
    if (newContent) {
      await fetch(`${baseApiUrl}/posts/${postData.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ content: newContent })
      });
      document.location.reload();
    }
  }

  async function deletePost() {
    await fetch(`${baseApiUrl}/posts/${postData.id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    document.location.reload();
  }

  // async function replyPost() {
  //   await fetch(`${baseApiUrl}/posts/`);
  // }
</script>

<div 
  class="w-full bg-secondary p-2 rounded-md flex flex-col gap-4"
  role="button"
  tabindex="0"
  on:mouseenter={() => hovering = true}
  on:mouseleave={() => hovering = false}
>
  <div class="flex gap-4 items-center">
    <div class="bg-primary rounded-md w-8 h-8" />
    <p>{postData.author.displayName}</p>
    <p class="text-foreground/50">{new Date(postData.createdAt).toLocaleString()}</p>
  </div>

  {#if postData.isDeleted}
    <p class="text-foreground/50"><b>This post has been deleted by the original author.</b></p>
  {:else}
    <div class="flex flex-col gap-1 custom">
      <SvelteMarkdown source={sanitizeHtml(postData.content)} />
      {#if postData.isEdited}
        <p class="text-foreground/50"><b>Edited.</b></p>
      {/if}
      {#if hovering && user && token}
        <div
          class="flex gap-2" 
          transition:slide={{ easing: cubicOut, duration: 200 }}
        >
          {#if user.id === postData.author.id}
            <button
              class="border-border border px-3 py-2 rounded-md hover:brightness-200 transition"
              on:click={editPost}
            >Edit Post</button>
            <button
              class="border-border border px-3 py-2 rounded-md hover:brightness-200 transition"
              on:click={deletePost}
            >Delete Post</button>
          {/if}
          <!-- <button
            class="border-border border px-3 py-2 rounded-md hover:brightness-200 transition"
            on:click={replyPost}
          >Reply Post</button> -->
        </div>
      {/if}
    </div>
  {/if}
</div>