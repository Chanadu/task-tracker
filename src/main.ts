import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import './index.css';
import { VueFire, VueFireAuth } from 'vuefire';
import { firebaseApp } from './firebase/firebase';

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
app.mount('#app');
