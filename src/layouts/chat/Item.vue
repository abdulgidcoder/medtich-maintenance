<script>
export default {
  props: {
    chat: Object,
  },
  computed: {
    isMyMessage() {
      return this.chat.last_comment?.author_id == this.$auth.user_data.id;
    },
    haveNewMassage() {
      return (
        (this.chat.acf?.technician_new_messages != "" &&
          this.$auth.role == "technician") ||
        (this.chat.acf?.customer_new_messages != "" &&
          this.$auth.role == "customer")
      );
    },
    chatUser() {
      return this.$auth.role == "technician"
        ? this.chat.author_chat
        : this.chat.acf?.technician;
    },
  },
  methods: {},
};
</script>
<template>
  <Transition name="fade">
    <li
      class="chat-item"
      :class="{
        'have-messages': haveNewMassage,
      }"
    >
      <RouterLink
        :to="{
          name: 'single-chat',
          params: { id: chat.id },
        }"
      >
        <div class="chat-item_wrap">
          <div class="chat-item_wrap-right">
            <div class="app-avatar" v-html="chatUser.user_avatar"></div>
          </div>
          <div class="chat-item_wrap-left">
            <div class="chat-item-top">
              <h4 class="chat-item_username">
                {{ chatUser.display_name }}
              </h4>
              <span class="chat-item_date">
                {{ $dateTime(chat.last_comment?.date) }}
              </span>
            </div>
            <div class="chat-item_meta">
              <p class="chat-item_last-mess">
                {{
                  isMyMessage
                    ? "انت: " + chat.last_comment?.content
                    : chat.last_comment?.content
                }}
              </p>
            </div>
          </div>
          <span
            class="chat-item_messages"
            v-if="
              chat.acf?.customer_new_messages && this.$auth.role == 'customer'
            "
            >{{
              chat.acf?.customer_new_messages >= 10
                ? "+10"
                : chat.acf?.customer_new_messages
            }}</span
          >
          <span
            class="chat-item_messages"
            v-if="
              chat.acf?.technician_new_messages &&
              this.$auth.role == 'technician'
            "
            >{{
              chat.acf?.technician_new_messages >= 10
                ? "+10"
                : chat.acf?.technician_new_messages
            }}</span
          >
        </div>
      </RouterLink>
    </li>
  </Transition>
</template>
