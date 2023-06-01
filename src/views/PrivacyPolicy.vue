<script> 
export default { 
  created() {
    document.title = "Privacy Policy";
  },
};
</script>
<template>
  <Page class="app-contactus-page">
    <Head title="الشروط والاحكام" goBack="true" />
    <Content :isBoxed="true" :bottomBar="true">
      <div v-html="this.$privacy"></div>
    </Content>
  </Page>
</template>

<style lang="scss"></style>
