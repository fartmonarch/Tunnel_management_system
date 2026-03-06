import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import piniaPersist from "pinia-plugin-persist";
import elementIcon from "./plugins/icons";
import echarts from "./plugins/echarts";
import "./assets/init.css";

const app = createApp(App);
const pinia = createPinia();

pinia.use(piniaPersist);

app.use(pinia);
app.use(router);
app.use(elementIcon);
app.use(echarts);

app.mount("#app");
