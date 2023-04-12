<script>
import { useOrdesStore } from "@/stores/useOrders.js";
import MyItem from "./MyItem.vue";
import MyItemLoader from "./MyItemLoader.vue";

export default {
  components: { MyItem, MyItemLoader },
  props: {
    currentPage: Number,
    per_page: Number,
    pagination: Boolean,
    paginClass: String,
  },
  data() {
    return {
      loader: true,
      currPage: this.currentPage ? this.currentPage : 1,
      polling: null,
    };
  },
  setup() {
    const ordersStore = useOrdesStore();
    return { ordersStore };
  },
  beforeUnmount() {
    clearInterval(this.polling);
  },
  created() {
    if (!this.ordersStore.myList) {
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
        .ftechMyOrders(this.$auth.user_data?.id, this.currPage, this.per_page)
        .then(() => {
          setTimeout(() => {
            this.loader = false;
          }, 100); 
        });
    },
    pollingOrders() {
      this.polling = setInterval(() => {
        this.ordersStore.ftechMyOrders(
          this.$auth.user_data?.id,
          this.currPage,
          this.per_page
        );
      }, this.pollTimer);
    },
    onPageChange(page) {
      this.currPage = page;
      this.ftechMyOrders();
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
        v-for="order in this.ordersStore.myList"
        :key="order.id"
        :order="order"
      ></MyItem>
    </ul>
  </div>

  <EmptyContent
    title="ليس لديك اى طلبات"
    v-if="!loader && this.ordersStore.myList == 0"
  />
  <div
    v-if="this.pagination && this.ordersStore.myTotal >= 2"
    :class="this.paginClass"
  >
    <Pagination
      :totalPages="this.ordersStore.myTotal"
      :perPage="this.per_page"
      :currentPage="this.currPage"
      @pagechanged="onPageChange"
    />
  </div>
</template>
