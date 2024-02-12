<script lang="ts">
	import { redirect } from '@sveltejs/kit';
	import type { ActionData } from './$types';

  export let form: ActionData;
</script>

<form method="post">
  {#if form?.incorrect} <p>Username or password is incorrect</p> {/if}
  {#if form?.success} <script> document.location.href = '/' </script> {/if}

  <input name="username" type="text" placeholder="Username" />
  <input name="password" type="password" placeholder="Password" />
  <button type="submit">Sign in</button>
  <a href="/signup">Sign up</a>
</form>