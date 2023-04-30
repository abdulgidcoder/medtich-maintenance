<script>
import { defineAsyncComponent } from "vue";
import { useOrdersStore } from "@/stores/useOrders.js";
export default {
  components: {
    OrdersList: defineAsyncComponent(() =>
      import("../components/orders/List.vue")
    ),
  },
  setup() {
    const ordersStore = useOrdersStore();
    return { ordersStore };
  },
  mounted() {
    document.title = "Orders";
  },
  methods: {
    async reloadAllOrders() {
      await this.$refs.OrdersList.fetchOrders();
    },
  },
};
</script>
<template>
  <Page class="app-orders-page">
    <Head title="الطلبات" goBack="true" />
    <Content
      :isBoxed="true"
      :pullToRefresh="true"
      :notBottom="true"
      @onRefresh="reloadAllOrders"
    >
      <OrdersList
        ref="OrdersList"
        :per_page="10"
        :pagination="true"
        paginClass="app-fixed-bottom"
      />
    </Content>
  </Page>
</template>
