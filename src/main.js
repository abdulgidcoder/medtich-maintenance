import { createApp, markRaw } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import { SplashScreen } from "@capacitor/splash-screen";

// import Components
import AppLogo from "./components/AppLogo.vue";
import Avatar from "./components/Avatar.vue";
import Alert from "./components/Alert.vue";
import Info from "./components/Info.vue";
import Icon from "./components/Icon.vue";
import TabsBar from "./components/TabsBar.vue";
import Head from "./components/Head.vue";
import Content from "./components/Content.vue";
import Card from "./components/Card.vue";
import DropDown from "./components/DropDown.vue";
import EmptyContent from "./components/EmptyContent.vue";
import Page from "./components/Page.vue";
import TopBar from "./components/TopBar.vue";
import Loader from "./components/Loader.vue";
import Pagination from "./components/Pagination.vue";
import Spinner from "./components/Spinner.vue";
import Field from "./components/form/Field.vue";
import Select from "./components/form/Select.vue";
import Checkbox from "./components/form/Checkbox.vue";
import Radio from "./components/form/Radio.vue";
import File from "./components/form/File.vue";
import FileBox from "./components/FileBox.vue";
import Skeleton from "./components/Skeleton.vue";
import Modal from "./components/Modal.vue";

import Gellary from "./components/Gellary.vue";

// Plugins
import auth from "./plugins/auth";
import messages from "./plugins/messages";
import cities from "./plugins/cities";
import datefns from "./plugins/date-fns";
import data from "./plugins/data";
import "./plugins/axios";
import "./plugins/firebase";

// Assets
import "./assets/scss/app.scss";
import "./assets/scss/themes/rtl.scss";

const app = createApp(App);

// Global Components
app.component("AppLogo", AppLogo);
app.component("Alert", Alert);
app.component("Avatar", Avatar);
app.component("Info", Info);
app.component("Icon", Icon);
app.component("TabsBar", TabsBar);
app.component("Head", Head);
app.component("Content", Content);
app.component("Card", Card);
app.component("DropDown", DropDown);
app.component("EmptyContent", EmptyContent);
app.component("Page", Page);
app.component("TopBar", TopBar);
app.component("Loader", Loader);
app.component("Pagination", Pagination);
app.component("Field", Field);
app.component("Select", Select);
app.component("Spinner", Spinner);
app.component("Checkbox", Checkbox);
app.component("Radio", Radio);
app.component("File", File);
app.component("FileBox", FileBox);
app.component("Skeleton", Skeleton);
app.component("Modal", Modal);
app.component("Gellary", Gellary);

// Pinia Config
const pinia = createPinia();
pinia.use(({ store }) => {
  /** Vars */
  store.$authTech = "cT!z+m%qM2xH+k}D9XtqHUT^K7VCVj-Rw8:";
  store.$authCustomer = "NQhJr6{~K9=/TXeh(QXEdA8Yp|lz";
  store.$Auth_Key = "cT!z+m%qM2xH+k}D9XtqHUT^K7VCVj-Rw8:";
  store.$timeoutRequest = 2300;

  /** User router in Store */
  store.router = markRaw(router);
});
app.use(pinia);

// Updata Time
app.config.globalProperties.$pollTimer = 2400;

// Use Plugins
app.use(router);
app.use(cities);
app.use(auth);
app.use(messages);
app.use(datefns);
app.use(data);

app.mount("#app");

// Splash Screen
SplashScreen.show({
  launchShowDuration: 3000,
  showDuration: 3000,
  autoHide: true,
  showSpinner: true,
});
