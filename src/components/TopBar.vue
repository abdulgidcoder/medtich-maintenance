<script>
export default {
  props: {
    class: String,
  },
};
</script>

<template>
  <header class="app-topbar" :class="class">
    <div class="app-topbar__wrapper">
      <div class="app-topbar__wrapper-left"><slot name="left"></slot></div>
      <div class="app-topbar__wrapper-right"><slot name="right"></slot></div>
    </div>
  </header>
</template>
<style lang="scss">
.app-topbar {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  width: 100%;
  z-index: 99;
  background-color: var(--bg-white);
  &.fixed {
    position: fixed;
  }
  &__wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px;
    &-left {
      flex: 1;
      display: flex;
      align-items: center;
      margin-right: 8px;
      h4{
        margin-bottom: 0;
      }
    }
    &-right {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }

  .app-avatar {
    width: 30px;
    height: 30px;
  }
  .back-home {
    display: inline-flex;
    align-items: center;
    h1 {
      margin-bottom: 0;
      margin-left: 12px;
    }
  }
}
</style>
