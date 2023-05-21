<template>
  <div class="app-user-info">
    <div class="app-avatar">
      <img
        :src="this.$auth.user_data?.avatar_urls['48']"
        :alt="this.$auth.user_data?.name" 
     
      />
      <!-- <input
        type="file"
        class="woocommerce-Input"
        name="image"
        id="user_avatar"
        accept="image/x-png,image/jpeg"
      /> -->
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
  &.center {
    flex-direction: column;
    text-align: center;
    .app-avatar {
      margin-bottom: 10px;
      width: 75px;
      height: 75px;
      border: 2px solid var(--grey);
      position: relative;
      overflow: visible;
      img {
        border-radius: 50%;
      }
      #user_avatar {
        width: 25px;
        height: 25px;
        position: absolute;
        bottom: 0;
        right: -3px;
        border: none;
        appearance: none;
        display: inline-block;
        padding: 0;
        border-radius: 50%;
        z-index: 10;
        background-color: var(--primary);
        &:after {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          width: 100%;
          height: 100%;
          background-image: url("../../assets/images/pen.svg");
          background-size: 13px;
          background-position: center;
          background-repeat: no-repeat;
        }
        &::-webkit-file-upload-button {
          visibility: hidden;
        }
      }
    }
    .app-user-content {
      margin: 0 !important;
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
