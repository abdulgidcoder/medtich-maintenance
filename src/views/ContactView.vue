<script>
import { defineAsyncComponent } from "vue";
export default {
  components: {
    ContactForm: defineAsyncComponent(() =>
      import("@/layouts/support/ContactForm.vue")
    ), 
  },
  mounted() {
    document.title = "Contact us";
  },
};
</script>
<template>
  <Page class="app-contactus-page">
    <Head title="تواصل معنا" goBack="true" />
    <Content :isBoxed="true" :bottomBar="true">
      <ContactForm />
    </Content>
  </Page>
</template>

<style lang="scss"></style>
