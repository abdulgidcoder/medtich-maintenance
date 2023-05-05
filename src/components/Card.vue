<template>
  <div class="app-card">
    <div class="app-card_header" v-if="$slots.title || $slots.actions">
      <h4 v-if="$slots.title"><slot name="title"></slot></h4>
      <div>
        <slot name="actions" ></slot>

      </div>
    </div>
    <div class="app-card_body">
      <slot name="body"></slot>
    </div>
  </div>
</template>
<style lang="scss">
.app-card {
  background: var(--white);
  padding: 10px;
  margin-bottom: 10px;
  box-shadow: 0 0px 2px #d3d3d3;
  border-radius: 5px;
  &_header {
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    h4 {
      margin-bottom: 0;
      color: var(--primary);
    }
  }
  p {
    margin-bottom: 0;
  }
}
</style>
