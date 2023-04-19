import { createApp } from 'vue'
import store from "@/scripts/store"
import router from "@/scripts/router"
import App from './App.vue'
import {globalCookiesConfig} from "vue3-cookies";

globalCookiesConfig({
    expireTimes: "30d",
    secure: true,
});


createApp(App).use(store).use(router).mount('#app');


