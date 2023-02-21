<script>
export default {
  props: { isBoxed: Boolean },
};
</script>
<template>
  <div class="app-content" :class="{ boxed: isBoxed }">
    <div v-if="isBoxed" class="app-content-box">
      <slot></slot>
    </div>
    <slot v-else="isBoxed"></slot>
  </div>
</template>
<style lang="scss">
.app-content {
  position: relative;
  z-index: 1;
  width: 100%;
  height: 100vh;
  padding: 70px 15px 75px;
  overflow-x: hidden;
  overflow-y: auto;
  background-color: var(--bg-white);
  &.boxed {
    background-color: var(--primary);
  }
  &-box {
    margin: 0 -15px -15px;
    padding: 20px 15px;
    background: var(--bg-white);
    min-height: 100%;
    border-radius: 25px 25px 0 0;
  }
}

.app-fixed-bottom {
  position: fixed;
  padding: 15px;
  background-color: var(--bg-white);
  right: 0;
  bottom: 0;
  left: 0;
  width: 100vw;
  z-index: 2;
}
</style>
