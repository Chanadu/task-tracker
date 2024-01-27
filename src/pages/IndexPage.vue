<template>
    
	<header class="py-8">
		<nav class="">
			<div class="text-3xl">Task Tracker</div>
		</nav>
	</header>
	<hr />
	<body class="py-12 text-lg flex-col justify-center">
		<template v-for="task in tasks">
			<div class="border p-6 mb-4">
				id: {{ task.id }} <br />
				title: {{ task.title }} <br />
				description:
				{{ task.description ?? 'No Description given' }} <br />
				importance: {{ task.importance }}
			</div>
		</template>

		<div class="flex justify-center">
			<button
				@click="console.log('a')"
				class="bg-slate-700 p-4 rounded-md"
			>
				Create New Task
			</button>
		</div>
	</body>
	<template>
		<footer></footer>
	</template>
</template>

<script setup lang="ts">
	import { addTaskFirebase, removeTaskFirebase } from '../firebase/firebase';
	import { firebaseTasksCollectionRef } from '../firebase/private_firebase/private_firebase';
	import { useCollection } from 'vuefire';

	// import { useTasksStore } from './stores/tasksStore';
	// import { storeToRefs } from 'pinia';
	// const taskStore = useTasksStore();
	// const { tasks } = storeToRefs(taskStore);
	// const { addTask } = taskStore;

	const firebaseTasksArray = useCollection(firebaseTasksCollectionRef, {
		wait: true,
	});

	const tasks = firebaseTasksArray;
</script>

<style scoped></style>
