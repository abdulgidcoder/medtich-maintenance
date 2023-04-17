<script>
export default {
  inheritAttrs: false,

  props: {
    show: Boolean,
    animation: String,
  },
  emits: ["closeModal"],
  methods: {
    closeModal() {
      this.$emit("closeModal");
    },
  },
};
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="show" class="app-modal_overlay"></div>
    </Transition>
    <Transition :name="animation">
      <div
        class="app-modal"
        :class="[{ active: show }, $attrs['class']]"
        v-if="show"
        @click="closeModal"
      >
        <div class="app-modal__container" @click.stop>
          <slot></slot>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
<style lang="scss">
.app-modal_overlay {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  z-index: 99;
  background-color: rgba(17, 24, 39, 0.502);
}
.app-modal {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  z-index: 101;
  .app-modal__container {
    position: absolute;
    z-index: 99;
  }
  &.bottom {
    .app-modal__container {
      border-radius: 30px 30px 0 0;
      width: 100%;
      right: 0;
      left: 0;
      bottom: 0;
      padding: 20px 20px 80px;
      background-color: var(--white);
    }
  }
  &.center {
    .app-modal__container {
      position: absolute;
      border-radius: 15px;
      width: 100%;
      max-width: 78vw;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: var(--white);
      text-align: center;
      padding: 25px 15px;
      p {
        margin-bottom: 25px;
      }
      .btn-secondary {
        margin-right: 20px;
      }
    }
  }
}
</style>
