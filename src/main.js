import './assets/main.css';
import VueGoogleMaps from '../node_modules/@fawmi/vue-google-maps';
import { createApp } from '../node_modules/vue';
import { createPinia } from '../node_modules/pinia';
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
