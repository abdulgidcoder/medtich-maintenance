<script>
import { useOrdesStore } from "@/stores/useOrders.js";
import Details from "../components/orders/single/Details.vue";
import DetailsLoader from "../components/orders/single/DetailsLoader.vue";
export default {
  components: { Details, DetailsLoader },
  data() {
    return {
      orderID: this.$route.params.id,
      order_data: {},
      loader: true,
    };
  },
  setup() {
    const ordersStore = useOrdesStore();
    return { ordersStore };
  },
  created() {},
  mounted() {
    document.title = "Order";
    this.getData();
  },
  methods: {
    getData() {
      this.ordersStore.getOrder(this.orderID).then(() => {
        this.order_data = this.ordersStore.singleOrder;
        setTimeout(() => {
          this.loader = false;
        }, 200);
      });
    },
  },
};
</script>
<template>
  <Page class="app-order-page">
    <Head title="تفاصيل الطلب" route="home">
      <template #right>
        <RouterLink  v-if="this.$auth.user_data?.id ===  order_data.acf?.technician" class="btn btn-light btn-sm" :to="{
          name: 'add-report',
          params: { orderId: orderID },
        }">إضافة تقرير</RouterLink>
      </template>
    </Head>
    <Content :isBoxed="true">
      <DetailsLoader v-if="loader" />
      <Details v-else="!loader" :details="order_data"></Details>
    </Content>
  </Page>
</template>
