<script>
import UserInfo from "../auth/UserInfo.vue";
import InfoUser from "../InfoUser.vue";
import Menu from "../Menu.vue";
export default { 
  components: { Menu, UserInfo, InfoUser },
  data() {
    return {
      auth_user: this.$auth,
    };
  },
};
</script>
<template>
  <div class="app-tab-view app-profile-page">
    <Head title="حسابى" />
    <Content :isBoxed="true" :disableOffline="true">
      <InfoUser />
      <UserInfo />
      <Menu />
    </Content>
  </div>
</template>

<style lang="scss"></style>
