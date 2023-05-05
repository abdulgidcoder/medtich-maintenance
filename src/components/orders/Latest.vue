<script>
import { useOrdersStore } from "@/stores/useOrders.js";
import Item from "./Item.vue";
import ItemLoader from "./ItemLoader.vue";
export default {
  components: { Item, ItemLoader },
  props: {
    per_page: Number,
  },
  expose: ["fetchOrders"],
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
      this.loader = true;
      this.ordersStore
        .ftechLast(this.$auth.user_data?.acf["area"], this.per_page)
        .then(() => {
          this.loader = false;
        });
    },
    pollingOrders() {
      this.polling = setInterval(() => {
        this.ordersStore
          .ftechLast(this.$auth.user_data?.acf["area"], this.per_page)
          .then(() => {
            this.loader = false;
          });
      }, 3000);
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
    :iconsSize="250"
    v-if="!loader && this.ordersStore.lastList.length == 0"
  />
</template>
