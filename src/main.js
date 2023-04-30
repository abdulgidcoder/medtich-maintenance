import { createApp } from "vue";
import { createPinia } from "pinia";
import moment from "moment";
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
import areas from "./plugins/areas";
import vars from "./plugins/vars";

import "./plugins/axios";
import "./plugins/firebase";

// Assets
import "./assets/scss/app.scss";
import "./assets/scss/themes/rtl.scss";

const app = createApp(App);

// Use Components
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

app.use(createPinia());
app.use(router);
app.use(areas);
app.use(auth);
app.use(vars);

moment.updateLocale("ar", {
  relativeTime: {
    future: "%s فى",
    past: "منذ %s",
    s: "بضع ثوان",
    ss: "ثواني %d",
    m: "دقيقة",
    mm: "%d دقيقة",
    h: "ساعة",
    hh: "%d ساعة",
    d: "يوم",
    dd: "%d أيام",
    w: "أسبوع",
    ww: "أسابيع %d",
    M: "شهر",
    MM: "شهور %d",
    y: "سنة",
    yy: "سنين %d",
  },
});

app.config.globalProperties.$moment = moment;
app.config.globalProperties.$dateTime = (value) => {
  return moment(value)
    .locale("ar")
    .parseZone()
    .local()
    .startOf("minute")
    .fromNow();
};
app.config.globalProperties.pollTimer = 1800;
app.config.globalProperties.Auth_tach = "cT!z+m%qM2xH+k}D9XtqHUT^K7VCVj-Rw8:";
app.mount("#app");
