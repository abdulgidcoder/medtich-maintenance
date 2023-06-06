<script>
export default {
  props: {
    title: String,
    iconsSize: Number,
  },
};
</script>

<template>
  <div class="app-empty-content">
    <img
      src="../assets/images/empty.svg"
      alt="empty"
      :style="{ 'max-width': iconsSize + 'px' }"
    />
    <h4>{{ title }}</h4>
  </div>
</template>
<style lang="scss">
.app-empty-content {
  text-align: center;
  img {
    max-width: 330px;
    margin: 0 auto 0;
  }
  h4 {
    color: var(--medium);
  }
}
</style>
