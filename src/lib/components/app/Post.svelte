<script lang="ts">
	import { MessageSquareWarning, Send } from 'lucide-svelte';
	import { blur } from 'svelte/transition';
	import type { PostData } from '../../models/post.model';
	import { formatWallet } from '../../utils/common.utils';
	import PostContentView from '../common/PostContentView.svelte';

	let { data, txId, timestamp }: { data?: PostData; txId: string; timestamp?: number } = $props();
</script>

<div class="card my-10 w-full max-w-[450px]" in:blur|global>
	<a class="card-title cursor-pointer">
		{#if !data}
			<div class="skeleton h-12 w-12 rounded-full"></div>
			<div class="skeleton h-8 max-w-[250px] flex-1"></div>
		{:else}
			<div class="avatar avatar-placeholder">
				<!-- <div class="h-12 w-12 rounded-full">
					<img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
				</div> -->
				<div
					class="h-10 w-10 rounded-full bg-gradient-to-bl from-amber-500 via-blue-500 to-teal-500 text-lg text-white"
				>
					<span>{data.uploader.slice(0, 2)}</span>
				</div>
			</div>
			<div class="tooltip tooltip-bottom text-sm" data-tip={data.uploader}>
				{formatWallet(data.uploader, 7)}
			</div>
		{/if}
	</a>
	<div class="card-body px-0 py-3">
		{#if !data}
			<div class="skeleton aspect-square w-full"></div>
		{:else}
			<PostContentView {data} {txId} />
		{/if}
	</div>
	<div class="card-actions flex justify-between">
		{#if !data}
			<div class="skeleton h-12 w-12"></div>
			<div class="skeleton h-4 w-12"></div>
			<div class="skeleton h-12 w-12"></div>
		{:else}
			<button><Send /></button>
			{#if timestamp}
				<small class="text-xs">{new Date(timestamp).toLocaleDateString()}</small>
			{/if}
			<button><MessageSquareWarning /></button>
		{/if}
	</div>
</div>
