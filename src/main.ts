import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import './index.css';
import { VueFire, VueFireAuth } from 'vuefire';
import { firebaseApp } from './firebase/private_firebase/private_firebase';
import IndexLayoutVue from './components/IndexLayout.vue';
import ErrorNotFoundPageVue from './pages/ErrorNotFoundPage.vue';
import IndexPageVue from './pages/IndexPage.vue';
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';

const pinia = createPinia();

const routes: RouteRecordRaw[] = [
	{
		path: '/',
		component: () => IndexLayoutVue,
		children: [{ path: '', component: IndexPageVue }],
	},
	{
		path: '/create-new-task',
		component: () => IndexLayoutVue,
		children: [{ path: '', component: IndexPageVue }],
	},
	// Always leave this as last one,
	// but you can also remove it
	{
		path: '/:catchAll(.*)*',
		component: () => ErrorNotFoundPageVue,
	},
];

const router = createRouter({
	// 4. Provide the history implementation to use. We are using the hash history for simplicity here.
	history: createWebHashHistory(),
	routes, // short for `routes: routes`
});

const app = createApp(App);
app.use(pinia);
app.use(router);
app.use(VueFire, {
	// imported above but could also just be created here
	firebaseApp,
	modules: [
		// we will see other modules later on
		VueFireAuth(),
	],
});

app.mount('#app');
