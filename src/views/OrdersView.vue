<script>
import { defineAsyncComponent } from "vue";
export default {
  components: {
    OrdersList: defineAsyncComponent({
      loader: () => import("../components/orders/List.vue"),
      delay: 3000,
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
  <Page class="app-orders-page">
    <Head title="Orders" route="home" />
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
  .orders-list { 
  }
}
</style>
