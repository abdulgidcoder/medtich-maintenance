<script>
import { useAuthStore } from "@/stores/useAuth";
import { storeToRefs } from "pinia";

import { defineAsyncComponent } from "vue";
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
  mounted() {
    document.querySelector("html").setAttribute("dir", "rtl");
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
