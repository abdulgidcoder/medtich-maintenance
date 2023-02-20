<template>
  <div class="skeleton">&nbsp;</div>
</template>

<script setup>
defineProps({
  height: {
    type: String,
  },
  width: {
    type: String,
  },
  borderRadius: {
    type: String,
  },
});
</script>

<style scoped lang="scss">
.skeleton {
  position: relative;
  overflow: hidden;
  height: v-bind(height);
  width: v-bind(width);
  border-radius: 4px;
  background-color: #e7e7e7;
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.7),
      transparent
    );
    animation: wave 1.3s linear 0.5s infinite;
  }
  @keyframes wave {
    0% {
      opacity: 0;
      transform: translateX(-100%);
    }
    65% {
      opacity: 1;
      transform: translateX(100%);
    }
    100% {
      opacity: 1;
      transform: translateX(100%);
    }
  }
}
</style>
