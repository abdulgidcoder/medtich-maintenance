<script>
import { defineAsyncComponent } from "vue";
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores/useAuth";
import { StatusBar, Style } from "@capacitor/status-bar";
import { App as AppCap } from "@capacitor/app";
import { Capacitor } from "@capacitor/core";
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
    const { connection } = storeToRefs(authStore);
    return { connection };
  },
  watch: {
    // Watch Connection if is false and Stop update App
    connection(status) {
      console.log("Connection: " + status);
      if (!status) {
        const interval_id = window.setInterval(function () {},
        Number.MAX_SAFE_INTEGER);
        for (let i = 1; i < interval_id; i++) {
          window.clearInterval(i);
        }
      }
    },
  },
  created() {
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
      StatusBar.setStyle({ style: Style.Dark });
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
