<script>
export default {
  inheritAttrs: true,
  props: {
    show: Boolean,
    classes: String,
  },
};
</script>

<template>
  <Teleport to="body">
    <Transition name="fadeUp">
      <div class="app-modal" :class="[{ active: show }, classes]" v-if="show">
        <div class="app-modal__container">
          <slot></slot>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
<style lang="scss">
.app-modal {
  &.bottom {
    &.active {
      .app-modal__container {
        transition-delay: 0.8s;
        transform: translateY(0);
      }
    }
    .app-modal__container {
      position: absolute;
      border-radius: 30px 30px 0 0;
      width: 100%;
      right: 0;
      left: 0;
      bottom: 0;
      padding: 20px 20px 80px;
      background-color: var(--white);
      transform: translateY(100%);
      transition: transform 0.4s ease-in-out;
    }
  }
}
</style>
