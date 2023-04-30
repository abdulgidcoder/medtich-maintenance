<script>
export default {
  props: { isBoxed: Boolean },
};
</script>
<template>
  <div class="app-page" :class="{ boxed: isBoxed }"><slot></slot></div>
</template>
<style lang="scss">
.app-page {
  position: relative;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  .app-fixed-bottom {
    box-shadow: 0 -2px 6px var(--grey);
  }
}
</style>
