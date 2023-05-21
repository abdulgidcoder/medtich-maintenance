<script>
import { useChatStore } from "@/stores/useChat.js";
import HeadPage from "@/layouts/chat/Single/HeadPage.vue";
import CreateMessage from "@/layouts/chat/message/Create.vue";
import List from "@/layouts/chat/message/List.vue";

export default {
  components: { HeadPage, CreateMessage, List },
  data() {
    return {
      chatID: this.$route.params.id,
      chatData: {},
      loading: true,
      polling: null,
      per_page: 12,
    };
  },
  setup() {
    const chatStore = useChatStore();
    return { chatStore };
  },
  async mounted() {
    document.title = "Chat";
    if (this.$searchInStore(this.chatStore.list, this.chatID)) {
      this.loading = false;
      this.chatData = this.$searchInStore(this.chatStore.list, this.chatID);
    } else {
      this.fetchChat();
    }
    await this.chatStore.seenMessage(this.chatID);
  },
  async beforeUnmount() {
    await this.chatStore.seenMessage(this.chatID);
  },
  methods: {
    fetchChat() {
      this.loading = true;
      this.chatStore.getChat(this.chatID).then(() => {
        this.chatData = this.chatStore.singleChat;
        this.loading = false;
      });
    },
    updateMessages(message) {
      let total = Number(this.$refs.listMeassages.total);
      total += 1;
    },
  },
};
</script>
<template>
  <Page class="app-chat-page">
    <head-page :userInfo="chatData.acf?.technician" :loader="loading" />
    <Content :isBoxed="false">
      <div class="chat-massages">
        <List :chatID="chatID" ref="listMeassages" />
        <CreateMessage :chatID="chatID" @onSend="updateMessages" />
      </div>
    </Content>
  </Page>
</template>
<style lang="scss">
.app-chat-page {
  .app-content {
    background-color: var(--bg-grey);
    padding: 70px 0 0;
  }
  .chat-massages {
    display: flex;
    flex-direction: column;
    height: 100%;
    margin: 0 -15px;
  }
}
</style>
