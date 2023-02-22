<script>
import UserInfo from "../auth/UserInfo.vue";
import Menu from "../Menu.vue";
import Tab from "./Tab.vue";
export default {
  props: { show: Boolean },
  components: { Tab, Menu, UserInfo },
  data() {
    return {
      auth_user: this.$auth,
    };
  },
};
</script>
<template>
  <Tab :show="show">
    <div class="app-tab-view app-profile-page">
      <Head title="My Profile" />
      <Content :isBoxed="true">
        <UserInfo />
        <Menu />
      </Content>
    </div>
  </Tab>
</template>

<style lang="scss"></style>
