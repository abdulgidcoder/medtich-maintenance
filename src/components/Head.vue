<script>
export default {
  props: {
    title: String,
    route: String,
  },
};
</script>
<template>
  <header class="app-header">
    <div class="app-header_left">
      <RouterLink :to="{name:route}" class="app-btn-back" v-show="route">
        <Icon name="arrow-left" />
      </RouterLink>
      <h2>{{ title }}</h2>
    </div>
  </header>
</template>
<style lang="scss">
.app-header {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  width: 100%;
  z-index: 99;
  padding: 20px 15px 15px;
  background-color: var(--bg-grey-2);
  display: flex;
  align-items: center;
  justify-content: space-between;
  &_left {
    flex: 1;
    display: flex;
    align-items: center;
    padding-right: 15px;
  }
  &_right {
    display: flex;
    align-items: center;
  }
  &_link {
    background-color: transparent;
    border: none;
    font-size: 0.875rem;
    color: var(--dark);
  }
  h2 {
    margin-bottom: 0;
  }
}
</style>
