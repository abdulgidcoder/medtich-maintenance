<script>
import { useError } from "@/stores/useError";
import Error from "./components/Error.vue";
export default {
  components: { Error },
  mounted() {
    document.querySelector("html").setAttribute("dir", "rtl");
  },
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
