<template>
	<div class="text-white px-12">
		<header class="py-8">
			<nav class="">
				<div class="text-3xl">Task Tracker</div>
			</nav>
		</header>
		<hr />
		<body class="py-12 text-lg flex flex-wrap justify-center">
			<template v-for="task in tasks">
				<div class="border p-6 mx-4 my-2">
					id: {{ task.id }} <br />
					title: {{ task.title }} <br />
					description:
					{{ task.description ?? 'No Description given' }} <br />
					importance: {{ task.importance }}
				</div>
			</template>
		</body>
		<template>
			<footer></footer>
		</template>
	</div>
</template>

<style scoped lang="scss"></style>

<script setup lang="ts">
	import { firebaseTasksCollectionRef } from './firebase/firebase';
	import { useTasksStore } from './stores/tasksStore';
	import { storeToRefs } from 'pinia';
	import { useCollection } from 'vuefire';

	const firebaseTasksArray = useCollection(firebaseTasksCollectionRef, {
		wait: true,
	});

	const taskStore = useTasksStore();
	const { tasks } = storeToRefs(taskStore);
	const { addTask } = taskStore;
	addTask({ title: 'Testing Title', importance: 0 });
	setTimeout(function () {
		console.log(firebaseTasksArray);
	}, 1000);
</script>
