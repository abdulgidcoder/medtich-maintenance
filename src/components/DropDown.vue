<script>
export default {
  props: {},
  data() {
    return {
      opened: false,
    };
  }, 
};
</script>
<template>
  <div class="app-dropdown">
    <button @click="this.opened = !this.opened" class="app-dropdown-toggle">
      <icon name="ellipsis-v" />
    </button>
    <Transition name="scale">
      <div class="app-dropdown-container" v-if="opened">
        <slot />
      </div>
    </Transition>
  </div>
</template>
<style lang="scss">
.app-dropdown {
  position: relative;
  line-height: 1;
  &-toggle {
    padding: 5px;
    background-color: transparent;
    border: none;
    transition: background-color .25s ease-out;
    &:active{
      background-color: var(--white);
    }
    .app-icon {
      svg {
        height: 18px;
      }
    }
  }
  &-container {
    position: absolute;
    left: 0;
    top: 100%;
    padding: 5px;
    background-color: var(--white);
  }
}
</style>
