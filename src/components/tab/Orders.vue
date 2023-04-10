<script> 
import { defineAsyncComponent } from "vue";
export default {
  props: { show: Boolean },
  components: { 
    MyOrdersList: defineAsyncComponent(() => import("../orders/MyList.vue")),
  },
  data() {
    return {
      auth_user: this.$auth,
    };
  },
};
</script>
<template> 
  <div class="app-tab-view app-my-orders-page">
    <Head title="طلباتى" />
    <Content :isBoxed="true">
      <MyOrdersList
        :per_page="8"
        :pagination="true"
        paginClass="app-fixed-bottom"
      />
    </Content>
  </div>
</template>
