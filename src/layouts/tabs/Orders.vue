<script>
import { useOrdersStore } from "@/stores/useOrders.js";
import MyOrdersList from"@/layouts/orders/MyList.vue";
export default { 
  components: {
    MyOrdersList,
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
  <div class="app-tab-view app-my-orders-page">
    <Head title="طلباتى" />
    <Content :isBoxed="true" :pullToRefresh="true" @onRefresh="reloadMyOrders" :enableOffline="true" :bottomBar="true">
      <MyOrdersList
        ref="MyOrdersList"
        :per_page="12"
        :pagination="true"
        paginClass="app-fixed-bottom"
      /> 
    </Content>
  </div>
</template>
