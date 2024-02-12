<script lang="ts">
	import Category from '$src/lib/Category.svelte';

  export let data: {
    categories: CategoryData[]
  };
</script>

<main class="w-full max-w-7xl mx-auto px-8 flex flex-col gap-2 pt-2">
  {#each data.categories as category}
    <Category categoryData={category} />
  {/each}
</main>

<svelte:head>
  <!-- TODO: Add embed for homepage -->
</svelte:head>