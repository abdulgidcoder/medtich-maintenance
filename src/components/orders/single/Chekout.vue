<script>
import { useOrdersStore } from "@/stores/useOrders.js";
import { useAlert } from "@/stores/useAlert";
export default {
  props: {
    order: Object,
  },
  data() {
    return {
      checkoutModal: false,
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
        .checkout(this.order.id)
        .then(() => {
          this.checkouting = false;
          this.checkoutModal = false;
        })
        .catch(() => {
          this.checkouting = false;
          this.checkoutModal = false;
          this.errorStore.masg = "لم يتم الدفع";
          this.errorStore.style = "danger";
          this.errorStore.show = true;
        });
    },
  },
};
</script>

<template>
  <template v-if="this.$auth.role == 'customer' && !order.acf?.set_paid">
    <button
      @click="this.checkoutModal = true"
      style="margin-left: 15px"
      class="btn btn-primary"
    >
      إدفع
    </button>
    <Modal
      class="bottom modal-chechout-order"
      :show="checkoutModal"
      animation="fadeUp"
      @closeModal="this.checkoutModal = false"
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
          <template v-else>
            <span
              class="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
            إرسال...
          </template>
        </button>
        <button
          class="btn btn-sm"
          type="button"
          @click="this.checkoutModal = false"
        >
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
