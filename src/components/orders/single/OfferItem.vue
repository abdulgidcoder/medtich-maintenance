<script>
import { useOrdersStore } from "@/stores/useOrders.js";
import { useAlert } from "@/stores/useAlert";
export default {
  props: {
    offer: {},
    acceptTech: "",
    order: Object,
  },
  data() {
    return {
      accepted: this.offer.technical["ID"] == this.acceptTech,
      acceptModal: false,
      acceptOfferData: {},
      accepting: false,
      stateOrder: "processing",
    };
  },
  watch: {
    acceptTech() {
      this.accepted = this.offer.technical["ID"] == this.acceptTech;
    },
  },
  setup() {
    const ordersStore = useOrdersStore();
    const errorStore = useAlert();
    return { ordersStore, errorStore };
  },
  methods: {
    acceptOffer(offer) {
      this.accepting = true;
      this.ordersStore
        .acceptOffer(offer.technical.ID, this.order.id, this.stateOrder)
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
  <li :class="{ accepted: accepted }">
    <div class="offer_top">
      <div class="offer_right">
        <div class="app-avatar" v-html="offer.technical.user_avatar"></div>
        <div class="offer-info">
          <h4>{{ offer.technical.display_name }}</h4>
          <div class="offer-meta">
            <span class="offer-date">{{ $dateTime(offer.date) }}</span
            ><strong class="offer-price">{{ offer.price + " جنية" }}</strong>
          </div>
        </div>
      </div>
      <div class="offer_left">
        <button
          class="btn btn-primary btn-sm"
          v-if="
            this.$auth.role == 'customer' &&
            !acceptTech &&
            order.acf?.payment_confirm
          "
          @click="
            () => {
              this.acceptModal = true;
              this.acceptOfferData = offer;
            }
          "
        >
          قبول
        </button>
        <span class="app-badge completed" v-if="accepted">تم قبول العرض</span>
      </div>
    </div>
    <div class="offer_bottom">
      <p class="offer-details">{{ offer.details }}</p>
    </div>
  </li>
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
    <button
      class="btn btn-sm btn-primary"
      @click="acceptOffer(acceptOfferData)"
    >
      <template v-if="!accepting">قبول</template>
      <template v-else>
        <span
          class="spinner-border spinner-border-sm"
          role="status"
          aria-hidden="true"
        ></span>
        قبول...
      </template>
    </button>
    <button
      class="btn btn-sm btn-secondary"
      @click="() => (this.acceptModal = false)"
    >
      الغاء
    </button>
  </Modal>
</template>
