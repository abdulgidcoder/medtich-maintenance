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
    msg="اكمل بياناتك لكى يتم تفعيل حسابك"
    :show="auth_user.user_data?.acf['status'] == null" 
  />
  <Info
    mode="warning"
    msg="حسابك قيد المراجعة من قبل الإدارة."
    :show="auth_user.user_data?.acf['status'] == 'pending'"
  />
  <Info
    mode="danger"
    msg="حسابك محظور."
    :show="auth_user.user_data?.acf['status'] == 'block'" 
  />
</template>
