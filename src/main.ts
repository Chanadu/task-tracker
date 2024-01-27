import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import './index.css';
import { VueFire, VueFireAuth } from 'vuefire';
import { firebaseApp } from './firebase/private_firebase/private_firebase';
import IndexLayoutVue from './components/IndexLayout.vue';
import ErrorNotFoundPageVue from './pages/ErrorNotFoundPage.vue';
import IndexPageVue from './pages/IndexPage.vue';

const pinia = createPinia();
const app = createApp(App);
app.use(pinia);

app.use(VueFire, {
	// imported above but could also just be created here
	firebaseApp,
	modules: [
		// we will see other modules later on
		VueFireAuth(),
	],
});

// const routes: RouteRecordRaw[] = [
// 	{
// 		path: '/',
// 		component: () => IndexLayoutVue,
// 		children: [{ path: '', component: IndexPageVue }],
// 	},
// 	{
// 		path: '/create-new-task',
// 		component: () => IndexLayoutVue,
// 		children: [{ path: '', component: IndexPageVue }],
// 	},
// 	// Always leave this as last one,
// 	// but you can also remove it
// 	{
// 		path: '/:catchAll(.*)*',
// 		component: () => ErrorNotFoundPageVue,
// 	},
// ];

// const router = VueRouter.createRouter({
// 	// 4. Provide the history implementation to use. We are using the hash history for simplicity here.
// 	history: VueRouter.createWebHashHistory(),
// 	routes, // short for `routes: routes`
// });
// app.use(router);

app.mount('#app');
