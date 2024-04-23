<script>
import { useAlert } from "@/stores/useAlert";
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
  setup() {
    const alertStore = useAlert();
    return { alertStore };
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
  methods: {
    dismiss() {
      this.alertStore.show = false;
    }
  }
};
</script>
<template>
  <div class="app-alert-container">
    <Transition name="fadeUp">
      <div v-if="show" class="app-alert" :class="{
        warning: mode == 'warning',
        info: mode == 'info',
        success: mode == 'success',
        danger: mode == 'danger',
      }">
        <button class="app-alert_dismiss" type="button" @click="dismiss">
          <Icon name="times" />
        </button>
        <div class="app-alert_wrapper">
          <icon :name="this.mode == 'success'
            ? 'check-circle'
            : this.mode == 'warning'
              ? 'exclamation-circle'
              : this.mode == 'danger'
                ? 'exclamation-triangle'
                : this.mode == 'info'
                  ? 'password'
                  : null
            " />
          {{ msg }}
        </div>
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
  position: relative;
  width: 95vw;
  background: var(--white) !important;
  padding: 10px;
  text-align: center;
  font-size: 0.875rem;
  box-shadow: 0 0px 6px #8f8686;
  border-radius: 6px;

  &_wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    padding-right: 18px;

    >.app-icon {
      margin-left: 5px;

      svg {
        width: 15px;
      }
    }
  }

  &_dismiss {
    background: none;
    border: none;
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);

    .app-icon {
      color: #000;
      width: 11px;
    }
  }

  &.success {
    color: var(--success);

    a,
    mark {
      color: var(--success-shade);
    }
  }

  &.warning {
    color: var(--warning);

    a,
    mark {
      color: var(--warning-shade);
    }
  }

  &.info {
    color: var(--info);
  }

  &.danger {
    color: var(--danger);

    a,
    mark {
      color: var(--danger-shade);
    }
  }
}
</style>
