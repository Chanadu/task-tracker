import { setDoc, doc, deleteDoc } from 'firebase/firestore';
import { Task } from '../stores/tasksStore';
import {
	COLLECTION_NAME,
	firebaseDB,
} from './private_firebase/private_firebase';

export async function addTaskFirebase(task: Task): Promise<boolean> {
	await setDoc(doc(firebaseDB, COLLECTION_NAME, task.id.toString()), {
		title: task.title,
		description: task.description ?? '',
		importance: task.importance,
	});
	return true;
}

export async function removeTaskFirebase(task: Task): Promise<boolean> {
	await deleteDoc(doc(firebaseDB, COLLECTION_NAME, task.id.toString()));
	return true;
}
