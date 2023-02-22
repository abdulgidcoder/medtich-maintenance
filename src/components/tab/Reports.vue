 
<script>
import Tab from "./Tab.vue";
import { defineAsyncComponent } from "vue";
export default {
  props: { show: Boolean },
  components: {
    Tab,
    MyReportsList: defineAsyncComponent({
      loader: () => import("../report/List.vue"),
    }),
  },
  data() {
    return {
      auth_user: this.$auth,
    };
  },
};
</script> 

<template>
  <Tab :show="show">
    <div class="app-tab-view app-reports-page">
      <Head title="تقاريرى" />
      <Content :isBoxed="true">
       <MyReportsList
          :per_page="7"
          :pagination="true"
          paginClass="app-fixed-bottom"
        />
      </Content>
    </div>
  </Tab>
</template>

<style lang="scss"></style>
