<script>
export default {
  props: {
    reconnect: Function,
  },
  data() {
    return {
      adding: false,
    };
  },
  methods: {
    reconnectIntenet() {
      this.reconnect();
      this.adding = true;
      setTimeout(() => {
        this.adding = false;
      }, 1000);
    },
  },
};
</script>
<template>
  <Transition name="fade">
    <div class="app-offline" v-if="!this.$auth.connection">
      <div class="app-offline_container">
        <Icon name="wifi-slash" />
        <h2>لا يوجد اتصال بالإنترنت</h2>
        <button class="btn btn-primary btn-sm" @click="reconnectIntenet">
          <template v-if="!adding"
            ><Icon name="reload" />إعادة تحميل الصفحة</template
          >
          <template v-else>
            <span
              class="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
            إعادة تحميل...
          </template>
        </button>
      </div>
    </div>
  </Transition>
</template>

<style lang="scss">
.app-offline {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 70px 0 0 0;
  background: var(--bg-grey);
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  z-index: 9999;
  .app-icon.wifi-slash {
    width: 100px;
    color: var(--primary);
    margin-bottom: 20px;
  }
  h2 {
    margin-bottom: 30px;
  }
}
</style>
