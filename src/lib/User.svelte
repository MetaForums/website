<script>
  import { page } from "$app/stores";

  const user = $page.data.user;
</script>

<div class="bg-secondary p-2 rounded-md hover:brightness-125 transition">
  {#if !user}
    <a href="/signin">Sign In</a>
  {:else}
    <button 
      class="flex gap-4 items-center"
      on:click={() => {
        if (confirm("Are you sure you want to logout?"))
          document.location.href = "/logout";
      }}
    >
      <div class="bg-primary rounded-md w-8 h-8" />
      <p>{user.displayName}</p>
    </button>
  {/if}
</div>