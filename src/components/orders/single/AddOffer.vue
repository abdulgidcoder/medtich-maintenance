<script>
import { useOrdersStore } from "@/stores/useOrders.js";
export default {
  props: {
    orderID: Number,
  },
  data() {
    return {
      hasFeedback: false,
      feedbackStyle: "",
      feedback: "",
      addOfferModal: false,
      offer: {
        date: new Date().toISOString(),
        technical: this.$auth.user_data.id,
        price: "",
        details: "",
      },
      adding: false,
    };
  },
  setup() {
    const ordersStore = useOrdersStore();
    return { ordersStore };
  },
  methods: { 
    handelSubmit(order, ele) {
      if (this.offer.price >= 2) {
        if (this.offer.details.length >= 5) {
          this.adding = true;
          this.ordersStore.addOffer(this.offer, this.orderID).then(() => {
            this.adding = true;
            (this.addOfferModal = false), (this.hasFeedback = false);
          });
        } else {
          this.feedbackStyle = "danger";
          this.hasFeedback = true;
          this.feedback = "اكتب تفاصيل العرض";
        }
      } else {
        this.feedbackStyle = "danger";
        this.hasFeedback = true;
        this.feedback = "اكتب قيمة العرض";
      }
    },
  },
};
</script>
<template>
  <button
    class="btn btn-primary"
    style="margin-left: 15px"
    @click="this.addOfferModal = true"
  >
    <Icon name="tag" />اضف عرض
  </button>
  <Modal
    class="bottom add-offer-modal"
    :show="addOfferModal"
    animation="fadeUp"
    @closeModal="this.addOfferModal = false"
  >
    <h2>اضف عرضك</h2> 
    <form @submit.prevent="handelSubmit">
      <Field
        v-model="offer.price"
        type="number"
        label="قيمة العرض (جنية)"
        :length="1"
      />
      <Field
        v-model="offer.details"
        type="textarea"
        label="تفاصيل العرض"
        :length="5"
      />
      <div class="form-actions">
        <button class="btn btn-primary" type="submit" :disabled="adding">
          <template v-if="!adding">إرسال</template>
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
          class="btn"
          type="button"
          @click=" this.addOfferModal = false;"
        >
          إالغاء
        </button>
      </div>
    </form>
  </Modal>
  <Teleport to="body">
    <Alert :show="hasFeedback" :mode="feedbackStyle" :msg="feedback" />
  </Teleport>
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
