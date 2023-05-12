<script>
import { useChatStore } from "@/stores/useChat.js";
export default {
  props: ["chatID"],
  data() {
    return {
      message: "",
      loading: false,
    };
  },
  setup() {
    const chatStore = useChatStore();
    return { chatStore };
  },
  methods: {
    sendMessage() {
      if (this.message.length >= 1) {
        this.$refs.field.select();
        this.loading = true;
        this.chatStore.createMeassage(this.chatID, this.message).then(() => {
          this.$emit("onSend", this.message);
        });
        setTimeout(() => {
          this.message = "";
          this.loading = false;
        }, 800);
      }
    },
  },
};
</script>
<template>
  <div class="chat-add-message">
    <form @submit.prevent="sendMessage">
      <button class="btn btn-primary btn-sm only-icon">
        <Spinner class="spinner-sm" v-if="loading" />
        <Icon name="paper-plane" v-else />
      </button>
      <textarea
        class="chat-message_field"
        v-model="message"
        ref="field"
      ></textarea>
    </form>
  </div>
</template>
<style lang="scss">
.chat-add-message {
  padding: 15px;
  background: var(--bg-white);
  form {
    display: flex;
    align-items: end;
  }
  .chat-message_field {
    height: 34px;
    min-height: auto;
    padding: 8px;
    box-shadow: none;
    margin-right: 10px;
    -webkit-appearance: none;
    resize: none;
    &::selection {
      background: transparent;
    }
  }
}
</style>
