<script>
  import User from "./User.svelte";
</script>

<nav class="flex items-center justify-center border-border border-b py-4">
  <div class="w-full max-w-7xl px-8 flex items-center justify-between">
    <div class="links">
      <a href="/">Home</a>
    </div>
    <User />
  </div>
</nav>

<style lang="scss">
  .links > a {
    @apply transition text-foreground/50;
    &:hover { @apply text-foreground; }
  }
</style>