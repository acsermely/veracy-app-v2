<script lang="ts">
	import { Home, PlusCircle } from 'lucide-svelte';

	let { children } = $props();
</script>

<nav
	class="text-l bg-base-100/70 fixed bottom-0 z-10 flex h-full max-h-[40px] w-full justify-around gap-5 sm:top-0 sm:left-0 sm:min-h-full sm:max-w-[150px] sm:flex-col sm:justify-start sm:pt-5"
>
	<a href="/app" class="hidden w-full text-center sm:my-3 sm:block">
		<span
			class="w-full bg-gradient-to-r from-amber-500 via-blue-500 to-teal-500 bg-clip-text pb-3 text-center text-xl font-extrabold text-transparent transition-opacity select-none"
		>
			Veracy
		</span></a
	>
	<a href="/app" class="flex items-center gap-3 sm:pl-5">
		<Home size={28} />
		<span class="hidden text-lg sm:block">Home</span>
	</a>
	<a href="/create" class="flex items-center gap-3 sm:pl-5">
		<PlusCircle size={28} />
		<span class="hidden text-lg sm:block">New</span>
	</a>
</nav>

{@render children()}
