<script>
import { useOrdersStore } from "@/stores/useOrders.js";
import { useAlert } from "@/stores/useAlert";

export default {
  props: {
    order: Object,
  },
  data() {
    return {
      Modal: false,
      send: false,
      date: new Date().toLocaleString(),
    };
  },
  setup() {
    const ordersStore = useOrdersStore();
    const errorStore = useAlert();
    return { ordersStore, errorStore };
  },
  methods: {
    async confirm() {
      this.send = true;
      this.ordersStore
        .confirmTechArrived(this.order.id, this.date)
        .then(() => {
          this.send = false;
          this.Modal = false;
        })
        .catch(() => {
          this.send = false;
          this.Modal = false;
        });
    },
  },
};
</script>

<template>
  <template
    v-if="
      order.acf['status'] == 'processing' &&
      this.$auth.role == 'customer' &&
      !order.acf?.confirm_arrived &&
      order.acf?.technician_arrived.date
    "
  >
    <button @click="this.Modal = true" class="btn btn-primary">
      تاكيد الوصول
    </button>
    <Modal
      class="bottom modal-chechin-order"
      :show="Modal"
      animation="fadeUp"
      @closeModal="this.Modal = false"
    >
      <h2>تاكيد وصول الفنى</h2>
      <div class="form-actions">
        <button
          class="btn btn-primary btn-sm"
          type="submit"
          :disabled="send"
          @click="confirm"
        >
          <template v-if="!send">تاكيد</template>
          <template v-else><Spinner />تاكيد...</template>
        </button>
        <button class="btn btn-sm" type="button" @click="this.Modal = false">
          إلغاء
        </button>
      </div>
    </Modal>
  </template>
</template>

<style lang="scss" scoped>
.modal-chechin-order {
  h2 {
    text-align: center;
    margin-bottom: 25px;
  }
  .btn-close {
    margin-top: 55px;
  }
}
</style>
