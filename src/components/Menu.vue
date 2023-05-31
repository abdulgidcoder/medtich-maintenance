<script>
export default {
  data() {
    return {
      startX: null,
      currentX: null,
      lastX: null,
      menuWidth: null,
      maxDragX: null,
      showMenu: false,
      showOverlay: false,
    };
  },
  mounted() {
    // Get the width of the swipe menu and calculate the maximum dragdistance
    this.menuWidth = this.$refs.swipeMenu.offsetWidth;
    this.maxDragX = this.menuWidth * 0.8;
    document.addEventListener("touchstart", (event) => {
      this.handleTouchStart(event);
    });
    document.addEventListener("touchmove", (event) => {
      this.handleTouchMove(event);
    });
    document.addEventListener("touchend", (event) => {
      this.handleTouchEnd(event);
    });
  },
  methods: {
  handleTouchStart(e) {
      this.startX = e.touches[0].clientX;
      this.lastX = this.startX;
  
      // Reset the transition duration to 0 to prevent jerky movement
      this.$refs.swipeMenu.style.transitionDuration = '0s';
    },
    handleTouchMove(e) {
      this.currentX = e.touches[0].clientX;
  
      // Calculate the distance dragged and update the position of the swipe menu
      var dragX = this.currentX + this.lastX;
      
      if (dragX < -50) {
        // Dragging right, hide the swipe menu
        this.$refs.swipeMenu.style.transform = 'translateX(' + (dragX + this.menuWidth) + 'px)';
        this.$refs.swipeMenu.style.color="red";
      } else {
        // Dragging left, show the swipe menu
        this.$refs.swipeMenu.style.transform = 'translateX(' + (dragX - this.maxDragX) + 'px)';
        this.$refs.swipeMenu.style.color="white";
      }
      
      // Update the last X position for the next touchmove event
      this.lastX = this.currentX;
    },
    handleTouchEnd(e) {
      var endX = e.changedTouches[0].clientX;
  
      // Calculate the distance dragged
      var dragX = endX + this.startX;
  
      if (dragX < 0) {
        // Swipe right, hide the swipe menu
        this.$refs.swipeMenu.style.transform = 'translateX(-100%)';
        this.$refs.swipeMenu.style.transitionDuration = '0.3s';
        this.$refs.swipeMenu.style.color="black"
        this.showMenu = false;
      } else {
        // Swipe left, show the swipe menu
        this.$refs.swipeMenu.style.transform = 'translateX(0%)';
        this.$refs.swipeMenu.style.transitionDuration = '0.3s';
        this.$refs.swipeMenu.style.color="green"
        this.showMenu = true;
      }
    }
  },
};
</script>
<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="showMenu" class="app-menu_overlay"></div>
    </Transition>
    <div
      class="app-menu"
      :class="[{ active: showMenu }, $attrs['class']]"
      ref="swipeMenu"
    ></div>
  </Teleport>
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
}
.app-menu {
  position: fixed;
  top: 0;
  left: 0;
  width: 80%;
  height: 100%;
  background-color: white;
  transition: transform 0.3s ease-in-out;
  z-index: 99; /* Make sure the menu is on top of other elements */
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.5); /* Add a drop shadow to the menu */
  transform: translateX(-100%);
  &.active {
    transform: translateX(0);
  }
}
</style>
