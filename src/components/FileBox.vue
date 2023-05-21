<script>
export default {
  props: {
    name: String,
    icon: String,
    size: Number,
  },
  mounted() {},
  methods: {
    returnFileSize(number) {
      if (number < 1024) {
        return `${number} bytes`;
      } else if (number >= 1024 && number < 1048576) {
        return `${(number / 1024).toFixed(1)} KB`;
      } else if (number >= 1048576) {
        return `${(number / 1048576).toFixed(1)} MB`;
      }
    },
  },
};
</script>
<template>
  <div class="app-box-file">
    <img :src="icon" :alt="name" />
    <div class="file-info">
      <h5>{{ name }}</h5>
      <small>الحجم: {{ returnFileSize(this.size) }}</small>
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
