<script>
import { useOrdersStore } from "@/stores/useOrders.js";
import Item from "./Item.vue";
import ItemLoader from "./ItemLoader.vue";
export default {
  components: { Item, ItemLoader },
  props: {
    per_page: Number,
  },
  data() {
    return {
      loader: true,
      polling: null,
    };
  },
  setup() {
    const ordersStore = useOrdersStore();
    return { ordersStore };
  },
  created() {
    if (!this.ordersStore.lastList) {
      this.fetchOrders();
      this.pollingOrders();
    } else {
      this.loader = false;
      this.pollingOrders();
    }
  },
  beforeUnmount() {
    clearInterval(this.polling);
  },
  methods: {
    fetchOrders() {
      this.ordersStore
        .ftechLast(this.$auth.user_data?.acf["area"], this.per_page)
        .then(() => {
          setTimeout(() => {
            this.loader = false;
          }, 100);
        });
     
    },
    pollingOrders() {
      this.polling = setInterval(() => {
        this.ordersStore.ftechLast(
          this.$auth.user_data?.acf["area"],
          this.per_page
        );
      }, 5000);
    },
  },
};
</script>

<template>
  <div class="orders-list">
    <ul v-if="loader">
      <ItemLoader v-for="n in this.per_page" :key="n" />
    </ul>
    <ul v-else>
      <Item
        v-for="order in this.ordersStore.lastList"
        :key="order.id"
        :order="order"
      ></Item>
    </ul>
  </div>
  <EmptyContent
    title="لا يوجد اى طلبات فى هذا المنطقه"
    v-if="!loader && !this.ordersStore.lastList"
  />
</template>
