<script>
import { useOrdersStore } from "@/stores/useOrders.js";
import MyItem from "./MyItem.vue";
import MyItemLoader from "./MyItemLoader.vue";
export default {
  components: { MyItem, MyItemLoader },
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
    if (this.ordersStore.ProcessingOrders) {
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
        .ftechProcessingOrders(this.$auth, this.per_page)
        .then(() => {
          this.loader = false;
        });
    },
    pollingOrders() {
      this.polling = setInterval(() => {
        this.ordersStore
          .ftechProcessingOrders(this.$auth, this.per_page)
          .then(() => {
            this.loader = false;
          });
      }, this.$pollTimer);
    },
  },
};
</script>

<template>

  <div class="my-orders-list"> 
    <ul v-if="loader">
      <MyItemLoader v-for="i in this.per_page" :key="i" />
    </ul>
    <ul v-else>
      <MyItem
        v-for="order in this.ordersStore.ProcessingOrders"
        :key="order.id"
        :order="order"
      ></MyItem>
    </ul>
    <EmptyContent
      title="لا يوجد اى طلبات قيد التنفيذ"
      :iconsSize="150"
      v-if="!loader && this.ordersStore.ProcessingOrders.length == 0"
    />
  </div>
</template>
