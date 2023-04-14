<script>
import { defineAsyncComponent } from "vue";
export default {
  props: { show: Boolean },
  components: {
    MyReportsList: defineAsyncComponent(() => import("../report/List.vue")),
  },
  data() {
    return {
      auth_user: this.$auth,
    };
  },
};
</script>

<template>
  <div class="app-tab-view app-reports-page">
    <Head title="تقاريرى" />
    <Content :isBoxed="true"  :pullToRefresh="true">
      <MyReportsList
        :per_page="8"
        :pagination="true"
        paginClass="app-fixed-bottom"
      />
    </Content>
  </div>
</template>

<style lang="scss"></style>
