<script>
import { useOrdersStore } from "@/stores/useOrders.js";
import { useAlert } from "@/stores/useAlert";
export default {
  props: {
    orderID: Number,
  },
  data() {
    return {
      modal: false,
      offer: {
        date: new Date().toUTCString(),
        technical: this.$auth.user_data.id,
        price: "",
        details: "",
      },
      adding: false,
    };
  },
  setup() {
    const ordersStore = useOrdersStore();
    const alertStore = useAlert();

    return { ordersStore, alertStore };
  },
  methods: {
    handelSubmit(order, ele) {
      if (this.offer.price >= 2) {
        if (this.offer.details.length >= 5) {
          this.adding = true;
          this.ordersStore.addOffer(this.offer, this.orderID).then(() => {
            this.adding = true;
            (this.modal = false), (this.alertStore.show = false);
          });
        } else {
          this.alertStore.style = "danger";
          this.alertStore.show = true;
          this.alertStore.masg = "اكتب تفاصيل العرض";
        }
      } else {
        this.alertStore.style = "danger";
        this.alertStore.show = true;
        this.alertStore.masg = "اكتب قيمة العرض";
      }
    },
  },
};
</script>
<template>
  <div>
    <button class="btn btn-primary btn-sm" @click="this.modal = true">
      <Icon name="tag" />اضف عرض
    </button>
    <Modal
      class="bottom add-offer-modal"
      :show="modal"
      animation="fadeUp"
      @dismiss="this.modal = false"
    >
      <h2>اضف عرضك</h2>
      <form @submit.prevent="handelSubmit">
        <Field
          v-model="offer.price"
          type="number"
          label="قيمة العرض"
          :length="1"
          append="جنية"
        />
        <Field
          v-model="offer.details"
          type="textarea"
          label="تفاصيل العرض"
          :length="5"
        />
        <div class="form-actions">
          <button
            class="btn btn-primary btn-sm"
            type="submit"
            :disabled="adding"
          >
            <template v-if="!adding">إضافة العرض</template>
            <template v-else>
              <Spinner class="spinner-sm" />
              إضافة...
            </template>
          </button>
          <button
            class="btn btn-sm"
            type="button"
            @click="this.modal = false"
          >
            إالغاء
          </button>
        </div>
      </form>
    </Modal>
  </div>
</template>
<style scoped lang="scss">
.add-offer-modal {
  h2 {
    text-align: center;
    color: var(--primary);
    margin-bottom: 15px;
  }
}
</style>
