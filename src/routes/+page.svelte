<script lang="ts">
	import { goto } from '$app/navigation';

	$effect(() => {
		setTimeout(() => {
			goto('/login');
			// show = true;
		}, 3000);
	});
</script>

<div
	class="text-primary-content relative top-1/2 left-1/2 flex h-fit w-fit -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-3"
>
	<span
		class="w-full bg-gradient-to-r from-amber-500 via-blue-500 to-teal-500 bg-clip-text pb-3 text-center text-6xl font-extrabold text-transparent transition-opacity select-none"
	>
		Veracy<span class="text-xs">.app</span>
	</span>
</div>
