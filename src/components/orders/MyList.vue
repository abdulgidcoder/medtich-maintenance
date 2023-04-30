<script>
import { useOrdersStore } from "@/stores/useOrders.js";
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
  expose: ['fetchOrders'],
  data() {
    return {
      loader: true,
      currPage: this.currentPage ? this.currentPage : 1,
      status: "",
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
        .ftechMyOrders(this.$auth, this.status, this.currPage, this.per_page)
        .then(() => {
          this.loader = false;
        });
    },
    pollingOrders() {
      this.polling = setInterval(() => {
        this.ordersStore
          .ftechMyOrders(this.$auth, this.status, this.currPage, this.per_page)
          .then(() => {
            this.loader = false;
          });
      }, this.pollTimer);
    },
    onPageChange(page) {
      this.currPage = page;
      this.fetchOrders();
    },
    fillterbyStatus(status, ele) {
      this.status = status;
      this.currPage = 1;
      this.fetchOrders();
    },
  },
};
</script>

<template>
  <div class="my-orders-list">
    <div class="app-fillter">
      <button
        :class="{ active: status == '' }"
        @click="fillterbyStatus('', $event.target)"
      >
        الكل
      </button>
      <button
        v-if="this.$auth.role == 'customer'"
        :class="{ active: status == 'active' }"
        @click="fillterbyStatus('active', $event.target)"
      >
        تلقى العروض
      </button>
      <button
        v-if="this.$auth.role == 'customer'"
        :class="{ active: status == 'pending' }"
        @click="fillterbyStatus('pending', $event.target)"
      >
        فى انتظار الدفع
      </button>

      <button
        :class="{ active: status == 'processing' }"
        @click="fillterbyStatus('processing', $event.target)"
      >
        قيد التنفيذ
      </button>
      <button
        :class="{ active: status == 'completed' }"
        @click="fillterbyStatus('completed', $event.target)"
      >
        اكتمل
      </button>
      <button
        :class="{ active: status == 'cancelled' }"
        @click="fillterbyStatus('cancelled', $event.target)"
      >
        ملغى
      </button>
    </div>
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
    v-if="(!loader && !this.ordersStore.myList) || this.ordersStore.myList == 0"
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
