<script>
import { defineAsyncComponent } from "vue";
export default {
  components: {
    OrdersList: defineAsyncComponent({
      loader: () => import("../components/orders/List.vue"),
      delay: 200,
      timeout: 3000,
    }),
  },
  data() {
    return {
      auth_user: this.$auth,
    };
  },
    mounted() {
    document.title = "Orders";  
  },
};
</script>
<template>
  <div class="app-page app-orders-page">
    <Head title="Orders" route="home" />
    <div class="app-content">
      <OrdersList :per_page="6" :pagination="true" paginClass="app-fixed-bottom"/> 
    </div>
  </div>
</template>

<style lang="scss">
.app-orders-page{
  .orders-list{
    margin-top: 20px;
  }
}
</style>
