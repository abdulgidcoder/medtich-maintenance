<script>
import { defineAsyncComponent } from "vue";
export default {
  components: {
    ContactForm: defineAsyncComponent(() =>
      import("../components/support/ContactForm.vue")
    ),
  },
};
</script>
<template>
  <Page class="app-orders-page">
    <Head title="تواصل معنا" goBack="true" />
    <Content  :isBoxed="true" :notBottom="true">
      <ContactForm />
    </Content>
  </Page>
</template>

<style lang="scss"></style>
