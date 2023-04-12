<template>
  <div class="app-card">
    <div class="app-card_header" v-if="$slots.title">
      <h4><slot name="title"></slot></h4>
    </div>
    <div class="app-card_body">
      <slot name="body"></slot>
    </div>
  </div>
</template>
<style lang="scss">
.app-card {
  background: var(--white); 
  border-bottom: 1px solid var(--grey);
  padding-bottom: 10px;
  margin-bottom: 12px;
  h4 {
    margin-bottom: 10px;
    color: var(--primary);
  }
}
</style>
