<script>
import { useChatStore } from "@/stores/useChat.js";
import HeadPage from "@/components/chat/Single/HeadPage.vue";
import CreateMessage from "@/components/chat/message/Create.vue";
import List from "@/components/chat/message/List.vue";

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
  mounted() {
    document.title = "Chat";
    if (this.$searchInStore(this.chatStore.list, this.chatID)) {
      this.loading = false;
      this.chatData = this.$searchInStore(this.chatStore.list, this.chatID);
    } else {
      this.fetchChat();
    }
  },
  methods: {
    fetchChat() {
      this.loading = true;
      this.chatStore.getChat(this.chatID).then(() => {
        this.chatData = this.chatStore.singleChat;
        this.loading = false;
      });
    },
    loadOnScroll(ele) {
      if (ele.scrollTop <= 0) {
        this.$refs.listMeassages.handleScroll();
      }
    },
  },
};
</script>
<template>
  <Page class="app-chat-page">
    <head-page :userInfo="chatData.acf?.technician" :loader="loading" />
    <Content :isBoxed="true" :bottomBar="true" @onScroll="loadOnScroll">
      <List :chatID="chatID" ref="listMeassages" />
      <div class="app-fixed-bottom">
        <CreateMessage :chatID="chatID" />
      </div>
    </Content>
  </Page>
</template>
<style lang="scss">
.app-chat-page { 
  .app-content-box {
    background-color: var(--bg-grey-2);
  }
}
</style>
