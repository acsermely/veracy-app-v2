<script lang="ts">
	import { fly } from 'svelte/transition';
	import '../app.css';

	let { data, children } = $props();

	$inspect(data.url);
</script>

{#key data.url}
	{#if data.url === '/login'}
		<main
			in:fly|global={{ x: '-100%', opacity: 0 }}
			out:fly|global={{ x: '-100%', opacity: 0 }}
			class="relative h-full w-full"
		>
			{@render children()}
		</main>
	{:else}
		<main class="relative h-full w-full">
			{@render children()}
		</main>
	{/if}
{/key}
