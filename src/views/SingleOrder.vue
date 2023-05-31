<script>
import { useOrdersStore } from "@/stores/useOrders.js";
import Details from "@/layouts/orders/single/Details.vue";
import DetailsLoader from "@/layouts/orders/single/DetailsLoader.vue";
import { defineAsyncComponent } from "vue";
export default {
  components: {
    Details,
    DetailsLoader,
    Setting: defineAsyncComponent({
      loader: () => import("@/layouts/orders/single/Setting.vue"),
    }),
  },
  data() {
    return {
      orderID: this.$route.params.id,
      order_data: {},
      new_object: false,
      allowCustomerData:
        this.$auth.user_data?.id ==
        this.ordersStore.singleOrder?.acf?.technician?.ID,
      loader: true,
      polling: null,
      showSetting: false,
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
    document.title = "Order";
    if (this.searchOrderInStore(this.ordersStore.lastList, this.orderID)) {
      this.loader = false;
      this.order_data = this.searchOrderInStore(
        this.ordersStore.lastList,
        this.orderID
      );
      this.pollingOrder();
    } else if (this.searchOrderInStore(this.ordersStore.list, this.orderID)) {
      this.loader = false;
      this.order_data = this.searchOrderInStore(
        this.ordersStore.list,
        this.orderID
      );
      this.pollingOrder();
    } else if (this.searchOrderInStore(this.ordersStore.myList, this.orderID)) {
      this.loader = false;
      this.order_data = this.searchOrderInStore(
        this.ordersStore.myList,
        this.orderID
      );
      this.pollingOrder();
    }else if (this.searchOrderInStore(this.ordersStore.ProcessingOrders, this.orderID)) {
      this.loader = false;
      this.order_data = this.searchOrderInStore(
        this.ordersStore.ProcessingOrders,
        this.orderID
      );
      this.pollingOrder();
    } else {
      this.fetchOrder();
      this.pollingOrder();
    }
  },
  methods: {
    searchOrderInStore(array, val) {
      if (array) {
        array.find((item) => {
          if (item.id == val) {
            this.new_object = item.id == val ? item : false;
          }
        });
      }
      return this.new_object;
    },
    fetchOrder() {
      this.loader = true;
      this.ordersStore.getOrder(this.orderID).then(() => {
        this.order_data = this.ordersStore.singleOrder;
        this.loader = false;
      });
    },
    pollingOrder() {
      this.polling = setInterval(() => {
        this.ordersStore.getOrder(this.orderID).then(() => {
          this.order_data = this.ordersStore.singleOrder;
          this.loader = false;
        });
      }, this.$pollTimer);
    },
  },
};
</script>
<template>
  <Page class="app-order-page">
    <Head title="تفاصيل الطلب" goBack="true">
      <template #right>
        <template v-if="this.$auth.role == 'customer'">
          <Setting :details="order_data" :loaded="this.loader" />
        </template>
      </template>
    </Head>
    <Content :isBoxed="true" :pullToRefresh="true" @onRefresh="fetchOrder" :enableOffline="true">
      <DetailsLoader v-if="loader" />
      <Details v-else :details="order_data"></Details>
    </Content>
  </Page>
</template>
<style lang="scss">
.app-order-page {
  .app-content-container {
    background: var(--bg-grey) !important;
  }
}
</style>
