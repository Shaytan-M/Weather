import './assets/main.css';
import VueGoogleMaps from '../node_modules/@fawmi/vue-google-maps';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';

const app = createApp(App);

app.use(createPinia());
app.use(VueGoogleMaps, {
    load: {
        key: import.meta.env.VITE_MAPS_KEY,
        libraries: 'places',
    },
});

app.mount('#app');
