<script>
import { defineAsyncComponent } from "vue";
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores/useAuth";
import { StatusBar, Style } from "@capacitor/status-bar";
import { useAlert } from "@/stores/useAlert";
import { App as AppCap } from "@capacitor/app";
import { Capacitor } from "@capacitor/core";

export default {
  components: {
    AlertApp: defineAsyncComponent({
      loader: () => import("@/layouts/AlertApp.vue"),
    }),
  },
  data() {
    return {};
  },
  setup() {
    const authStore = useAuthStore();
    const errorStore = useAlert();
    const { connection } = storeToRefs(authStore);
    return { authStore, connection, errorStore };
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
  mounted() {
    /* RTL */
    document.querySelector("html").setAttribute("dir", "rtl");
    // Update User data

    this.autoUpdateUser();

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
  methods: {
    async autoUpdateUser() {
      if (localStorage.getItem("token") != undefined) {
        this.authStore.ftechUser();
        this.$ftechUserData();
      } else {
        clearInterval(this.$ftechUserData);
      }
    },
  },
};
</script>

<template>
  <router-view v-slot="{ Component }">
    <transition name="fadeLeft" mode="out-in">
      <component :is="Component" />
    </transition>
    <AlertApp />
  </router-view>
</template>
