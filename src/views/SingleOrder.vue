<script>
import { useOrdersStore } from "@/stores/useOrders.js";
import Details from "../components/orders/single/Details.vue";
import DetailsLoader from "../components/orders/single/DetailsLoader.vue";
export default {
  components: { Details, DetailsLoader },
  data() {
    return {
      orderID: this.$route.params.id,
      order_data: this.ordersStore.singleOrder,
      allowCustomerData:
        this.$auth.user_data?.id ==
        this.ordersStore.singleOrder?.acf?.technician,
      loader: true,
      polling: null,
    };
  },
  setup() {
    const ordersStore = useOrdersStore();
    return { ordersStore };
  },
  beforeUnmount() {
    clearInterval(this.polling);
  },
  created() {
    document.title = "Order";
    this.fetchOrder();
  },
  methods: {
    fetchOrder() {
      this.ordersStore.getOrder(this.orderID).then(() => {
        setTimeout(() => {
          this.loader = false;
        }, 200);
        this.pollingOrder();
      });
    },
    pollingOrder() {
      this.polling = setInterval(() => {
        this.ordersStore.getOrder(this.orderID);
      }, 5000);
    },
  },
};
</script>
<template>
  <Page class="app-order-page">
    <Head title="تفاصيل الطلب" goBack="true">
      <template #right> </template>
    </Head>
    <Content :isBoxed="true" :pullToRefresh="true">
      <DetailsLoader v-if="loader" />
      <Details v-else :details="this.ordersStore.singleOrder"></Details>
    </Content>
  </Page>
</template>
<style lang="scss">
.app-order-page {
  .app-content-box {
    background: var(--bg-grey);
  }
}
</style>
