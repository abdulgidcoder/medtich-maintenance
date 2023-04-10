<script> 
export default {
  props: { show: Boolean },
  components: { Tab },
  data() {
    return {
      auth_user: this.$auth,
    };
  },
};
</script>
<template>
  <div class="app-tab-view app-notify-page">
    <Head title="My Notification" />
    <div class="app-content"></div>
  </div> 
</template>

<style lang="scss"></style>
