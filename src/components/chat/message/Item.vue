<script>
export default {
  props: {
    message: Object,
  },
  methods: {},
};
</script>
<template>
  <Transition name="fade">
    <li class="message-item">{{ message }}</li>
  </Transition>
</template>
