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
    if (this.ordersStore.myList == null) {
      this.getData();
    } else {
      this.ordersStore.myList.find((item) => {
        if (item.id == this.orderID) {
          this.order_data = item;
          this.loader = false;
        } else {
          this.getData();
        }
      });
    }
  },
  methods: {
    getData() {
      this.ordersStore.getOrder(this.orderID).then(() => {
        this.order_data = this.ordersStore.singleOrder;
        setTimeout(() => {
          this.loader = false;
        }, 1000);
      });
    },
  },
};
</script>
<template>
  <Page class="app-order-page">
    <Head title="تفاصيل الطلب" route="home">
      <template #right>
        <RouterLink class="btn btn-light btn-sm" :to="{
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
