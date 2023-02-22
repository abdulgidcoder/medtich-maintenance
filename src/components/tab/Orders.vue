<script>
import Tab from "./Tab.vue";
import { defineAsyncComponent } from "vue";
export default {
  props: { show: Boolean },
  components: {
    Tab,
    MyOrdersList: defineAsyncComponent({
      loader: () => import("../orders/MyList.vue"),
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
      <Content :isBoxed="true">
        <MyOrdersList
          :per_page="7"
          :pagination="true"
          paginClass="app-fixed-bottom"
        />
      </Content>
    </div>
  </Tab>
</template>
