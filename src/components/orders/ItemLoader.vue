<template>
  <Transition name="fade">
    <li class="order-item-placeholder">
      <div class="order-top">
        <Skeleton width="100%" height="23px" />
      </div>
      <div class="order-bottom">
        <div class="order-meta">
          <span class="order-date">
            <Skeleton width="95px" height="14px" />
          </span>
          <span class="order-name">
            <Skeleton width="95px" height="14px"
          /></span>
        </div>
        <Skeleton width="60px" height="26px"/>
      </div>
    </li>
  </Transition>
</template>
<style lang="scss" scoped>
.order-item-placeholder {
  border-radius: 5px;
  box-shadow: 0 2px 4px var(--grey);
  padding: 10px;
  margin-bottom: 12px;
  background: var(--light);
  .order-meta {
    display: flex;
    align-items: center;
    > span {
      &:not(:first-child) {
        margin-left: 10px;
      }
    }
  }
  .order-top {
    margin: 0 0 0.4375rem;
  }
  .order-bottom {
    display: flex;
    justify-content: space-between;
  }
}
</style>
