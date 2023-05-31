<script>
import { useChatStore } from "@/stores/useChat.js";
import { defineAsyncComponent } from "vue";
export default {
  components: {
    chatList: defineAsyncComponent(() => import("@/layouts/chat/List.vue")),
  },
  setup() {
    const chatStore = useChatStore();
    return { chatStore };
  },
  methods: {
    reloadChats() {
      this.$refs.chatList.fetchChat();
    },
  },
};
</script>
<template>
  <div class="app-tab-view app-notify-page">
    <Head title="الرسائل" />
    <Content :isBoxed="true" :pullToRefresh="true" @onRefresh="reloadChats" :enableOffline="true"> 
      <chatList
        ref="chatList"
        :per_page="15"
        :pagination="true"
        paginClass="app-fixed-bottom"
      />
    </Content>
  </div>
</template>

<style lang="scss"></style>
