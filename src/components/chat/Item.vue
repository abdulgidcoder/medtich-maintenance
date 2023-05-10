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
    <li class="chat-item">
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
        </div>
      </RouterLink>
    </li>
  </Transition>
</template> 