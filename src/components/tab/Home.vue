<script>
import Tab from "./Tab.vue";
import { defineAsyncComponent } from "vue";
import InfoUser from "../InfoUser.vue";
import TopbarHome from "../TopbarHome.vue";
import { useOrdesStore } from "@/stores/useOrders.js";

export default {
  props: { show: Boolean },
  components: {
    Tab,
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
};
</script>
<template>
  <Tab :show="show">
    <div class="app-tab-view app-home-page">
      <TopbarHome />
      <Content>
        <div
          class="app-section"
          v-if="
            !this.ordersStore.lastList == 0 ||
            !this.ordersStore.lastList == null
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
            <h2 class="h1">Last Orders</h2>
            <RouterLink to="/orders">See all</RouterLink>
          </div>
          <LastOrders :per_page="6" />
        </section>
      </Content>
    </div>
  </Tab>
</template>

<style lang="scss">
.app-home-page {
  .app-content {
    background-color: var(--white);
  }
  .user-area {
    display: flex;
    align-items: center;
    .contant {
      font-size: 13px;
      div {
        font-size: 10px;
        color: var(--medium);
        margin-bottom: 2px;
      }
    }
    svg {
      width: 22px;
      fill: var(--primary);
      margin-right: 10px;
    }
  }
}
</style>
