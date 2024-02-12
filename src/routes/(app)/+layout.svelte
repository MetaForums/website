<script>
  import '$src/global.css';
	import Footer from '$src/lib/Footer.svelte';

  import Navigation from '$src/lib/Navigation.svelte';
</script>

<Navigation />
<slot />
<Footer />