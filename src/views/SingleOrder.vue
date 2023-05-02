<script>
import { useOrdersStore } from "@/stores/useOrders.js";
import Details from "../components/orders/single/Details.vue";
import DetailsLoader from "../components/orders/single/DetailsLoader.vue";
export default {
  components: { Details, DetailsLoader },
  data() {
    return {
      orderID: this.$route.params.id,
      order_data: {},
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
    if (!this.ordersStore.myList) {
      this.fetchOrder();
      this.pollingOrder();
    } else {
      this.ordersStore.myList.find((item) => {
        if (item.id == this.orderID) {
          this.loader = false;
          this.order_data = item; 
          this.pollingOrder();
        }
      });
    }
  },
  methods: {
    fetchOrder() { 
      this.loader = true; 
      this.ordersStore.getOrder(this.orderID).then(() => {
        this.order_data = this.ordersStore.singleOrder; 
        this.loader = false;  
      });
    },
    pollingOrder() {
      this.polling = setInterval(() => {
        this.ordersStore.getOrder(this.orderID).then(() => {
          this.order_data = this.ordersStore.singleOrder;
        });
      }, this.pollTimer);
    },
  },
};
</script>
<template>
  <Page class="app-order-page">
    <Head title="تفاصيل الطلب" goBack="true">
      <template #right></template>
    </Head>
    <Content :isBoxed="true" :pullToRefresh="true"  :notBottom="true" @onRefresh="fetchOrder">
      <DetailsLoader v-if="loader" />
      <Details v-else :details="order_data"></Details>
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
