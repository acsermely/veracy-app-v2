<script lang="ts">
	import Post from '../../lib/components/app/Post.svelte';
	import { getAppState } from '../../lib/state/app/app.svelte';

	const appState = getAppState();
</script>

<div class="ml-0 flex w-full flex-col items-center sm:pl-[150px]">
	<div class=" w-full max-w-[450px] text-left">
		<button
			class="btn"
			class:text-primary={appState.mode === 'Friends'}
			onclick={() => appState.queryList('Friends')}>Friends</button
		>
		<button
			class="btn"
			class:text-primary={appState.mode === 'All'}
			onclick={() => appState.queryList('All')}>All</button
		>
	</div>
	{#each appState.list.entries() as [txId, data]}
		<Post data={data?.data} {txId} timestamp={data?.tx.node.timestamp} />
	{/each}
</div>
