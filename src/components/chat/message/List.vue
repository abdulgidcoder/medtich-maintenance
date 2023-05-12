<script>
import { useChatStore } from "@/stores/useChat.js";
import Item from "./Item.vue";
import ItemLoader from "./ItemLoader.vue";
export default {
  components: { Item, ItemLoader },
  props: ["chatID", "scrollTo"],
  expose: ["fetchMessages", "handleScroll", "total"],
  data() {
    return {
      messages: [],
      loading: true,
      polling: null,
      per_page: 15,
      offset: 0,
      total: "",
      hasMore: false,
    };
  },
  setup() {
    const chatStore = useChatStore();
    return { chatStore };
  },
  async mounted() {
    await this.fetchMessages();
    this.scrollToBottom();
    this.pollingMessages();
  },
  methods: {
    async fetchMessages() {
      await this.chatStore
        .getMessages(this.chatID, this.per_page, this.offset)
        .then((response) => {
          this.messages = this.messages.concat(response.data);
          this.total = response.headers["x-wp-total"];
          this.loading = false;
          if (response.data.length < this.per_page) {
            this.hasMore = false;
          } else {
            this.hasMore = true;
          }
        });
    },
    pollingMessages() {
      this.polling = setInterval(async () => {
        await this.chatStore
          .getMessages(this.chatID, this.per_page, 0)
          .then((response) => {
            if (response.headers["x-wp-total"] > this.total) {
              let countMessages = response.headers["x-wp-total"] - this.total;
              let newMessages = response.data.slice(0, countMessages);
              this.total = response.headers["x-wp-total"];
              newMessages.map((message) => {
                this.messages.unshift(message);
              });
              this.$nextTick(() => {
                this.scrollToBottom();
              });
            }
          });
      }, 1500);
    },
    scrollToBottom() {
      if (this.$refs.chatList) {
        this.$refs.chatList.scrollTo({
          top: this.$refs.chatList.scrollHeight,
          behavior: "smooth",
        });
      }
    },
    handleScroll(ele) {
      if (ele.target.scrollTop <= 0 && this.hasMore && !this.loading) {
        this.offset += this.per_page;
        this.loading = true;
        this.fetchMessages();
        this.$refs.chatList.scrollTo({
          top: 50,
        });
      }
    },
  },
  beforeUnmount() {
    clearInterval(this.polling);
  },
};
</script>
<template>
  <div class="chat-list" ref="chatList" @scroll="handleScroll($event)">
    <div class="load-more" v-if="hasMore">
      <Spinner />
    </div>
    <ul v-if="loading">
      <ItemLoader v-for="n in this.per_page" :key="n" />
    </ul>
    <ul>
      <Item
        v-for="message in messages"
        :key="message.id"
        :message="message"
      ></Item>
    </ul>
    <EmptyContent
      title="لا يوجد رسائل"
      v-if="!loading && messages.length == 0"
    />
  </div>
</template>
<style lang="scss">
.chat-list {
  padding: 15px;
  flex: 1;
  overflow-y: auto;
  ul {
    display: flex;
    flex-direction: column-reverse;
  }
  .load-more {
    text-align: center;
    margin-bottom: 20px;
  }
}
</style>
