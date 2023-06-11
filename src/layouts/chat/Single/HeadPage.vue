<script>
export default {
  props: { userInfo: Object, loader: Boolean },
};
</script>
<template>
  <Head class="head-chat" goBack="true">
    <template #left> 
      <template v-if="loader">
        <div class="app-avatar">
          <Skeleton width="35px" height="35px" borderRadius="50%" />
        </div>
        <h4 class="chat-username">
          <Skeleton width="100px" height="16px" />
        </h4>
      </template>
      <template v-else>
        <div class="app-avatar" v-html="userInfo?.user_avatar"></div>
        <h4 class="chat-username">
          {{ userInfo?.display_name }}
        </h4>
      </template>
    </template>
  </Head>
</template>
<style lang="scss" scoped>
.head-chat {
  &.app-header_left {
    display: flex;
    align-items: center;
  }
  .app-avatar {
    width: 35px;
    height: 35px;
  }
  .app-avatar,
  .chat-username {
    margin-right: 15px;
    margin-bottom: 0;
  }
}
</style>
