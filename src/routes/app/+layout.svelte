<script lang="ts">
	import NavBar from '../../lib/components/common/NavBar.svelte';

	let { children } = $props();
</script>

<NavBar />

{@render children()}
