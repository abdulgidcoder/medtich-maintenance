<script>
import { useOrdersStore } from "@/stores/useOrders.js";
import Details from "../components/orders/single/Details.vue";
import DetailsLoader from "../components/orders/single/DetailsLoader.vue";
export default {
  components: { Details, DetailsLoader },
  data() {
    return {
      orderID: this.$route.params.id,
      order_data: {},
      new_object: false,
      allowCustomerData:
        this.$auth.user_data?.id ==
        this.ordersStore.singleOrder?.acf?.technician,
      loader: true,
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
    document.title = "Order"; 
    if (this.searchOrderInStore(this.ordersStore.lastList,this.orderID)) {
      this.loader = false;
      this.order_data = this.searchOrderInStore(this.ordersStore.lastList,this.orderID);
      this.pollingOrder(); 
    } else if (this.searchOrderInStore(this.ordersStore.list,this.orderID)) {
      this.loader = false;
      this.order_data = this.searchOrderInStore(this.ordersStore.list,this.orderID);
      this.pollingOrder(); 
    }else if (this.searchOrderInStore(this.ordersStore.myList,this.orderID)) {
      this.loader = false;
      this.order_data = this.searchOrderInStore(this.ordersStore.myList,this.orderID);
      // this.pollingOrder(); 
    } else {
      this.fetchOrder();
      // this.pollingOrder();
    }
  },
  methods: {
     searchOrderInStore (array, val){  
      if (array) {
        array.find((item) => { 
          if(item.id == val){ 
             this.new_object = item.id == val ? item : false; 
          } 
        })
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
      <template #right></template>
    </Head>
    <Content
      :isBoxed="true"
      :pullToRefresh="true"
      :notBottom="true"
      @onRefresh="fetchOrder"
    > 
    
      <DetailsLoader v-if="loader" />
      <Details v-else :details="order_data"></Details>
    </Content>
  </Page>
</template>
<style lang="scss">
.app-order-page {
  .app-content-box {
    background: var(--bg-grey);
  }
}
</style>
