<script>
	import Post from '../../lib/components/app/Post.svelte';
</script>

<div class="ml-0 flex w-full flex-col items-center sm:pl-[150px]">
	{#each [1, 2, 3, 4, 5, 6] as _}
		<Post />
	{/each}
</div>
