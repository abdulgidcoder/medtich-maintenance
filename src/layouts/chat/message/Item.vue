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
  &:not(:first-child) {
    margin-bottom: 20px;
  }
  &_wrap {
    display: inline-block;
  }
  .message-item_content {
    padding: 10px;
    border-radius: 10px;
    border-bottom-left-radius: 2px;
    background-color: var(--white);
    margin-bottom: 6px;
    p {
      color: var(--black);
      margin-bottom: 0;
    }
  }
  .message-item_date {
    font-size: 12px;
    color: var(--medium);
  }
  &.my-mess {
    text-align: right;
    .message-item_content {
      background-color: var(--primary);
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 2px;
    }
    .message-item_content p {
      color: var(--white);
    } 
  }
}
</style>
