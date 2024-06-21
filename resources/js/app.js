import "./bootstrap";
import { createApp } from "vue";
import App from "@/App.vue";
import router from "@/router";
import "@/assets/main.css";
import PrimeVue from "primevue/config";
import DashboardLayout from "@/components/DashboardLayout.vue";
import EmptyLayout from "@/components/EmptyLayout.vue";
import { createPinia } from "pinia";
import { createI18n } from "vue-i18n";
import EN from "@/locale/en.json";
import PA from "@/locale/pa.json";

//in main.js
import "primevue/resources/themes/aura-light-green/theme.css";
import axios from "axios";
import Vue3Toasity from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import VTooltip from "v-tooltip";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://localhost:8000";

const pinia = createPinia();
const app = createApp(App);

app.use(PrimeVue, {
    unstyled: false,
});

const i18n = createI18n({
    // something i18n options here
    locale: "EN",
    messages: {
        EN: EN,
        PA: PA,
    },
});

app.use(VTooltip);

app.component("DefaultLayout", DashboardLayout);
app.component("EmptyLayout", EmptyLayout);

app.use(i18n);
app.use(pinia);
app.use(Vue3Toasity);
app.use(PrimeVue);
app.use(router);
app.mount("#app");
