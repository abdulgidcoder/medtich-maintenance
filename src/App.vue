<script>
import { defineAsyncComponent } from "vue";
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores/useAuth";
import { StatusBar, Style } from "@capacitor/status-bar";
import { useError } from "@/stores/useError";
import { App as AppCap } from "@capacitor/app";
import { Capacitor } from "@capacitor/core";
// import { SplashScreen } from '@capacitor/splash-screen';

export default {
  components: {
    Error: defineAsyncComponent({
      loader: () => import("./components/Error.vue"),
    }),
  },
  data() {
    return {};
  },
  setup() {
    const authStore = useAuthStore();
    const errorStore = useError();
    const { connection } = storeToRefs(authStore);
    return { connection, errorStore };
  },
  watch: {
    // Watch Connection if is false and Stop update App
    connection(status) { 
      this.errorStore.show = true;
      if (!status) {
        const interval_id = window.setInterval(function () {},
        Number.MAX_SAFE_INTEGER);
        for (let i = 1; i < interval_id; i++) {
          window.clearInterval(i);
        }
        this.errorStore.style = "warning";
        this.errorStore.masg = "انت غير متصل بالانترنت";
      } else {
        this.errorStore.style = "success";
        this.errorStore.masg = "تم الاتصال بالانترنت";
        this.$ftechUserData();
      }
    },
  },
  async created() {
    // Update User data
    if (localStorage.getItem("token") != undefined) { 
    } else {
      clearInterval(this.$ftechUserData);
    }    
    /* RTL */
    document.querySelector("html").setAttribute("dir", "rtl");

    if (Capacitor.isNativePlatform()) {
      /* Disable Zoom */
      document.addEventListener(
        "gesturestart",
        (event) => {
          event.preventDefault();
        },
        false
      );

      /* StatusBar */
      StatusBar.setStyle({ style: Style.Light });
      StatusBar.setBackgroundColor({
        color: "#00d9c8",
      });

      /* Navigation Back */
      AppCap.addListener("backButton", ({ canGoBack }) => {
        if (canGoBack) {
          window.history.back();
        } else {
          AppCap.exitApp();
        }
      });
    }
  },
  methods: {},
};
</script>

<template>
  <router-view v-slot="{ Component }">
    <transition name="fadeLeft" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>
  <Error />
</template>
