import { createApp } from 'vue';
import App from './App.vue';
import store from './store';
import router from './router';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'sweetalert2/dist/sweetalert2.min.css';
import VueSweetalert2 from 'vue-sweetalert2';

const app = createApp(App);
app.use(store);
app.use(router);
app.use(VueSweetalert2);

app.mount('body');
