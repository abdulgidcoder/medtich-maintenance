<script>
import { useChatStore } from "@/stores/useChat.js";
import AcceptOffer from "../AcceptOffer.vue";
export default {
  inheritAttrs: false,
  props: { offer: Object, order: Object },
  components: { AcceptOffer },
  data() {
    return {
      isOpenedModal: false,
      isChatModal: false,
      loading: false,
      uploadig: false,
    };
  },
  setup() {
    const chatStore = useChatStore();
    return { chatStore };
  },
  methods: {
    dismissModal() {
      this.isOpenedModal = false;
    },
    openNewChat(offer) {
      this.dismissModal();
      this.loading = true;
      this.isChatModal = true;
      this.chatStore
        .openChat(this.offer.technical.ID, this.order)
        .then(() => {
          this.loading = false;
          this.isChatModal = false;
        })
        .catch(() => {
          this.loading = false;
          this.isChatModal = false;
        });
    },
  },
};
</script>

<template>
  <div class="app-dropdown">
    <button @click="this.isOpenedModal = true" class="app-dropdown-toggle">
      <icon name="ellipsis-v" />
    </button>
    <Modal
      class="bottom"
      :show="isOpenedModal"
      animation="fadeUp"
      @dismiss="dismissModal"
    >
      <ul class="app-list-icon">
        <AcceptOffer :order="order" :offer="offer" @onDismiss="dismissModal" />
        <li @click="openNewChat()">
          <Icon name="comment-plus" /> فتح دردشه مع المتخصص
        </li>
      </ul>
    </Modal>
  </div>
  <Modal class="modal-loader" :show="isChatModal" animation="fadeIn">
    <Spinner class="spinner-border-lg" />
  </Modal>
</template>
