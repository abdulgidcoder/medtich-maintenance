<script>
export default {
  props: {
    src: String,
    alt: String,
    width: Number,
  },
};
</script>

<template>
  <div class="app-avatar">
    <img
      :src="src"
      :alt="alt"
      :style="{ width: width + 'px', height: width + 'px' }"
    />
  </div>
</template>
