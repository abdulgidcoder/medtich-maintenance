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
import Content from "./components/Content.vue";
import Page from "./components/Page.vue";
import TopBar from "./components/TopBar.vue";
import Loader from "./components/Loader.vue";
import Pagination from "./components/Pagination.vue";
import Field from "./components/form/Field.vue";
import Select from "./components/form/Select.vue";
import Checkbox from "./components/form/Checkbox.vue";
import File from "./components/form/File.vue";

import Skeleton from "./components/Skeleton.vue";

// Plugins
import auth from "./plugins/auth";
import "./plugins/axios";
import "./plugins/firebase";
import areas from "./plugins/areas"; 


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
app.component("Content", Content);
app.component("Page", Page);
app.component("TopBar", TopBar);
app.component("Loader", Loader);
app.component("Pagination", Pagination);
app.component("Field", Field);
app.component("Select", Select);
app.component("Checkbox", Checkbox);
app.component("File", File);
app.component("Skeleton", Skeleton);

app.use(createPinia());
app.use(router);
app.use(auth);
app.use(areas); 

app.mount("#app");
