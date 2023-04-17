<script>
import { defineAsyncComponent } from "vue";
  
export default {
   components: {
    FaqList: defineAsyncComponent(() =>
      import("../components/support/FaqList.vue")
    ),
  }, 
};
</script>
<template>
  <Page class="app-orders-page">
    <Head title="الأسئلة الشائعة" goBack="true" />
    <Content :pullToRefresh="true" :isBoxed="true" :notBottom="true">
      <FaqList
        :per_page="12"
        :pagination="true"
        paginClass="app-fixed-bottom"
      />
    </Content>
  </Page>
</template>

<style lang="scss"></style>
