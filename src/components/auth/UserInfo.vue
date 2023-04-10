<template>
  <div class="app-user-info">
    <div class="app-avatar">
      <img
        :src="this.$auth.user_data?.avatar_urls['48']"
        :alt="this.$auth.user_data?.name"
      />
    </div>
    <div class="app-user-content">
      <h3>{{ this.$auth.user_data?.name }}</h3>
      <p>{{ this.$auth.user_data?.username }}</p>
    </div>
  </div>
</template>

<style lang="scss">
.app-user-info {
  display: flex;
  align-items: center;
  margin-bottom: 18px;
  &.center{
    flex-direction: column;
    text-align: center;
      .app-user-content {
        margin: 0!important;
      }
  }
  .app-user-content {
    margin-left: 15px;
    h3 {
      margin-bottom: 0;
    }
  }
}
</style>
