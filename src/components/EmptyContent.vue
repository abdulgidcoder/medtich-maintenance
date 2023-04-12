<script>
export default {
  props: {
    title: String,
  },
};
</script>

<template>
  <div class="app-empty-content">
    <img src="../assets/images/empty.svg" alt="empty" />
    <h3>{{ title }}</h3>
  </div>
</template>
<style lang="scss">
.app-empty-content {
  text-align: center;
  img {
    max-width: 330px;
    margin: 0 auto 15px;
  }
}
</style>
