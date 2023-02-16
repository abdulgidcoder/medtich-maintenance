<script>
import Tab from "./Tab.vue";
export default {  props: { show: Boolean },
  components: { Tab },
  data() {
    return {
      auth_user: this.$auth,
    };
  },
};
</script>
<template>
  <Tab :show="show">
    <div class="app-tab-view app-notify-page">
      <Head title="My Notification"/>
      <div class="app-content"> 
      </div>
    </div>
  </Tab>
</template>

<style lang="scss"> 
</style>
