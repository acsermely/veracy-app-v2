<script lang="ts">
	import { blur } from 'svelte/transition';
	import type { PostData } from '../../models/post.model';

	let { data }: { data?: PostData } = $props();
</script>

<div class="card my-10 w-full max-w-[450px]" in:blur|global>
	<div class="card-title flex">
		{#if !data}
			<div class="skeleton h-12 w-12 rounded-full"></div>
			<div class="skeleton h-8 max-w-[250px] flex-1"></div>
		{/if}
	</div>
	<div class="card-body px-0 py-3">
		{#if !data}
			<div class="skeleton aspect-square w-full"></div>
		{/if}
	</div>
	<div class="card-actions flex justify-between">
		<div class="skeleton h-12 w-12"></div>
		<div class="skeleton h-4 w-12"></div>
		<div class="skeleton h-12 w-12"></div>
	</div>
</div>
