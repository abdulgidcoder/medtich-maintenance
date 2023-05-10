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
  width: 100vw;
  // height: 100vh;
  min-height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
}
</style>
