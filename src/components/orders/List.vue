<script>
import { useOrdesStore } from "@/stores/useOrders.js";
import Item from "./Item.vue";
import ItemLoader from "./ItemLoader.vue";

export default {
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
    };
  },
  setup() {
    const ordersStore = useOrdesStore();
    return { ordersStore };
  },
  mounted() {
    this.getOrders();
  },
  methods: {},
  components: { Item, ItemLoader },
  methods: {
    getOrders() {
      this.ordersStore.ftechOrders(
        this.$auth.user_data?.acf["area"],
        this.currPage,
        this.per_page
      );
      setTimeout(() => {
        this.loader = false;
      }, 1000);
    },
    onPageChange(page) {
      this.currPage = page;
      this.getOrders();
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
        v-for="order in this.ordersStore.list"
        :key="order.id"
        :order="order" 
      ></Item>
      <Info
        mode="warning"
        msg="Not have any orders in this area"
        :show="this.ordersStore.list == 0"
        v-if="!loader"
      />
    </ul>
  </div>
  <div v-if="this.pagination" :class="this.paginClass">
    <Pagination
      :totalPages="this.ordersStore.total"
      :perPage="this.per_page"
      :currentPage="this.currPage"
      @pagechanged="onPageChange"
    />
  </div>
</template> 