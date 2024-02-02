<template>
	<div class="flex flex-col items-start">
		<template v-for="task in tasks">
			<div class="border p-6 mb-4 min-w-96 flex flex-row items-center">
				<div class="mr-3 flex-grow">
					id: {{ task.id }} <br />
					title: {{ task.title }} <br />
					description:
					{{
						!task.description || task.description == ''
							? 'No Description given'
							: task.description
					}}
					<br />
					importance: {{ task.importance }}
				</div>
				<div class="flex-shrink">
					<button
						class="bg-slate-600 px-4 py-2 rounded-full text-red-500"
						@click="
							deleteTask(
								task.title,
								task.description,
								task.importance,
								task.id,
							)
						"
					>
						X
					</button>
				</div>
			</div>
		</template>

		<div class="flex-row mt-4">
			<button
				@click="routerCreateNewTask"
				class="bg-slate-700 p-4 rounded-md"
			>
				Create New Task
			</button>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { useRoute, useRouter } from 'vue-router';
	import { removeTaskFirebase } from '../firebase/firebase';
	import { firebaseTasksCollectionRef } from '../firebase/private_firebase/private_firebase';
	import { useCollection } from 'vuefire';
	import { Task } from '../stores/tasksStore';

	// import { useTasksStore } from './stores/tasksStore';
	// import { storeToRefs } from 'pinia';
	// const taskStore = useTasksStore();
	// const { tasks } = storeToRefs(taskStore);
	// const { addTask } = taskStore;

	const firebaseTasksArray = useCollection(firebaseTasksCollectionRef, {
		wait: true,
	});

	const tasks = firebaseTasksArray;

	const router = useRouter();
	const route = useRoute();

	function routerCreateNewTask() {
		router.push('/create-new-task');
	}
	function deleteTask(
		title: string,
		description: string,
		importance: number,
		id: number,
	) {
		removeTaskFirebase({
			title: title,
			description: description,
			importance: importance,
			id: id,
		} as Task);
	}
</script>

<style scoped></style>
