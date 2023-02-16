<script>
import { useOrdesStore } from "@/stores/useOrders.js";
import MyItem from "./MyItem.vue";
export default {
  props: {
    currentPage: Number,
    per_page: Number,
    pagination: Boolean,
    paginClass: String
  },
  data() {
    return {
      // user_area: ,
      loader: false,
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
  components: { MyItem },
  methods: {
    getOrders() {
      this.loader = false;
      this.ordersStore.ftechMyOrders(
        this.$auth.user_data?.id,
        this.currPage,
        this.per_page
      );
      this.loader = true;
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
        <MyItem
        v-for="order in this.ordersStore.myList"
        :key="order.id"
        :order="order" 
        ></MyItem>
      </ul>
    <Loader :loaded="loader" class="fixed" />
    <div v-if="this.pagination" :class="this.paginClass">
      <Pagination
        :totalPages="this.ordersStore.myTotal"
        :perPage="this.per_page"
        :currentPage="this.currPage"
        @pagechanged="onPageChange"
    
      />
    </div>
  </div>
</template>
<style lang="scss">
.my-orders-list {
  position: relative;
} 
</style>
