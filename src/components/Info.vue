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
  <Transition name="fade">
    <div
      v-if="show"
      class="info-alert alert"
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

<style lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease-in-out;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.info-alert {
  position: relative;
  margin-bottom: 1rem;
  border: 1px solid transparent;
  border-radius: 0.25rem;
  text-align: center;
  font-size: 12px;
      font-weight: 500;
  padding: 10px;
}
</style>
