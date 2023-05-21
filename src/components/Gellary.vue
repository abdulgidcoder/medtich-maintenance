<script>
export default {
  props: {
    images: Array,
  },
};
</script>

<template>
  <div class="app-gallery" v-if="images != 0">
    <div class="col" v-for="item in images" :key="item">
      <div class="image">
        <span class="badge"><Icon name="correct" /></span>
        <img :src="item" :alt="item" />
      </div>
    </div>
  </div>
</template>
