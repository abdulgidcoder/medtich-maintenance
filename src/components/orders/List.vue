<script>
import { useOrdesStore } from "@/stores/useOrders.js";
import Item from "./Item.vue";
export default {
  props: {
    currentPage: String,
    per_page: String,
  },
  data() {
    return {
      user_area: this.$auth.user_data?.acf["area"],
      loader: false,
    };
  },
  setup() {
    const ordersStore = useOrdesStore();
    return { ordersStore };
  },
  mounted() {
    document.title = "Reports";
    this.loader = false;
    if (this.ordersStore.list == 0 || this.ordersStore.list == null) {
      this.getOrders();
      this.loader = true;
    } else {
      this.loader = true;
    }
  },
  methods: {},
  components: { Item },
  methods: {
    getOrders() {
      this.loader = false;
      this.ordersStore.ftechOrders(
        this.user_area,
        this.currentPage,
        this.per_page
      );
      this.loader = true;
    },
    onPageChange(page) {
      this.currentPage = page;
      this.getOrders();
    },
  },
};
</script>

<template>
  <div class="orders-list">
    <TransitionGroup name="list" tag="ul">
      <Item
        v-for="order in this.ordersStore.list"
        :key="order.id"
        :title="order.title.rendered"
        :date="order.date"
        :name="order.acf['name']"
        :area="order.acf['area']"
      ></Item>

      <!-- <Pagination
        :totalPages="ordersStore.total"
        :perPage="5"
        :currentPage="this.currentPage"
        @pagechanged="onPageChange"
      /> -->
    </TransitionGroup>
    <Loader :loaded="loader" class="fixed" />
  </div>
</template>
<style lang="scss">
.orders-list {
  position: relative;
}

.list-enter-active,
.list-leave-active {
  opacity: 1;
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
}
</style>
