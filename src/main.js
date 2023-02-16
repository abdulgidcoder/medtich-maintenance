import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

// import Components
import AppLogo from "./components/AppLogo.vue";
import Alert from "./components/Alert.vue";
import Info from "./components/Info.vue";
import Icon from "./components/Icon.vue"; 
import TabsBar from "./components/TabsBar.vue"; 
import Head from "./components/Head.vue";
import TopBar from "./components/TopBar.vue";
import Loader from "./components/Loader.vue";
import Pagination from "./components/Pagination.vue";

import Field from "./components/form/Field.vue";
import Select from "./components/form/Select.vue";


// Plugins
import auth from "./plugins/auth";
import "./plugins/axios";
import "./plugins/firebase";

// Assets
import "./assets/scss/app.scss";

const app = createApp(App);

// Use Components
app.component("AppLogo", AppLogo);
app.component("Alert", Alert);
app.component("Info", Info);
app.component("Icon", Icon);
app.component("TabsBar", TabsBar); 
app.component("Head", Head);
app.component("TopBar", TopBar);
app.component("Loader", Loader);
app.component("Field", Field);
app.component("Select", Select);
app.component("Pagination", Pagination);


app.use(createPinia());
app.use(router);
app.use(auth);

app.mount("#app");
