<script>
import { defineAsyncComponent } from "vue";
export default {
  components: {
    FaqList: defineAsyncComponent(() =>
      import("@/layouts/support/FaqList.vue")
    ),
  },
  created() {
    document.title = "Faq";
  },
};
</script>
<template>
  <Page class="app-faq-page">
    <Head title="الأسئلة الشائعة" goBack="true" />
    <Content :pullToRefresh="false" :isBoxed="true" :bottomBar="true">
      <FaqList
        :per_page="10"
        :pagination="true"
        paginClass="app-fixed-bottom"
      />
    </Content>
  </Page>
</template>
