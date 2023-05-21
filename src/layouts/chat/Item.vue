<script>
export default {
  props: {
    chat: Object,
  },
  data() {
    return {
      isMyMessage: this.chat.last_comment?.author_id == this.$auth.user_data.id,
    };
  },
  methods: {},
};
</script>
<template>
  <Transition name="fade">
    <li
      class="chat-item"
      :class="{
        'have-messages':
          (chat.acf?.technician_new_messages != '' &&
            this.$auth.role == 'technician') ||
          (chat.acf?.customer_new_messages != '' &&
            this.$auth.role == 'customer'),
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
            <div
              class="app-avatar"
              v-html="chat.acf?.technician.user_avatar"
            ></div>
          </div>
          <div class="chat-item_wrap-left">
            <h4 class="chat-item_username">
              {{ chat.acf?.technician.display_name }}
            </h4>
            <div class="chat-item_meta">
              <p class="chat-item_last-mess">
                {{
                  this.chat.last_comment?.author_id == this.$auth.user_data.id
                    ? "انت: " + chat.last_comment?.content
                    : chat.last_comment?.content
                }}
              </p>
              <span class="chat-item_date">
                {{ $dateTime(chat.modified) }}
              </span>
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
