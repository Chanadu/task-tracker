<template>
	<div>
		<h1>Page Not found go back</h1>
	</div>
	<div class="flex justify-center">
		<button @click="routerIndex" class="bg-slate-700 p-4 rounded-md">
			Back
		</button>
	</div>
</template>

<script setup lang="ts">
	import { useRouter, useRoute } from 'vue-router';

	const router = useRouter();
	const route = useRoute();
	function routerIndex() {
		router.push('/');
	}
</script>

<style scoped lang="scss"></style>
