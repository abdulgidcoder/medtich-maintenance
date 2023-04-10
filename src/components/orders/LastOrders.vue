<script>
import { useOrdesStore } from "@/stores/useOrders.js";
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
    const ordersStore = useOrdesStore();
    return { ordersStore };
  },
  created() {
    if (!this.ordersStore.lastList) {
      this.fetchOrders();
    } else {
      this.loader = false;
    }
    this.pollingOrders();
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
      }, this.pollTimer);
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
    <Info
      mode="warning"
      msg="لا يوجد اى طلبات فى هذا المنطقه"
      :show="
        !this.ordersStore.lastList || this.ordersStore.lastList.length == 0
      "
      v-if="!loader"
    />
  </div>
</template>
