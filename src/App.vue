<script>
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
  mounted() {
    document.querySelector("html").setAttribute("dir", "rtl");
  },
  methods: {},
};
</script>

<template>
  <!-- {{ this.$auth.connection }} -->
  <router-view v-slot="{ Component }" >
    <transition name="fadeLeft" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>
  <Error />
</template>
