<script>

export default {
  data() {
    return {
      mobileMenu: null,
      isOpend: false,
      isdrag: false,
    };
  },
  mounted() {
    this.initMenu();
  },
  beforeUnmount() {
    this.mobileMenu = null;
  },
  methods: {
    initMenu() {
      let menuELe = this.$refs.menuContainer;
    },
    dismiss() {
      this.isOpend = false;
    },
    open() {
      this.isOpend = true;
    },
  },
};
</script>
<template>
  <button @click="open" class="btn-link">
    <slot name="toggle"></slot>
    <Teleport to="body">
      <div v-if="isdrag || isOpend" class="app-menu_overlay" :class="[{ opened: isOpend }]" @click="dismiss"
        ref="menuOverlay"></div>
      <div class="app-menu" @click.prevent :class="[$attrs['class'], { opened: isOpend }]" ref="menuContainer">
        <Transition name="slideright">
          <div class="app-menu_wrapper"  v-if="isOpend">
            <slot name="content"></slot>
          </div>
        </Transition>
      </div>
    </Teleport>
  </button>
</template>
<style lang="scss">
.app-menu_overlay {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  z-index: 99;
  background-color: rgba(17, 24, 39, 0.502);
  transition: opacity 0.3s ease-in-out;
  opacity: 0;

  &.opened {
    opacity: 1 !important;
  }
}

.app-menu {
  &_wrapper {
    background-color: white;
    position: fixed;
    top: 0;
    right: 0;
    width: 255px;
    height: 100vh;
    z-index: 999; 
  }

  // &.opened {
  //   opacity: 1 !important;
  //   transform: translateX(0);
  // }
}
</style>
