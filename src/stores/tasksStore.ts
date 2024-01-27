import { defineStore } from 'pinia';
import { ref, computed, Ref } from 'vue';

export interface Task {
	id: number;
	title: string;
	description: string | undefined;
	importance: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
}
export interface IncompleteTask {
	title: string;
	description?: string;
	importance: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
}

export const useTasksStore = defineStore('tasks', {
	state: () => {
		return {
			id: 0,
			tasks: [] as Task[],
		};
	},

	getters: {
		tasksLength(state) {
			return state.tasks.length;
		},
		tasksIsEmpty(state) {
			return state.tasks.length == 0;
		},
	},

	actions: {
		addTask(incTask: IncompleteTask): boolean {
			const task: Task = {
				id: this.id++,
				title: incTask.title,
				description: incTask.description,
				importance: incTask.importance,
			};
			this.tasks.push(task);
			return true;
		},

		removeTask(id: number): boolean {
			for (let i = 0; i < this.tasks.length; i++) {
				if (this.tasks[i].id == id) {
					this.tasks.splice(i, 1);
					return true;
				}
			}
			return false;
		},
	},
});
