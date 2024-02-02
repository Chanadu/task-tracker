import { setDoc, doc, deleteDoc } from 'firebase/firestore';
import { IncompleteTask, Task } from '../stores/tasksStore';
import {
	COLLECTION_NAME,
	firebaseDB,
	firebaseTasksCollectionRef,
} from './private_firebase/private_firebase';
import { useCollection } from 'vuefire';

let id = 0;

const firebaseTasksArray = useCollection(firebaseTasksCollectionRef, {
	wait: true,
});

const tasks = firebaseTasksArray;

export async function addTaskFirebase(task: IncompleteTask): Promise<boolean> {
	await setDoc(doc(firebaseDB, COLLECTION_NAME, id.toString()), {
		title: task.title,
		description: task.description ?? '',
		importance: task.importance,
	});
	id++;
	return true;
}

export async function removeTaskFirebase(task: Task): Promise<boolean> {
	await deleteDoc(doc(firebaseDB, COLLECTION_NAME, task.id.toString()));
	return true;
}

export function hasTaskFirebase(title: string): boolean {
	for (let t in tasks) {
		let task: Task = t as unknown as Task;
		if (task.title == title) {
			return true;
		}
	}
	return false;
}
