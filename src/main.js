import "./assets/styles.scss";

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import { router } from "./router/router";
import VIcon from "@/components/ui/VIcon.vue";
import VSwiper from "@/components/ui/VSwiper.vue";
import VModal from "@/components/ui/VModal.vue";

const app = createApp(App);

app.component("GIcon", VIcon);
app.component("GSwiper", VSwiper);
app.component("GModal", VModal);
app.use(createPinia());
app.use(router);

app.mount("#app");
