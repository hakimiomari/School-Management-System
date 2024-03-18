import "./bootstrap";
import { createApp } from "vue";
import App from "./src/App.vue";
import router from "./src/router";
import "./src/assets/main.css";

import DashboardLayout from "./src/components/DashboardLayout.vue";
import EmptyLayout from "./src/components/EmptyLayout.vue";

const app = createApp(App);

app.component("DefaultLayout", DashboardLayout);
app.component("EmptyLayout", EmptyLayout);

app.use(router);
app.mount("#app");
