<script>
export default {
  props: {
    class: String,
  },
};
</script>

<template>
  <Transition name="fadeUp">
    <div class="app-modal" :class="class">
      <div class="app-modal__container">
        <slot></slot>
      </div>
    </div>
  </Transition>
</template>

<style lang="scss" scoped>
.fadeUp-enter-active,.fadeUp-leave-active {
  opacity: 1;
  transition: .3s ease;
}
.fadeUp-enter-from,.fadeUp-leave-to {
  opacity: 0;
}

</style>
