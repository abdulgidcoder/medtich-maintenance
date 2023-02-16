<script>
export default {
  props: { show: Boolean },
  data() {
    return {
      auth_user: this.$auth,
    };
  },
};
</script>
<template>
  <Info
    mode="warning"
    msg="Your account is under review by the administration."
    :show="auth_user.user_data?.acf['status'] == 'pending' ||
      auth_user.user_data?.acf['status'] == null" 
  />
  <Info
    mode="danger"
    msg="Your Account is Blocked."
    :show="auth_user.user_data?.acf['status'] == 'block'" 
  />
</template>
