<template>
	<div class="flex flex-col px-12">
		<div class="flex-col flex mb-4">
			<div class="flex">
				<label for="title-text" class="text-2xl text-justify py-2 mr-8">
					Title:
				</label>
				<input
					id="title-text"
					type="text"
					v-model="title"
					class="bg-slate-600 py-2 px-4 text-justify flex-grow"
				/>
			</div>
			<div
				class="flex flex-row justify-center text-red-500 text-xl p-2"
				v-show="titleError"
			>
				This title has already been taken by another task. Pick a
				different title.
			</div>
		</div>
		<div class="flex mb-4">
			<label
				for="description-text"
				class="text-2xl text-justify py-2 mr-8"
			>
				Description:
			</label>
			<input
				id="description-text"
				type="text"
				v-model="description"
				class="bg-slate-600 py-2 px-4 text-justify flex-grow"
			/>
		</div>
		<div class="flex mb-4">
			<label for="title-text" class="text-2xl text-justify py-2 mr-8">
				Importance:
			</label>
			<button
				class="bg-slate-700 px-5 rounded-full text-2xl min-w-16 disabled:bg-slate-800"
				@click="if (importance > 1) importance--;"
				:disabled="importance == 1"
			>
				-
			</button>
			<span class="text-2xl text-justify py-2 px-4">{{
				importance
			}}</span>
			<button
				class="bg-slate-700 px-5 rounded-full text-2xl min-w-16 disabled:bg-slate-800"
				@click="if (importance < 10) importance++;"
				:disabled="importance == 10"
			>
				+
			</button>
		</div>
		<div class="flex flex-row justify-center">
			<div class="flex justify-center my-6 mx-4">
				<button
					@click="submitButton"
					class="bg-slate-500 p-4 rounded-md flex-shrink"
				>
					Create
				</button>
			</div>
			<div class="flex justify-center my-6 mx-4">
				<button
					@click="backButton"
					class="bg-slate-700 p-4 rounded-md flex-shrink"
				>
					Back
				</button>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { useRoute, useRouter } from 'vue-router';
	import { addTaskFirebase, hasTaskFirebase } from '../firebase/firebase';
	import { firebaseTasksCollectionRef } from '../firebase/private_firebase/private_firebase';
	import { useCollection } from 'vuefire';
	import { Ref, ref } from 'vue';

	const firebaseTasksArray = useCollection(firebaseTasksCollectionRef, {
		wait: true,
	});

	const tasks = firebaseTasksArray;

	const router = useRouter();
	const route = useRoute();

	function backButton() {
		routerIndex();
	}
	function submitButton(): boolean {
		if (hasTaskFirebase(title.value)) {
			titleError.value = true;
			return false;
		}
		addTaskFirebase({
			title: title.value,
			description: description.value,
			importance: importance.value,
		});
		routerIndex();
		return true;
	}
	function routerIndex() {
		router.push('/');
	}

	let title = ref('');
	let description = ref('');
	let importance: Ref<1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10> = ref(1);
	let titleError = ref(false);
</script>

<style scoped></style>
