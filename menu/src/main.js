import axios from 'axios';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

const env = 'dev';

if (env == 'dev') {
    axios.defaults.baseURL = 'http://192.168.0.5:3500';
} else {

    axios.defaults.baseURL = 'https://nazadoto.com:3500';
}


const app = createApp(App);
app.use(router);
app.mount('#app');