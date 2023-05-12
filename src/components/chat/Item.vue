<script>
export default {
  props: {
    chat: Object,
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
          chat.acf?.technician_new_messages != '' && this.$auth.role == 'technician' ||
          chat.acf?.customer_new_messages != '' && this.$auth.role == 'customer',
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
            <p class="chat-item_title">{{ chat.title.rendered }}</p>
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
