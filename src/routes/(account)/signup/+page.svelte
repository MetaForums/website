<script lang="ts">
	import { redirect } from '@sveltejs/kit';
	import type { ActionData } from './$types';

  export let form: ActionData;
</script>

<form method="post">
  {#if form?.incorrect} <p>Unable to create an account {form?.message}</p> {/if}
  {#if form?.success} <script> document.location.href = '/' </script> {/if}

  <input name="username" type="text" placeholder="Username" />
  <input name="displayName" type="text" placeholder="Display name" />
  <input name="password" type="password" placeholder="Password" />
  <input name="confirmPassword" type="password" placeholder="Confirm password" />
  <input name="email" type="email" placeholder="Email" />
  <button type="submit">Sign up</button>
  <a href="/signin">Sign in</a>
</form>