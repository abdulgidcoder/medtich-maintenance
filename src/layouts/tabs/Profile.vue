<script>
import UserInfo from "@/layouts/auth/UserInfo.vue";
import InfoUser from "@/layouts/InfoUser.vue";
import Menu from "@/layouts/Menu.vue";
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
