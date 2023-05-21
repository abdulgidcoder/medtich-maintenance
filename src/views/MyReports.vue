<script> 
import { defineAsyncComponent } from "vue";
export default {
  props: { show: Boolean },
  components: {
    MyReportsList: defineAsyncComponent(() => import("@/layouts/report/List.vue")),
  },
  data() {
    return {
      auth_user: this.$auth,
    };
  },
};
</script>
<template> 
   <Page class="app-reports-page">
<Head title="تقاريرى" goBack="true"/>
    <Content :isBoxed="true" :pullToRefresh="true">
      <MyReportsList
        :per_page="10"
        :pagination="true"
        paginClass="app-fixed-bottom"
      />
    </Content>
  </Page>
</template>

<style lang="scss">
.app-reports-page {
  .app-content {
    padding-bottom: 0;
  }
  .app-content-container {
    padding-bottom: 65px;
  }
}
</style>
