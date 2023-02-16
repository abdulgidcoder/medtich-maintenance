<script>
export default {
  props: { show: Boolean },
};
</script>
<template>
  <Transition name="tab">
    <slot v-if="show"></slot>
  </Transition>
</template>
<style>
.tab-enter-active,
.tab-leave-active {
  transition: all 0.5s ease;
}
.tab-enter-from,
.tab-leave-to {
  opacity: 0;
}
</style>
