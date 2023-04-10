<script>
import { useOrdesStore } from "@/stores/useOrders.js";
import Details from "../components/orders/single/Details.vue";
import DetailsLoader from "../components/orders/single/DetailsLoader.vue";
export default {
  components: { Details, DetailsLoader },
  data() {
    return {
      orderID: this.$route.params.id,
      order_data: this.ordersStore.singleOrder,
      loader: true,
      polling: null,
    };
  },
  setup() {
    const ordersStore = useOrdesStore();
    return { ordersStore };
  },
  beforeUnmount() {
    clearInterval(this.polling);
  },
  created() {
    document.title = "Order";
    this.fetchOrder();
    this.pollingOrder();
  },
  methods: {
    fetchOrder() {
      this.ordersStore.getOrder(this.orderID).then(() => {
        setTimeout(() => {
          this.loader = false;
        }, 200);
      });
    },
    pollingOrder() {
      this.polling = setInterval(() => {
        this.ordersStore.getOrder(this.orderID);
      }, this.pollTimer);
    },
  },
};
</script>
<template>
  <Page class="app-order-page">
    <Head title="تفاصيل الطلب" goBack="true">
      <template #right>
        <div v-if="this.ordersStore.singleOrder?.acf?.technician">
          <RouterLink
            v-if="
              this.$auth.user_data?.id ==
              this.ordersStore.singleOrder?.acf?.technician
            "
            class="btn btn-light btn-sm"
            :to="{
              name: 'add-report',
              params: { orderId: orderID },
            }"
            >إضافة تقرير</RouterLink
          >
        </div>
      </template>
    </Head>
    <Content :isBoxed="true">   
      <DetailsLoader v-if="loader" />
      <Details v-else :details="this.ordersStore.singleOrder"></Details>
    </Content>
  </Page>
</template>
