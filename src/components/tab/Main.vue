<script>
import { defineAsyncComponent } from "vue";
import InfoUser from "../InfoUser.vue";
import TopbarHome from "../TopbarHome.vue";
import { useOrdesStore } from "@/stores/useOrders.js";
import { StatusBar, Style } from "@capacitor/status-bar";
export default {
  props: { show: Boolean },
  components: {
    LastOrders: defineAsyncComponent({
      loader: () => import("../orders/LastOrders.vue"),
    }),
    InfoUser,
    TopbarHome,
  },
  setup() {
    const ordersStore = useOrdesStore();
    return { ordersStore };
  },
  data() {
    return {
      auth_user: this.$auth,
    };
  },
  created() {
    StatusBar.setStyle({ style: Style.Light });
    StatusBar.setBackgroundColor({
      color: "#ffffff",
    });
  },
  beforeUnmount() {
    StatusBar.setStyle({ style: Style.Dark });
    StatusBar.setBackgroundColor({
      color: "#00d9c8",
    });
  },
};
</script>
<template>
  <div class="app-tab-view app-home-page">
    <TopbarHome />
    <Content>
      <div
        class="app-section"
        v-if="
          !this.ordersStore.lastList == 0 || !this.ordersStore.lastList == null
        "
        v-show="false"
      >
        <button class="app-search-toggle">
          <Icon name="search" />
          Find your Order
        </button>
      </div>
      <InfoUser />
      <section class="app-section app-last-orders">
        <div class="app-section-head">
          <h2 class="h1">اخر الطلبات</h2>
          <RouterLink to="/orders">عرض الكل</RouterLink>
        </div>
        <LastOrders :per_page="6" />
      </section>
    </Content>
  </div>
</template>

<style lang="scss">
.app-home-page {
  .app-content {
    background-color: var(--white);
  }
}
</style>
