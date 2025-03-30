<script lang="ts">
	import type { PostAge, PostContent, PostData } from '../../models/post.model';
	import PostContentView from '../common/PostContentView.svelte';

	const {
		data,
		age,
		ref
	}: {
		data: Partial<PostContent>[];
		age?: PostAge;
		ref?: string;
	} = $props();

	const previewPost = $derived({
		id: '',
		content: data,
		uploader: '0xasd123',
		age,
		ref
	} as PostData);
</script>

<div class="border-base-content/50 my-10 w-full max-w-[450px] rounded-xl border-2 p-5">
	<PostContentView data={previewPost} />
</div>
