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
import Card from "./components/Card.vue";
import EmptyContent from "./components/EmptyContent.vue";
import Page from "./components/Page.vue";
import TopBar from "./components/TopBar.vue";
import Loader from "./components/Loader.vue";
import Pagination from "./components/Pagination.vue";
import Field from "./components/form/Field.vue";
import Select from "./components/form/Select.vue";
import Checkbox from "./components/form/Checkbox.vue";
import Radio from "./components/form/Radio.vue";
import File from "./components/form/File.vue";
import Skeleton from "./components/Skeleton.vue";
import Modal from "./components/Modal.vue";

// Plugins
import auth from "./plugins/auth";
import cities from "./plugins/cities";
import moment from "./plugins/moment";
import vars from "./plugins/vars";

import "./plugins/axios";
import "./plugins/firebase";

// Assets
import "./assets/scss/app.scss";
import "./assets/scss/themes/rtl.scss";

const app = createApp(App);

// Global Components
app.component("AppLogo", AppLogo);
app.component("Alert", Alert);
app.component("Info", Info);
app.component("Icon", Icon);
app.component("TabsBar", TabsBar);
app.component("Head", Head);
app.component("Content", Content);
app.component("Card", Card);
app.component("EmptyContent", EmptyContent);
app.component("Page", Page);
app.component("TopBar", TopBar);
app.component("Loader", Loader);
app.component("Pagination", Pagination);
app.component("Field", Field);
app.component("Select", Select);
app.component("Checkbox", Checkbox);
app.component("Radio", Radio);
app.component("File", File);
app.component("Skeleton", Skeleton);
app.component("Modal", Modal);

// Pinia Config
const pinia = createPinia();
pinia.use(({ store }) => {
  store.$timeoutRequest = 1800;
  store.$authTech = "97R{6;d@cTB|p2vaMeA^Pm};B8";
  store.$authCustomer = "NQhJr6{~K9=/TXeh(QXEdA8Yp|lz";
  store.$Auth_Key = "NQhJr6{~K9=/TXeh(QXEdA8Yp|lz";
});
app.use(pinia);

// Use Plugins
app.use(router);
app.use(cities);
app.use(auth);
app.use(moment);
app.use(vars);

app.mount("#app");
