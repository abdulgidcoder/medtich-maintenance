<script>
import MobileSwipeMenu from "mobile-swipe-menu";

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
  methods: {
    initMenu() {
      let meneELe = this.$refs.menuContainer;
      this.mobileMenu = new MobileSwipeMenu(meneELe, {
        mode: "right",
        width: window.innerWidth / 1.5,
        enableBodyHook: true,
        events: {
          drag: (swipe) => {
            let swipeX = swipe.xCurrent - swipe.xStart,
              opacity = (swipeX / window.innerWidth) * -1;
            if (this.$refs.menuOverlay) {
              this.$refs.menuOverlay.style.opacity = opacity;
            }
          },
          start: () => {
            this.isdrag = true;
          },
          stop: () => {
            this.isdrag = false;
          },
          opened: () => {
            this.isOpend = true;
          },
          closed: () => {
            this.isOpend = false;
          },
        },
      });
    },
    dismiss() {
      this.mobileMenu.closeMenu();
    },
    open() {
      this.mobileMenu.openMenu();
    },
  },
};
</script>
<template>
  <button @click="open" class="btn-link">
    <slot name="toggle"></slot>
    <Teleport to="body">
      <div
        v-if="isdrag || isOpend"
        class="app-menu_overlay"
        :class="[{ opened: isOpend }]"
        @click="dismiss"
        ref="menuOverlay"
      ></div>

      <div
        class="app-menu"
        @click.prevent
        :class="[$attrs['class'], { opened: isOpend }]"
        ref="menuContainer"
      >
        <div class="app-menu_wrapper">
          <slot name="content"></slot>
        </div>
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
  background-color: white;
}
</style>
