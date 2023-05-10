<script>
import { useOrdersStore } from "@/stores/useOrders.js";
import { useAlert } from "@/stores/useAlert";
export default {
  props: {
    order: Object,
  },
  data() {
    return {
      date: new Date().toLocaleString(),
      Modal: false,
      checkouting: false,
    };
  },
  setup() {
    const ordersStore = useOrdersStore();
    const errorStore = useAlert();
    return { ordersStore, errorStore };
  },
  methods: {
    checkoutOrder() {
      this.checkouting = true;
      this.ordersStore
        .checkout(this.order.id, this.date)
        .then(() => {
          this.checkouting = false;
          this.Modal = false;
        })
        .catch(() => {
          this.checkouting = false;
          this.Modal = false;
        });
    },
  },
};
</script>

<template>
  <template v-if="this.$auth.role == 'customer' && !order.acf?.set_paid">
    <button
      @click="this.Modal = true"
      style="margin-left: 15px"
      class="btn btn-primary"
    >
      إدفع
    </button>
    <Modal
      class="bottom modal-chechout-order"
      :show="Modal"
      animation="fadeUp"
      @closeModal="this.Modal = false"
    >
      <h2>الدفع</h2>
      <p>
        بعد عملية الدفع قم بالضغط على تم الدفع حتى يتم التاكد من قبل الادارة
      </p>
      <p><b>وسيلة الدفع: </b> {{ order.acf.payment_gateway.label }}</p>
      <p>
        <b>{{ "رقم " + order.acf.payment_gateway.label }} : </b>
        <template v-if="order.acf.payment_gateway.value == 'voda_cache'"
          >010123456789</template
        >
        <template v-if="order.acf.payment_gateway.value == 'bank_transfer'"
          >1001215151515</template
        >
      </p>
      <div class="form-actions">
        <button
          class="btn btn-primary btn-sm"
          type="submit"
          :disabled="checkouting"
          @click="checkoutOrder"
        >
          <template v-if="!checkouting">تم الدفع</template>
          <template v-else> <Spinner class="spinner-border-sm" />إرسال...</template>
        </button>
        <button class="btn btn-sm" type="button" @click="this.Modal = false">
          إلغاء
        </button>
      </div>
    </Modal>
  </template>
</template>

<style lang="scss" scoped>
.modal-chechout-order {
  h2 {
    text-align: center;
    margin-bottom: 25px;
  }
  .btn-close {
    margin-top: 55px;
  }
}
</style>
