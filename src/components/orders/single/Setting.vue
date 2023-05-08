<script>
import { useOrdersStore } from "@/stores/useOrders.js";
import { useAlert } from "@/stores/useAlert";
export default {
  props: ["details", "loaded"],
  data() {
    return {
      orderData: this.details,
      Modal: false,
      send: false,
      statuses: [
        { label: "قيد الانتظار", value: "pending" },
        { label: "إلغاء", value: "cancelled" },
      ],
      status: "",
    };
  },
  setup() {
    const ordersStore = useOrdersStore();
    const errorStore = useAlert();
    return { ordersStore, errorStore };
  },
  watch: {
    loaded(newval) {
      if (!newval) {
        this.setStatuses();
      }
    },
    details() {
      this.setStatuses();
    },
  },
  created() {
    this.setStatuses();
    setTimeout(() => {
      this.status = this.details.acf?.status;
    }, 200);
  },
  methods: {
    async handleSubmit() {
      this.send = true;
      this.ordersStore
        .changeSetting(this.details.id, this.status)
        .then(() => {
          this.send = false;
          this.Modal = false;
        })
        .catch(() => {
          this.send = false;
          this.Modal = false;
        });
    },
    setStatuses() {
      if (
        this.details.acf?.status == "active" ||
        this.details.acf?.status == "pending"
      ) {
        this.statuses = [
          { label: "تلقى العروض", value: "active" },
          { label: "قيد الانتظار", value: "pending" },
          { label: "إلغاء", value: "cancelled" },
        ];
      }
      if (
        (this.details.acf?.status == "processing" ||
          this.details.acf?.status == "cancelled" ||
          this.details.acf?.status == "pending") &&
        this.details.acf?.payment_confirm
      ) {
        this.statuses = [
          { label: "قيد التنفيذ", value: "processing" },
          { label: "قيد الانتظار", value: "pending" },
          { label: "إلغاء", value: "cancelled" },
        ];
      }
      if (
        this.details.acf?.status == "processing" &&
        this.details.acf?.payment_confirm &&
        this.details.acf?.report.date
      ) {
        this.statuses = [
          { label: "قيد التنفيذ", value: "processing" },
          { label: "اكتمل", value: "completed" },
        ];
      }
    },
  },
};
</script>
<template>
  <template
    v-if="
      this.$auth.role == 'customer' && this.details.acf?.status != 'completed'
    "
  >
    <Skeleton v-if="loaded" width="34px" height="34px" />
    <button
      v-else
      @click="this.Modal = true"
      class="btn btn-black only-icon btn-sm"
    >
      <Icon name="ellipsis-v" />
    </button>
    <Modal
      class="bottom modal-chechin-order"
      :show="Modal"
      animation="fadeUp"
      @closeModal="this.Modal = false"
    >
      <h2 class="text-center">الاعدادت</h2>

      <Radio
        label="حالة الطلب"
        name="status"
        v-model="status"
        :data="statuses"
        class="list"
        id="order-status-list"
      />
      <div class="form-actions">
        <button
          class="btn btn-primary btn-sm"
          type="submit"
          :disabled="send"
          @click="handleSubmit"
        >
          <template v-if="!send">تغير</template>
          <template v-else>
            <span
              class="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
            تغير...
          </template>
        </button>
        <button class="btn btn-sm" type="button" @click="this.Modal = false">
          إلغاء
        </button>
      </div>
    </Modal>
  </template>
</template>
<style lang="scss">
#order-status-list {
  .app-radio {
    padding: 10px 40px 10px 10px;
    background-color: var(--bg-grey);
    border-radius: 5px;
    font-weight: 600;
    .checkmark {
      right: 10px;
    }
  }
}
</style>
