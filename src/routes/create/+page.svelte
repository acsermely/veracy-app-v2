<script lang="ts">
	import { goto } from '$app/navigation';
	import { ChevronLeft, ChevronRight, Send, X } from 'lucide-svelte';
	import { toast } from 'svelte-sonner';
	import { fade, fly } from 'svelte/transition';
	import PostPreview from '../../lib/components/create/PostPreview.svelte';
	import SelectContent from '../../lib/components/create/SelectContent.svelte';
	import { URL_REGEX } from '../../lib/constants';
	import type { PostAge, PostContent } from '../../lib/models/post.model';

	let data: Partial<PostContent>[] = $state([{ align: 'center' }]);
	let age: PostAge | undefined = $state();
	let ref: string = $state('');
	let counter: number = $state(0);

	function back(): void {
		if (counter > 0) {
			counter = counter - 1;
			return;
		}
		goto('/app');
	}
	function next(): void {
		if (counter < 2) {
			if (counter == 0) {
				if (ref && !ref.match(URL_REGEX)) {
					toast.error('Invalid ref Link!');
					return;
				}
			}

			counter = counter + 1;
			return;
		}
		goto('/app');
	}
</script>

<div class="flex flex-col items-center justify-center p-3">
	<div class="my-3 flex w-full max-w-[450px] items-center justify-between">
		<button class="btn btn-square btn-outline" onclick={back}>
			{#if counter == 0}
				<X />
			{:else}
				<ChevronLeft />
			{/if}
		</button>
		<div>
			{#if counter == 1}
				<div transition:fly={{ y: '-100%', }}>Preview</div>
			{/if}
		</div>
		<button class="btn btn-square btn-outline" onclick={next}>
			{#if counter == 1}
				<Send />
			{:else}
				<ChevronRight />
			{/if}
		</button>
	</div>
	{#if counter === 0}
		<div class="w-full max-w-[450px]" in:fade>
			<SelectContent bind:data bind:age bind:ref />
		</div>
	{:else}
		<div class="w-full max-w-[450px]" in:fade>
			<PostPreview {data} {age} {ref} />
		</div>
	{/if}
</div>
