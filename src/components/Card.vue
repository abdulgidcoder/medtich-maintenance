<template>
  <div class="app-card">
    <div class="app-card-container">
      <div class="app-card_header" v-if="$slots.title || $slots.actions">
        <h4 v-if="$slots.title"><slot name="title"></slot></h4>
        <div>
          <slot name="actions"></slot>
        </div>
      </div>
      <div class="app-card_body">
        <slot name="body"></slot>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
.app-card {
  background: var(--bg-grey);
  margin: 0 -15px;
  &:not(:last-child) {
    padding-bottom: 12px;
  }
  &-container {
    background: var(--white);
    padding: 12px;
    border-bottom: 1px solid var(--grey);
  }
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
