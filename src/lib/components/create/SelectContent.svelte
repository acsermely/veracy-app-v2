<script lang="ts">
	import {
		AlignCenterVertical,
		AlignEndVertical,
		AlignStartVertical,
		Plus,
		X
	} from 'lucide-svelte';
	import { slide } from 'svelte/transition';
	import { POST_MAX_NUMBER_OF_CONTENT, URL_REGEX } from '../../constants';
	import type { PostAge, PostContent, PostContentAlign } from '../../models/post.model';
	import { runDelayed } from '../../utils/common.utils';

	let {
		data = $bindable(),
		age = $bindable(),
		ref = $bindable()
	}: { data: Partial<PostContent>[]; age?: PostAge; ref?: string } = $props();

	let linkValid = $derived(ref ? !!ref.match(URL_REGEX) : true);

	function deleteData(index: number): void {
		if (data.length < 2) {
			data = [{}];
			return;
		}
		data = data.filter((_, i) => i !== index);
	}

	function textAlignClass(align?: PostContentAlign): string {
		if (align === 'left') {
			return ' text-left';
		} else if (align === 'center') {
			return ' text-center';
		} else if (align === 'right') {
			return ' text-right';
		}
		return '';
	}
</script>

<div class="w-full max-w-[450px]">
	<div
		class="border-neutral inline-flex max-h-[70vh] w-full snap-x snap-mandatory overflow-x-scroll overflow-y-hidden scroll-smooth rounded-xl border-2"
		style="scrollbar-color: rgba(128, 128, 128, .5) rgba(0, 0, 0, 0); scrollbar-width: thin;"
	>
		{#each data as content, i}
			<div
				id={'content_' + i}
				class="box-content inline-flex min-h-[50dvh] min-w-full snap-start justify-center"
			>
				<div class="flex flex-1 flex-col">
					<div class="flex items-center justify-between">
						<div>
							{#if content.type === 'TEXT'}
								<button
									class="btn btn-square btn-soft"
									class:btn-primary={content.align === 'left'}
									onclick={() => {
										content.align = 'left';
										document.getElementById('content_text_' + i)?.focus();
									}}
								>
									<AlignStartVertical />
								</button>
								<button
									class="btn btn-square btn-soft"
									class:btn-primary={content.align === 'center'}
									onclick={() => {
										content.align = 'center';
										document.getElementById('content_text_' + i)?.focus();
									}}
								>
									<AlignCenterVertical />
								</button>
								<button
									class="btn btn-square btn-soft"
									class:btn-primary={content.align === 'right'}
									onclick={() => {
										content.align = 'right';
										document.getElementById('content_text_' + i)?.focus();
									}}
								>
									<AlignEndVertical />
								</button>
							{/if}
						</div>
						{#if data.length > 1 || content.type}
							<button class="btn btn-ghost btn-square" onclick={() => deleteData(i)}>
								<X />
							</button>
						{/if}
					</div>
					{#if !content.type}
						<div class="flex flex-1 flex-col items-center justify-center gap-2">
							<button
								class="btn btn-outline"
								onclick={() => {
									content.type = 'TEXT';
									runDelayed(() => {
										const textAreaElementRef = document.getElementById('content_text_' + i);
										textAreaElementRef?.focus();
									});
								}}>Text</button
							>
							<button
								class="btn btn-outline"
								disabled
								onclick={() => {
									content.type = 'IMG';
									content.privacy = 'PUBLIC';
								}}>Image</button
							>
						</div>
					{:else if content.type === 'TEXT'}
						<div class="relative flex flex-1 p-1">
							<textarea
								id={'content_text_' + i}
								bind:value={content.data}
								class={'textarea w-full flex-1 resize-none p-3 font-mono text-base' +
									textAlignClass(content.align)}
								maxlength={350}
							></textarea>
							<span class="text-muted-foreground absolute right-4 bottom-3 text-xs"
								>{350 - (content.data?.length || 0)}</span
							>
						</div>
					{:else if content.type === 'IMG'}
						{#if !content.data}
							select
						{:else}
							<img class="h-full object-contain" src={content.data} alt={'image_' + i} />
						{/if}
					{/if}
				</div>
			</div>
		{/each}
	</div>
	<div class="my-3 flex w-full flex-wrap justify-center">
		{#each data as _, i}
			<!-- svelte-ignore a11y_no_static_element_interactions, a11y_click_events_have_key_events -->
			<span
				onclick={() => {
					const id = 'content_' + i;
					const elem = document.getElementById(id);
					elem?.scrollIntoView({
						behavior: 'smooth',
						block: 'center'
					});
				}}
				class="mx-2 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full px-2 text-xs font-extrabold opacity-50 hover:bg-slate-500"
			>
				{i + 1}
			</span>
		{/each}
		<button
			onclick={() => {
				if (data.length >= POST_MAX_NUMBER_OF_CONTENT) {
					return;
				}
				data.push({
					align: 'center'
				});
				runDelayed(() => {
					const id = 'content_' + (data.length - 1);
					const elem = document.getElementById(id);
					elem?.scrollIntoView({
						behavior: 'smooth',
						block: 'center'
					});
				});
			}}
			class="flex cursor-pointer items-center justify-center rounded-full border-2 opacity-50 hover:bg-slate-500"
		>
			<Plus class="h-6 w-6" />
		</button>
	</div>
	<div class="flex flex-col gap-3">
		<select bind:value={age} class="select w-1/2 min-w-fit border-2" name="age" id="age">
			<option disabled selected>- Select Age Rating -</option>
			<option>+12</option>
			<option>+16</option>
			<option>+18</option>
		</select>
		<input
			bind:value={ref}
			class="input w-full border-2"
			class:input-error={!linkValid}
			type="text"
			placeholder="Referr to a link"
		/>
		{#if !linkValid}
			<p transition:slide={{ axis: 'y' }} class="fieldset-label text-xs">Invalid Link</p>
		{/if}
	</div>
</div>
