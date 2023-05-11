<script>
import { useChatStore } from "@/stores/useChat.js";
import Item from "./Item.vue";
import ItemLoader from "./ItemLoader.vue";
export default {
  components: { Item, ItemLoader },
  props: ["chatID", "scrollTo"],
  expose: ["fetchMessages", "handleScroll"],
  data() {
    return {
      messages: [],
      loading: true,
      polling: null,
      per_page: 15,
      offset: 0,
      total: "",
      hasMore: true,
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
          }
        });
    },
    pollingMessages() {
      this.polling = setInterval(async () => {
        await this.chatStore
          .getMessages(this.chatID, this.per_page, this.offset)
          .then((response) => {
            if (response.headers["x-wp-total"] > this.total) {
              let countMessages = response.headers["x-wp-total"] - this.total;
              let newMessages = response.data.slice(0, countMessages);
              this.total = response.headers["x-wp-total"];
              newMessages.map((message) => {
                this.messages.unshift(message);
              });
              this.scrollToBottom();
            }
          });
      }, this.$pollTimer);
    },
    scrollToBottom() {
      if (this.$refs.chatMessages) {
        document.querySelector(".app-content").scrollTo({
          top: this.$refs.chatMessages.scrollHeight,
          behavior: "smooth",
        });
      }
    },
    handleScroll() {
      if (this.hasMore) {
        this.loading = true;
        this.fetchMessages();
        this.offset += this.per_page;
          document.querySelector(".app-content").scrollTo({
          top: 50,
          behavior: "smooth",
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
  <div class="chat-messages" ref="chatMessages">
    <ul v-if="loading">
      <ItemLoader v-for="n in 10" :key="n" />
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
.chat-messages {
  ul {
    display: flex;
    flex-direction: column-reverse;
  }
}
</style>
