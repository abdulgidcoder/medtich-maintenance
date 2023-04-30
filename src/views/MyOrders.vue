<script>
import { defineAsyncComponent } from "vue";
import { useOrdersStore } from "@/stores/useOrders.js";
export default {
  props: { show: Boolean },
  components: {
    MyOrdersList: defineAsyncComponent(() =>
      import("@/components/orders/MyList.vue")
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
  <Page class="app-orders-page">
    <Head title="طلباتى" goBack="true" />
    <Content :isBoxed="true" :pullToRefresh="true" @onRefresh="reloadMyOrders">
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
.app-orders-page {
  .app-content {
    padding-bottom: 0;
  }
  .app-content-box {
    padding-bottom: 65px;
  }
}
</style>
