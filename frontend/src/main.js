// import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import store from "./store";
import router    from "./router/index.js";
import Vue3Toastify from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import currencyUSD from './filters/currency.js'
import CKEditor from '@ckeditor/ckeditor5-vue'
import './main.css'
import '@fortawesome/fontawesome-free/css/all.min.css';


const app = createApp(App);

app
    .use(store)
    .use(router)
    .use(CKEditor)
    .use(Vue3Toastify)
    .mount('#app')
;

app.config.globalProperties.$filters = {
    currencyUSD
}

