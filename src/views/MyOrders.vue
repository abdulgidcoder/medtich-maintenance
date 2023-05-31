<script>
import { defineAsyncComponent } from "vue";
import { useOrdersStore } from "@/stores/useOrders.js";
export default {
  props: { show: Boolean },
  components: {
    MyOrdersList: defineAsyncComponent(() =>
      import("@/layouts/orders/MyList.vue")
    ),
  },
  data() {
    return {};
  },
  setup() {
    const ordersStore = useOrdersStore();
    return { ordersStore };
  },
  methods: {
    reloadMyOrders() {
      this.$refs.MyOrdersList.fetchOrders();
    },
  },
};
</script>
<template>
  <Page class="app-my-orders-page">
    <Head title="طلباتى" goBack="true" />
    <Content :isBoxed="true" :pullToRefresh="true" @onRefresh="reloadMyOrders" :enableOffline="true">
      <MyOrdersList
        ref="MyOrdersList"
        :per_page="10"
        :pagination="true"
        paginClass="app-fixed-bottom"
      />
    </Content>
  </Page>
</template>

<style lang="scss">
.app-my-orders-page {
  .app-content {
    padding-bottom: 0;
  }
  .app-content-container {
    padding-bottom: 65px;
  }
}
</style>
