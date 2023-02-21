<script>
export default {
  props: { show: Boolean },
};
</script>
<template>
  <Transition name="fade">
    <slot v-if="show"></slot>
  </Transition>
</template> 