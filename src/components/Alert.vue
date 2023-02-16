<script>
export default {
  props: {
    mode: {
      type: String,
      required: true,
    },
    msg: {
      type: String,
      required: true,
    },
    show: {
      type: Boolean,
      required: true,
    },
  },
};
</script>
<template>
  <Transition name="fadeUp">
    <div
      v-show="show"
      class="app-alert alert"
      :class="{
        warning: mode == 'warning',
        success: mode == 'success',
        danger: mode == 'danger',
      }"
    >
      {{ msg }}
    </div>
  </Transition>
</template>

<style lang="scss" scoped>
.fadeUp-enter-active,
.fadeUp-leave-active {
  animation: 0.3s ease-in fadeInUp;
  @keyframes fadeInUp {
    0% {
      opacity: 0;
      -webkit-transform: translate3d(0, 100%, 0);
      transform: translate3d(0, 100%, 0);
    }
    100% {
      opacity: 1;
      -webkit-transform: translateZ(0);
      transform: translateZ(0);
    }
  }
}
.fadeUp-enter-from,
.fadeUp-leave-to {
  opacity: 0;
}
.app-alert {
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  color: var(--white);
  padding: 10px;
  z-index: 999;
  text-align: center;  
  font-size: 0.875rem;
 
}
</style>
