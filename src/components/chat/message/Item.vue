<script>
export default {
  props: {
    message: Object,
  },
  data() {
    return {
      isMyMess: this.message.author == this.$auth.user_data.id,
    };
  },
  methods: {},
};
</script>
<template>
  <Transition name="fade">
    <li class="message-item" :class="{ 'my-mess': isMyMess }">
      <div class="message-item_wrap">
        <div
          class="message-item_content"
          v-html="message.content?.rendered"
        ></div> 
        <span class="message-item_date">{{ $dateTime(message.date) }}</span>
      </div>
    </li>
  </Transition>
</template>

<style lang="scss">
.message-item {
  text-align: left;
  line-height: 1;
  margin-bottom: 15px; 
  &_wrap {
    display: inline-block;
    background-color: var(--white);
    padding: 10px;
    border-radius: 10px;
    border-bottom-left-radius: 2px;
  }
  .message-item_content {
    margin-bottom: 8px;
    p { 
      color: var(--black);
    }
  }
  .message-item_date {
    font-size: 11px;
    color: var(--medium);
  }
  &.my-mess {
    text-align: right;
    .message-item_wrap {
      background-color: var(--primary);
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 2px;
    }
    .message-item_content p {
      color: var(--white);
    }
    .message-item_date {
      color: var(--white);
    }
  }
}
</style>
