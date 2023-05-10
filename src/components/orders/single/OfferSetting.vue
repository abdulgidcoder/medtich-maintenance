<script>
import { useOrdersStore } from "@/stores/useOrders.js";
import { useChatStore } from "@/stores/useChat.js";
import { useAlert } from "@/stores/useAlert";
import Spinner from "../../Spinner.vue";
export default {
  components: { Spinner },
  inheritAttrs: false,
  props: { offer: Object, order: Object },
  data() {
    return {
      acceptOfferData: {},
      Modal: false,
      acceptModal: false,
      chatModal: false,
      loading: false,
      stateOrder: "processing",
    };
  },
  setup() {
    const alertStore = useAlert();
    const ordersStore = useOrdersStore();
    const chatStore = useChatStore();
    return { alertStore, ordersStore, chatStore };
  },
  methods: {
    accept(offer) {
      this.loading = true;
      this.ordersStore
        .acceptOffer(offer.technical.ID, this.order.id, this.stateOrder)
        .then(() => {
          this.loading = false;
          this.acceptModal = false;
        })
        .catch(() => {
          this.loading = false;
          this.acceptModal = false;
        });
    },
    openNewChat(offer) {
      this.loading = true;
      this.chatModal = true;
      this.chatStore
        .openChat(this.offer.technical.ID, this.order)
        .then(() => {
          this.loading = false;
          this.chatModal = false;
        })
        .catch(() => {
          this.loading = false;
          this.chatModal = false;
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
        <li @click="openNewChat()">
          <Icon name="comment-plus" /> فتح دردشه مع الفنى
        </li>
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
      <template v-if="!loading">قبول</template>
      <template v-else> <Spinner class="spinner-border-sm" />قبول...</template>
    </button>
    <button class="btn btn-sm btn-secondary" @click="this.acceptModal = false">
      الغاء
    </button>
  </Modal>

  <Modal class="modal-loader" :show="chatModal" animation="fadeIn">
    <Spinner class="spinner-border-lg" />
  </Modal>
</template>
