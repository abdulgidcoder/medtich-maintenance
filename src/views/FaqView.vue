<script>
import { defineAsyncComponent } from "vue";
export default {
  components: {
    FaqList: defineAsyncComponent(() =>
      import("@/components/support/FaqList.vue")
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
    <Content :pullToRefresh="false" :isBoxed="true" :notBottom="true">
      <FaqList
        :per_page="12"
        :pagination="true"
        paginClass="app-fixed-bottom"
      />
    </Content>
  </Page>
</template>
