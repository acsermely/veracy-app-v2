<script lang="ts">
	import { Toaster } from 'svelte-sonner';
	import { cubicIn, cubicOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';
	import '../app.css';
	import { setAppState } from '../lib/state/app/app.svelte';
	import { setState } from '../lib/state/state.svelte';

	let { data, children } = $props();

	setState();
	setAppState();
</script>

{#key data.url}
	{#if data.url === '/login'}
		<main
			in:fly|global={{ x: '-100%', opacity: 0, easing: cubicOut }}
			out:fly|global={{ x: '-100%', opacity: 0, easing: cubicIn }}
			class="relative h-full w-full"
		>
			{@render children()}
		</main>
	{:else if data.url === '/create'}
		<main
			in:fly|global={{ y: '-100%', easing: cubicOut, opacity: 0 }}
			out:fly|global={{ y: '-100%', easing: cubicIn, opacity: 0 }}
			class="h-full w-full"
		>
			{@render children()}
		</main>
	{:else}
		<main class="relative h-full w-full">
			{@render children()}
		</main>
	{/if}
{/key}

<Toaster richColors expand={true} position="top-center" duration={2000} />
