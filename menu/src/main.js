import axios from 'axios';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import VueGoogleMaps from '@fawmi/vue-google-maps';

const env = 'prod';

if (env == 'dev') {
    axios.defaults.baseURL = 'http://192.168.1.235:3500';
} else {

    axios.defaults.baseURL = 'https://nazadoto.com:3500';
}


const app = createApp(App);
app.use(router);
app.use(VueGoogleMaps, {
    load: {
        key: 'AIzaSyC8vrGiWbmnS138WURJk2odQ9HU_BIEz9s',
    },
});
app.mount('#app');