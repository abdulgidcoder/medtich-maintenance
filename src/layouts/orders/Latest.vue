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
  mounted() {
    this.fetchOrders();
    if (this.ordersStore.lastList) {
      this.loader = false;
    }  
    this.pollingOrders();
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
    <EmptyContent
      title="لا يوجد اى طلبات فى هذا المنطقه"
      :iconsSize="150"
      v-if="!loader && this.ordersStore.lastList.length == 0"
    />
  </div>
</template>
