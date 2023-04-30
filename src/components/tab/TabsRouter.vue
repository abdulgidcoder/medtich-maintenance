<script>
export default {};
</script>
<template>
  <router-view v-slot="{ Component }">
    <transition name="fadeUpTab" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>
</template>
