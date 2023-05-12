<script>
import PullToRefresh from "pulltorefreshjs";
import Offline from "./Offline.vue";
export default {
  props: {
    isBoxed: Boolean,
    pullToRefresh: Boolean,
    bottomBar: Boolean,
    disableOffline: Boolean,
  },
  mounted() {
    if (this.$refs.appContent.classList.contains("app-content-pull")) {
      let onRefresh = () => {
        this.onRefresh();
      };
      PullToRefresh.init({
        iconArrow:
          '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M500 8h-27.711c-6.739 0-12.157 5.548-11.997 12.286l2.347 98.568C418.075 51.834 341.788 7.73 255.207 8.001 118.82 8.428 7.787 120.009 8 256.396 8.214 393.181 119.165 504 256 504c63.926 0 122.202-24.187 166.178-63.908 5.113-4.618 5.354-12.561.482-17.433l-19.738-19.738c-4.498-4.498-11.753-4.785-16.501-.552C351.787 433.246 306.105 452 256 452c-108.322 0-196-87.662-196-196 0-108.322 87.662-196 196-196 79.545 0 147.941 47.282 178.675 115.302l-126.389-3.009c-6.737-.16-12.286 5.257-12.286 11.997V212c0 6.627 5.373 12 12 12h192c6.627 0 12-5.373 12-12V20c0-6.627-5.373-12-12-12z"/></svg>',
        iconRefreshing:
          '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M500 8h-27.711c-6.739 0-12.157 5.548-11.997 12.286l2.347 98.568C418.075 51.834 341.788 7.73 255.207 8.001 118.82 8.428 7.787 120.009 8 256.396 8.214 393.181 119.165 504 256 504c63.926 0 122.202-24.187 166.178-63.908 5.113-4.618 5.354-12.561.482-17.433l-19.738-19.738c-4.498-4.498-11.753-4.785-16.501-.552C351.787 433.246 306.105 452 256 452c-108.322 0-196-87.662-196-196 0-108.322 87.662-196 196-196 79.545 0 147.941 47.282 178.675 115.302l-126.389-3.009c-6.737-.16-12.286 5.257-12.286 11.997V212c0 6.627 5.373 12 12 12h192c6.627 0 12-5.373 12-12V20c0-6.627-5.373-12-12-12z"/></svg>',
        mainElement: ".app-pull-refresh",
        triggerElement: ".app-pull-refresh",
        instructionsPullToRefresh: " ",
        instructionsReleaseToRefresh: " ",
        instructionsRefreshing: " ",
        distReload: 60,
        onRefresh(done) {
          setTimeout(() => {
            done(); // end pull to refresh
            onRefresh();
          }, 1000);
        },
      });
    }
  },
  beforeUnmount() {
    if (this.$refs.appContent.classList.contains("app-content-pull")) {
      PullToRefresh.destroyAll();
    }
  },
  methods: {
    onRefresh() {
      this.$emit("onRefresh");
    },
    onScrollContent(event) {
      this.$emit("onScroll", event.target);
    },
  },
  components: { Offline },
};
</script>
<template>
  <div
    ref="appContent"
    class="app-content"
    :class="{
      boxed: isBoxed,
      'app-content-pull': pullToRefresh,
      'bottom-bar': bottomBar,
    }"
  >
  <div
  class="app-content-container"
  :class="{ 'app-content-container': isBoxed }"
  @scroll="onScrollContent($event)"
    >
      <div class="app-pull-refresh" v-if="pullToRefresh">
        <slot @click.stop></slot>
      </div>
      <slot v-else></slot>
    </div>
    <Offline v-if="!disableOffline" :reconnect="onRefresh" />
  </div>
</template>
<style lang="scss">
.app-content {
  position: relative;
  z-index: 1;
  width: 100%;
  height: 100vh;
  padding: 70px 15px 15px;
  overflow: hidden;
  background-color: var(--bg-white);
  &-container {
    position: relative;
    height: 100%;
    overflow: hidden;
    overflow-y: scroll;
  }
  &.boxed {
    .app-content-container {
      margin: 0 -15px -15px;
      padding: 20px 15px;
      background: var(--bg-white);
      min-height: 100%;
      border-radius: 25px 25px 0 0;
    }
  }
  &.bottom-bar {
    .app-content-container {
      padding-bottom: 72px !important;
    }
  }
  &.boxed {
    background-color: var(--primary);
    padding-bottom: 0;
  }
}

.app-fixed-bottom {
  position: fixed;
  padding: 10px 15px 15px;
  background-color: var(--bg-white);
  right: 0;
  bottom: 0;
  left: 0;
  width: 100vw;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 -2px 6px var(--grey);
  &:empty {
    display: none;
  }
}

.ptr--ptr {
  box-shadow: none !important;
  align-items: flex-start !important;
  .ptr--box {
    padding-top: 5px;
    padding-bottom: 0;
  }
  .ptr--icon {
    box-shadow: 0 0 4px #c5c4c4;
    width: 33px;
    height: 33px;
    background-color: var(--bg-white);
    border-radius: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    svg {
      width: 18px;
      fill: var(--primary);
    }
  }
  &.ptr--refresh {
    .ptr--icon {
      svg {
        animation: rotate-animation 0.6s infinite linear;
      }
    }
  }
}
</style>
