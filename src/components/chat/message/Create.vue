<script>
import { useChatStore } from "@/stores/useChat.js";
export default {
  props: ["chatID"],
  data() {
    return {
      message: "",
    };
  },
  setup() {
    const chatStore = useChatStore();
    return { chatStore };
  },
  methods: {
    sendMessage() {
      if (this.message.length >= 1) {
        this.chatStore.createMeassage(this.chatID, this.message);
        this.message = "";
      }
    },
  },
};
</script>
<template>
  <div class="chat-add-message">
    <button class="btn btn-primary btn-sm only-icon" @click="sendMessage">
      <Icon name="paper-plane" />
    </button>
    <textarea class="chat-message_field" v-model="message"></textarea>
  </div>
</template>
<style lang="scss">
.chat-add-message {
  display: flex;
  flex: 1;
  align-items: end;
  .chat-message_field {
    height: 34px;
    min-height: auto;
    padding: 8px;
    box-shadow: none;
    margin-right: 10px;
  }
}
</style>
