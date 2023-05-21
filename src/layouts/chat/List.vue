<script>
import { useChatStore } from "@/stores/useChat.js";
import Item from "./Item.vue";
import ItemLoader from "./ItemLoader.vue";

export default {
  components: { Item, ItemLoader },
  props: {
    currentPage: Number,
    per_page: Number,
    pagination: Boolean,
    paginClass: String,
  },
  expose: ["fetchChat"],
  data() {
    return {
      loader: true,
      currPage: this.currentPage ? this.currentPage : 1,
      polling: null,
    };
  },
  setup() {
    const chatStore = useChatStore();
    return { chatStore };
  },
  beforeUnmount() {
    clearInterval(this.polling);
  },
  mounted() {
    if (!this.chatStore.list) {
      this.fetchChat();
      this.pollingChat();
    } else {
      this.loader = false;
      this.pollingChat();
    }
  },
  methods: {
    fetchChat() {
      this.loader = true;
      this.chatStore
        .ftechChats(this.$auth, this.currPage, this.per_page)
        .then(() => {
          this.loader = false;
        });
    },
    pollingChat() {
      this.polling = setInterval(() => {
        this.chatStore
          .ftechChats(this.$auth, this.currPage, this.per_page)
          .then(() => {
            this.loader = false;
          });
      }, this.$pollTimer);
    },
    onPageChange(page) {
      this.currPage = page;
      this.fetchChat();
    },
  },
};
</script>

<template>
  <div class="chats-list app-list-min">
    <ul v-if="loader">
      <ItemLoader v-for="n in this.per_page" :key="n" />
    </ul>
    <ul v-else>
      <Item
        v-for="chat in this.chatStore.list"
        :key="chat.id"
        :chat="chat"
      ></Item>
    </ul>
  </div>
  <EmptyContent
    title="لا يوجد اى طلبات"
    v-if="!loader && this.chatStore.list.length == 0"
  />
  <div
    v-if="this.pagination && this.chatStore.total >= 2"
    :class="this.paginClass"
  >
    <Pagination
      :totalPages="this.chatStore.total"
      :perPage="this.per_page"
      :currentPage="this.currPage"
      @pagechanged="onPageChange"
    />
  </div>
</template>
<style lang="scss">
.chats-list { 
  ul {
    margin: 0 -15px;
  }
}
</style>
