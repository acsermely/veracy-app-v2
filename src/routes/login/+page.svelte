<script>
	import { slide } from 'svelte/transition';
</script>

<div class="flex h-full w-full flex-col items-center justify-center gap-3" transition:slide>
	<h1 class=" my-10 min-w-fit text-4xl text-nowrap">Welcome</h1>
	<button class="btn btn-primary"> Register </button>
	<span class=" w-fit">or</span>
	<button class="btn btn-primary"> Login </button>
	<a class="link link-accent mt-5 text-nowrap" href="/app"> use without account </a>
</div>
