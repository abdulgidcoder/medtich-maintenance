<script>
export default {
  props: {
    loaded: Boolean,
    class: String,
  }
};
</script>

<template>
  <Transition>
    <div class="preloader" v-if="!loaded" :class="class">
      <span class="loader"></span>
    </div>
  </Transition>
</template>

<style lang="scss" >
.v-enter-active,
.v-leave-active {
  transition: opacity 0.4s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
.preloader {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: #fff;
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
  &.fixed {
    position: fixed;
  }
}
.loader {
  width: 48px;
  height: 48px;
  border: 5px solid var(--primary);
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
