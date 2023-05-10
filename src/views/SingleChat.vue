<script>
import { useChatStore } from "@/stores/useChat.js";
export default {
  data() {
    return {
      chatID: this.$route.params.id,
      chatData: {},
      messages: [],
      loader: true,
      polling: null,
    };
  },
  setup() {
    const chatStore = useChatStore();
    return { chatStore };
  },
  created() {
    document.title = "Chat";
    if (this.chatStore.list) {
      this.loader = false;
      this.chatStore.list.find((item) => {
        if (item.id == this.chatID) {
          this.chatData = item;
        }
      });
    } else {
      this.fetchChat();
    }
    this.fetchMessage();
  },
  beforeUnmount() {
    clearInterval(this.polling);
  },
  methods: {
    fetchChat() {
      this.loader = true;
      this.chatStore.getChat(this.chatID).then(() => {
        this.chatData = this.chatStore.singleChat;
        this.loader = false;
      });
    },
    pollingChat() {
      this.polling = setInterval(() => {
        this.fetchMessage();
      }, this.$pollTimer);
    },
    async fetchMessage() {
      const respons = await this.chatStore.getMessages(this.chatID);
      this.messages = respons.data;
    },
  },
};
</script>
<template>
  <Page class="app-chat-page">
    <Head class="head-chat">
      <template #left>
        <button
          @click="this.$router.push('/home/chats')"
          class="app-btn-back"
          type="button"
        >
          <Icon name="arrow-left" />
        </button>
        <div
          class="app-avatar"
          v-html="chatData.acf?.technician.user_avatar"
        ></div>
        <h4 class="chat-username">
          {{ chatData.acf?.technician.display_name }}
        </h4>
      </template>
    </Head>
    <Content isBoxed pullToRefresh>
      <h4 class="chat-order-title text-center">
        {{ chatData.title?.rendered }}
      </h4>
      <ul>
        <li v-for="message in messages" :key="message.id">
          {{ message.content.rendered }}
        </li>
      </ul>
    </Content>
  </Page>
</template>
<style lang="scss">
.head-chat {
  &.app-header_left {
    display: flex;
    align-items: center;
  }
  .app-avatar {
    width: 35px;
    height: 35px;
  }
  .app-avatar,
  .chat-username {
    margin-right: 15px;
    margin-bottom: 0;
  }
}
</style>
