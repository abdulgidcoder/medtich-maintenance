<script>
import Tab from "./Tab.vue";
import { defineAsyncComponent } from "vue";
export default {
  props: { show: Boolean },
  components: {
    Tab,
    MyOrdersList: defineAsyncComponent({
      loader: () => import("../orders/MyList.vue"),
      delay: 200,
      timeout: 3000,
    }),
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
    <div class="app-tab-view app-my-orders-page">
      <Head title="My Orders" />
      <div class="app-content">
        <MyOrdersList
          :per_page="6"
          :pagination="true"
          paginClass="app-fixed-bottom"
        />
      </div>
    </div>
  </Tab>
</template>
