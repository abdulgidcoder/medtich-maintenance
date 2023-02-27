<script>
import { defineAsyncComponent } from "vue";
export default {
  components: {
    OrdersList: defineAsyncComponent({
      loader: () => import("../components/orders/List.vue"), 
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
  <Page class="app-orders-page">
    <Head title="الطلبات" route="home" />
    <Content :isBoxed="true">
      <OrdersList
        :per_page="7"
        :pagination="true"
        paginClass="app-fixed-bottom"
      />
    </Content>
  </Page>
</template>

<style lang="scss">
.app-orders-page {
  .app-content{
    padding-bottom: 0;
  }
.app-content-box{
  padding-bottom: 65px;
}
}
</style>
