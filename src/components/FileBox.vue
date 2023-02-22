<script>
export default {
  props: {
    name: String,
    icon: String,
    size: String,
  },
};
</script>
<template>
  <div class="app-box-file">
    <img :src="icon" :alt="name" />
    <div class="file-info">
      <h5>{{ name }}</h5>
      <small>Size: {{ size }}</small>
    </div>
  </div>
</template>
<style lang="scss">
.app-box-file {
  display: flex;
  padding: 10px;
  border: 1px solid var(--grey);
  img {
    width: 41px;
    height: 55px;
    margin-right: 15px;
  }
  small {
    font-size: 14px;
    color: var(--medium);
  }
}
</style>
