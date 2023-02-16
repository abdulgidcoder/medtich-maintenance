<script>
import { useOrdesStore } from "@/stores/useOrders.js";

export default {
  components: {},
  data() {
    return {
      orderID: this.$route.params.id,
      order_data: {},
      loader: false,
    };
  },
  setup() {
    const ordersStore = useOrdesStore();
    return { ordersStore };
  },
  mounted() {
    if (this.ordersStore.myList == null) {
      this.ordersStore
        .ftechMyOrders(this.$auth.user_data?.id, 1, 5)
        .then(() => {
          this.ordersStore.myList.find((item) => {
            if (item.id == this.orderID) {
              this.order_data = item;
              this.loader= true;
            }
          });
        });
    } else {
      this.ordersStore.myList.find((item) => {
        if (item.id == this.orderID) {
          this.order_data = item;
           this.loader= true;
        }
      });
    }
  },
  methods: {},
};
</script>
<template>
  <main class="single-order">
    <div class="container">
      <h1 v-html="order_data.title?.rendered"></h1>
          <Loader :loaded="loader" class="fixed" />
    </div>
  </main>
</template>

<style scoped>
.single-order .list-group p {
  font-size: 17px;
  margin-left: 10px;
}
</style>
