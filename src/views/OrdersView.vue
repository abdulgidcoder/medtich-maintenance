<script>
import { defineAsyncComponent } from "vue";
export default {
  components: {
    OrdersList: defineAsyncComponent(() =>
      import("../components/orders/List.vue")
    ),
  },
  data() {
    return {};
  },
  mounted() {
    document.title = "Orders";
  },
};
</script>
<template>
  <Page class="app-orders-page">
    <Head title="الطلبات" goBack="true" />
    <Content :isBoxed="true" :pullToRefresh="true">
      <OrdersList
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
