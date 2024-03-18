import "./bootstrap";
import { createApp } from "vue";
import App from "@/App.vue";
import router from "@/router";
import "@/assets/main.css";
import PrimeVue from 'primevue/config';
import DashboardLayout from "@/components/DashboardLayout.vue";
import EmptyLayout from "@/components/EmptyLayout.vue";

//in main.js
import 'primevue/resources/themes/aura-light-green/theme.css'


const app = createApp(App);

app.component("DefaultLayout", DashboardLayout);
app.component("EmptyLayout", EmptyLayout);

app.use(PrimeVue);
app.use(router);
app.mount("#app");
