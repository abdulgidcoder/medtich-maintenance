<script>
export default {
  props: {
    title: String,
    goBack: String,
  },
};
</script>
<template>
  <header class="app-header">
    <div class="app-header_left">
      <button @click="this.$router.go(-1)" class="app-btn-back" v-if="goBack">
        <Icon name="arrow-left" />
      </button>
      <slot name="left"></slot>
    </div>
    <div class="app-header_center" v-if="title">
      <h2>{{ title }}</h2>
    </div>
    <div class="app-header_right">
      <slot name="right"></slot>
    </div>
  </header>
</template>
<style lang="scss">
.app-header {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  width: 100%;
  z-index: 99;
  padding: 20px 15px 15px;
  background-color: var(--primary);
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 70px;
  &_left {
    position: relative;
    z-index: 5;
    display: inline-flex;
    align-items: center;
  }
  &_center {
    flex: 1;
    text-align: center;
    padding: 0 90px;
    position: absolute;
    width: 100%;
    left: 0;
    right: 0;
    z-index: 1;
  }
  &_right {
    position: relative;
    z-index: 5;
  }
  &_link {
    background-color: transparent;
    border: none;
    font-size: 0.875rem;
    color: var(--dark);
  }
  h2 {
    margin-bottom: 0;
    color: var(--white);
  }
}
</style>
