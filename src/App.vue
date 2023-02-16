<template> 
<router-view v-slot="{ Component }">
<transition  name="fadeLeft" mode="out-in">
  <component :is="Component"  />
</transition>
</router-view>
</template>

<style lang="scss">
.fadeLeft-enter-active,
.fadeLeft-leave-active {
  transition: all 0.4s ease-in-out;
}

.fadeLeft-enter-from,
.fadeLeft-leave-to {
  opacity: 0;
  transform: translateX(-20px);  
} 
</style>
