<script>
import { useOrdesStore } from "@/stores/useOrders.js";
import MyItem from "./MyItem.vue";
import MyItemLoader from "./MyItemLoader.vue";

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
  components: { MyItem, MyItemLoader },
  methods: {
    getOrders() {
      this.ordersStore.ftechMyOrders(
        this.$auth.user_data?.id,
        this.currPage,
        this.per_page
      ).then(()=>{
          setTimeout(() => {
        this.loader = false;
      }, 1000);
      })
    },
    onPageChange(page) {
      this.currPage = page;
      this.getOrders();
    },
  },
};
</script>

<template>
  <div class="my-orders-list">
    <ul>
      <MyItemLoader v-if="loader" v-for="i in this.per_page" :key="i" />
      <MyItem
        v-else="loader"
        v-for="order in this.ordersStore.myList"
        :key="order.id"
        :order="order"
      ></MyItem>
          <Info
        mode="warning"
        msg="Not have any orders in this area"
        :show="this.ordersStore.myList == 0"
        v-if="!loader"
      />
    </ul>
  </div>
  <div v-if="this.pagination && this.ordersStore.myTotal >= 2" :class="this.paginClass">
    <Pagination
      :totalPages="this.ordersStore.myTotal"
      :perPage="this.per_page"
      :currentPage="this.currPage"
      @pagechanged="onPageChange"
    />
  </div>
</template> 