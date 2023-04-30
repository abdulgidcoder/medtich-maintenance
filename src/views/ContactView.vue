<script>
import { defineAsyncComponent } from "vue";
export default {
  components: {
    ContactForm: defineAsyncComponent(() =>
      import("../components/support/ContactForm.vue")
    ), 
  },
  created() {
    document.title = "Contact us";
  },
};
</script>
<template>
  <Page class="app-contactus-page">
    <Head title="تواصل معنا" goBack="true" />
    <Content :isBoxed="true" :notBottom="true">
      <ContactForm />
    </Content>
  </Page>
</template>

<style lang="scss"></style>
