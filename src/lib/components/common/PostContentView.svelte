<script lang="ts">
	import { ChevronLeft, ChevronRight, Circle } from 'lucide-svelte';
	import Link_2 from 'lucide-svelte/icons/link-2';
	import { onMount } from 'svelte';
	import { SvelteMap } from 'svelte/reactivity';
	import type { PostData } from '../../models/post.model';
	import { getState } from '../../state/state.svelte';
	import { NodeUtils } from '../../utils/node.utils';

	const { data, txId }: { data: PostData; txId?: string } = $props();

	const globalState = getState();

	onMount(() => {
		if (!txId) {
			return;
		}
		for (const content of data.content) {
			if (content.type !== 'IMG') {
				content;
			}
			NodeUtils.getImages(globalState.nodeUrl, content.data, txId).then((imgData) => {
				images.set(content.data, imgData);
			});
		}
	});

	let currentPage = $state(0);
	let hashValid = $state<boolean[]>(data.content.map(() => true));
	let images = new SvelteMap<string, string | undefined>();

	function scrollToContent(i: number): void {
		return document.getElementById(data.id + '_' + i)?.scrollIntoView({
			behavior: 'smooth',
			block: 'center'
		});
	}

	function onContentScroll(event: UIEvent): void {
		const target = event.target as HTMLElement;
		if (!target) {
			return;
		}
		const currentScroll = target.scrollLeft;
		const postWidth = target.scrollWidth / data.content.length;
		currentPage = Math.floor((currentScroll + postWidth / 2) / postWidth);
	}
</script>

<div class="w-full max-w-[450px]">
	<div class="border-base-content/30 relative flex border-y-0 p-0">
		<div
			class="absolute -left-2 z-10 flex h-full items-center p-1 opacity-80"
			class:hidden={currentPage === 0}
		>
			<ChevronLeft class="h-full cursor-pointer" onclick={() => scrollToContent(currentPage - 1)} />
		</div>
		<div
			class="absolute -right-2 z-10 flex h-full items-center p-1 opacity-80"
			class:hidden={currentPage === data.content.length - 1}
		>
			<ChevronRight
				class="h-full  cursor-pointer"
				onclick={() => scrollToContent(currentPage + 1)}
			/>
		</div>
		<div
			class="relative inline-flex max-h-[70dvh] w-full snap-x snap-mandatory overflow-x-scroll overflow-y-hidden scroll-smooth"
			style="scrollbar-color: rgba(128, 128, 128, .5) rgba(0, 0, 0, 0); scrollbar-width: none;"
			onscroll={onContentScroll}
		>
			{#each data.content as content, i}
				<div
					id={data.id + '_' + i}
					class="box-content inline-flex h-full min-h-[40dvh] min-w-full snap-y snap-start items-center justify-center"
					class:border-b-2={!hashValid[i]}
					class:border-red-500={!hashValid[i]}
				>
					{#if content.type === 'TEXT'}
						<pre
							class=" h-fit max-h-[50dvh] min-w-full snap-start overflow-x-hidden overflow-y-auto p-5 text-wrap break-words"
							class:text-left={content.align === 'left'}
							class:text-center={content.align === 'center'}
							class:text-right={content.align === 'right'}>{content.data.trim()}</pre>
					{:else if content.type === 'IMG'}
						{#if images.has(content.data)}
							<img
								class="h-full object-contain"
								src={images.get(content.data)}
								alt={'image_' + i}
							/>
						{:else}
							???
						{/if}
					{:else}
						??
					{/if}
				</div>
			{/each}
		</div>
	</div>
	<div class="flex flex-col p-0">
		{#if data.content.length > 1}
			<div class="flex w-full flex-wrap justify-center">
				{#each data.content as _, i}
					<button
						onclick={() => {
							scrollToContent(i);
						}}
						class="cursor-pointer p-2"
						class:opacity-100={currentPage === i}
						class:opacity-30={currentPage !== i}
						aria-label={'post nav button' + i}
						><Circle class="bg-base-content rounded-full" color="#00000000" size="8" /></button
					>
				{/each}
			</div>
		{/if}
		{#if data.ref}
			<a
				href={data.ref}
				class="bg-primary/20 tooltip tooltip-bottom mt-2 flex w-full items-center gap-2 rounded-xl px-5 py-1"
				target="_blank"
			>
				<div class="tooltip-content">
					<span class="flex max-w-[100dvw] flex-wrap">{data.ref}</span>
				</div>
				<Link_2 size="24" />
				<span class="w-full truncate text-xs">
					{data.ref}
				</span>
			</a>
		{/if}
	</div>
</div>
