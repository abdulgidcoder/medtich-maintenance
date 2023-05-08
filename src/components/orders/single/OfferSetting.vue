<script>
import { useOrdersStore } from "@/stores/useOrders.js";
import { useAlert } from "@/stores/useAlert";
export default {
  inheritAttrs: false,
  props: { offer: Object, orderID: Number },
  data() {
    return {
      acceptOfferData: {},
      Modal: false,
      acceptModal: false,
      accepting: false,
      stateOrder: "processing",
    };
  },
  setup() {
    const ordersStore = useOrdersStore();
    const errorStore = useAlert();
    return { ordersStore, errorStore };
  },
  methods: {
    accept(offer) {
      this.accepting = true;
      this.ordersStore
        .acceptOffer(offer.technical.ID, this.orderID, this.stateOrder)
        .then(() => {
          this.accepting = false;
          this.acceptModal = false;
        })
        .catch(() => {
          this.accepting = false;
          this.acceptModal = false;
        });
    },
  },
};
</script>
<template>
  <div class="app-dropdown">
    <button @click="this.Modal = true" class="app-dropdown-toggle">
      <icon name="ellipsis-v" />
    </button>
    <Modal
      class="bottom"
      :show="Modal"
      animation="fadeUp"
      @closeModal="this.Modal = false"
    >
      <ul
        class="app-list-icon"
        @click="
          () => {
            this.Modal = false;
          }
        "
      >
        <li
          @click="
            () => {
              this.acceptModal = true;
              this.acceptOfferData = offer;
            }
          "
        >
          <Icon name="check-circle-alt" /> قبول عرض الفنى
        </li>
        <li><Icon name="comment-plus" /> فتح دردشه مع الفنى</li>
      </ul>
    </Modal>
  </div>
  <Modal
    class="center"
    :show="acceptModal"
    animation="fadeIn"
    @closeModal="this.acceptModal = false"
  >
    <h3>
      {{ "هل تريد قبول عرض " + acceptOfferData.technical.display_name + " ؟" }}
    </h3>
    <p><strong>قيم العرض: </strong>{{ acceptOfferData.price + " جنية" }}</p>
    <button class="btn btn-sm btn-primary" @click="accept(acceptOfferData)">
      <template v-if="!accepting">قبول</template>
      <template v-else><Spinner />قبول...</template>
    </button>
    <button class="btn btn-sm btn-secondary" @click="this.acceptModal = false">
      الغاء
    </button>
  </Modal>
</template>
