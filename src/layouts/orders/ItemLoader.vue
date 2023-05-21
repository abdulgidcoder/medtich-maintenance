<template>
  <Transition name="fade">
    <li class="order-item-placeholder">
      <div class="order-top">
        <Skeleton width="100%" height="21px" /> 
      </div>
      <div class="order-bottom">
        <div class="order-meta">
          <span class="order-date">
            <Skeleton width="66px" height="18px" />
          </span> 
             <span class="order-date">
            <Skeleton width="50px" height="18px" />
          </span> 
        </div> 
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
