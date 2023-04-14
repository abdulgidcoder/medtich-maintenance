<script> 
import { defineAsyncComponent } from "vue";
export default {
  props: { show: Boolean },
  components: { 
    MyOrdersList: defineAsyncComponent(() => import("@/components/orders/MyList.vue")),
  },
  data() {
    return {
      auth_user: this.$auth,
    };
  },
};
</script>
<template> 
   <Page class="app-orders-page">
    <Head title="طلباتى" goBack="true"/>
    <Content :isBoxed="true" :pullToRefresh="true">
      <MyOrdersList
        :per_page="8"
        :pagination="true"
        paginClass="app-fixed-bottom"
      />
    </Content>
  </Page>
</template>

<style lang="scss">
.app-orders-page {
  .app-content {
    padding-bottom: 0;
  }
  .app-content-box {
    padding-bottom: 65px;
  }
}
</style>
