<script>
import InfoUser from "@/layouts/InfoUser.vue";
import UserInfo from "@/layouts/auth/UserInfo.vue";
import Nav from "@/layouts/Nav.vue";
export default { 
  components: { Nav, UserInfo, InfoUser },
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
    <Content :isBoxed="true">
      <InfoUser />
      <UserInfo />
      <Nav />
    </Content>
  </div>
</template>

<style lang="scss"></style>
