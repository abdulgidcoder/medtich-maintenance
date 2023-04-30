<script>
import { useOrdersStore } from "@/stores/useOrders.js";
import Item from "./Item.vue";
import ItemLoader from "./ItemLoader.vue";

export default {
  components: { Item, ItemLoader },
  props: {
    currentPage: Number,
    per_page: Number,
    pagination: Boolean,
    paginClass: String, 
  },
  expose: ["fetchOrders"],
  data() {
    return {
      loader: true,
      currPage: this.currentPage ? this.currentPage : 1,
      polling: null,
    };
  },
  setup() {
    const ordersStore = useOrdersStore();
    return { ordersStore };
  },
  beforeUnmount() {
    clearInterval(this.polling);
  },
  created() {
    if (!this.ordersStore.list) {
      this.fetchOrders();
      this.pollingOrders();
    } else {
      this.loader = false;
      this.pollingOrders();
    }
  },
  methods: {
    fetchOrders() {
      this.loader = true;
      this.ordersStore
        .ftechOrders(
          this.$auth.user_data?.acf["area"],
          this.currPage,
          this.per_page
        )
        .then(() => {
          this.loader = false;
        });
    },
    pollingOrders() {
      this.polling = setInterval(() => {
        this.ordersStore
          .ftechOrders(
            this.$auth.user_data?.acf["area"],
            this.currPage,
            this.per_page
          )
          .then(() => {
            this.loader = false;
          });
      }, this.pollTimer);
    },
    onPageChange(page) {
      this.currPage = page;
      this.fetchOrders();
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
        v-for="order in this.ordersStore.list"
        :key="order.id"
        :order="order"
      ></Item>
    </ul>
  </div>
  <EmptyContent
    title="لا يوجد اى طلبات فى هذا المنطقه"
    v-if="!loader && !this.ordersStore.list"
  />
  <div
    v-if="this.pagination && this.ordersStore.total >= 2"
    :class="this.paginClass"
  >
    <Pagination
      :totalPages="this.ordersStore.total"
      :perPage="this.per_page"
      :currentPage="this.currPage"
      @pagechanged="onPageChange"
    />
  </div>
</template>
