<script>
import { useOrdesStore } from "@/stores/useOrders.js";
import Details from "../components/orders/single/Details.vue";
import DetailsLoader from "../components/orders/single/DetailsLoader.vue";
export default {
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
    getArea(name) {},
  },
  components: { Details, DetailsLoader },
};
</script>
<template>
  <div class="app-page app-order-page">
    <Head title="Order Details" route="home" />
    <div class="app-content">
      <DetailsLoader v-if="loader" />
      <Details v-else="!loader" :details="order_data"></Details>
    </div>
  </div>
</template>

<style lang="scss">
.app-order-page {
  .app-content {
    background-color: var(--bg-grey-2);
  }
}
</style>
