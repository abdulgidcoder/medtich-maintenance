<script>
import Icon from "./Icon.vue";
export default {
  components: { Icon },
  props: {
    mode: {
      type: String,
      required: true,
    },
    msg: {
      type: String,
      required: true,
    },
    show: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      color:
        this.mode == "success"
          ? "var(--success)"
          : this.mode == "warning"
          ? "var(--warning)"
          : this.mode == "danger"
          ? "var(--danger)"
          : this.mode == "info"
          ? "var(--info)"
          : null,
    };
  },
};
</script>
<template>
  <div class="app-alert-container">
    <Transition name="fadeUp">
      <div
        v-if="show"
        class="app-alert"
        :class="{
          warning: mode == 'warning',
          info: mode == 'info',
          success: mode == 'success',
          danger: mode == 'danger',
        }"
      >
        <icon
          :name="
            this.mode == 'success'
              ? 'check-circle'
              : this.mode == 'warning'
              ? 'exclamation-circle'
              : this.mode == 'danger'
              ? 'exclamation-triangle'
              : this.mode == 'info'
              ? 'password'
              : null
          "
        />
        {{ msg }}
      </div>
    </Transition>
  </div>
</template>

<style lang="scss">
.app-alert-container {
  position: fixed;
  bottom: 35px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 999;
}
.app-alert {
  width: 95vw;
  // max-width: 320px;
  background: var(--white) !important;
  padding: 10px;
  text-align: center;
  font-size: 0.875rem;
  box-shadow: 0 0px 6px #8f8686;
  border-radius: 6px;
  &.success {
    color: var(--success);
    svg {
      fill: var(--success);
    }
    a,
    mark {
      color: var(--success-shade);
    }
  }
  &.warning {
    color: var(--warning);
    svg {
      fill: var(--warning);
    }
    a,
    mark {
      color: var(--warning-shade);
    }
  }
  &.info {
    color: var(--info);
    svg {
      fill: var(--info);
    }
  }
  &.danger {
    color: var(--danger);
    svg {
      fill: var(--danger);
    }
    a,
    mark {
      color: var(--danger-shade);
    }
  }
  .app-icon {
    margin-left: 5px;
    svg {
      width: 15px;
    }
  }
}
</style>
