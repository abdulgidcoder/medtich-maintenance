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
    };
  },
  setup() {
    const ordersStore = useOrdesStore();
    return { ordersStore };
  },
  mounted() {
    this.getOrders();
  },
  methods: {
    getOrders() {
      this.ordersStore
        .ftechLast(this.$auth.user_data?.acf["area"], this.per_page)
        .then(() => {
          setTimeout(() => {
            this.loader = false;
          }, 1000);
        });
    },
  },
};
</script>

<template>
  <div class="orders-list">
    <ul>
      <ItemLoader v-if="loader" v-for="n in this.per_page" :key="n" />
      <Item
        v-else="!loader"
        v-for="order in this.ordersStore.lastList"
        :key="order.id"
        :order="order" 
      ></Item>
      <Info
        mode="warning"
        msg="Not have any orders in this area"
        :show="this.ordersStore.lastList == 0"
        v-if="!loader"
      />
    </ul>
  </div>
</template>
