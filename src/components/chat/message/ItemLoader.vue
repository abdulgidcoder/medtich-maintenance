<template>
  <Transition name="fade">
    <li class="message-item-loader">
      <div class="message-item_wrap">
        <div class="message-item_content">
          <Skeleton width="200px" height="14px" />
        </div>
        <span class="message-item_date"
          ><Skeleton width="60px" height="12px"
        /></span>
      </div>
    </li>
  </Transition>
</template>
<style lang="scss">
.message-item-loader {
  text-align: left;
  line-height: 1; 
  margin-bottom: 15px;
  &_wrap {
    display: inline-block;
    background-color: var(--white);
    padding: 10px;
    border-radius: 10px;
    border-bottom-left-radius: 2px;
  }
  .message-item_content {
    margin-bottom: 8px;
  } 

  &:nth-child(even) {
    text-align: right;
    .message-item_wrap {
      background-color: var(--primary);
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 2px;
    }
  }
}
</style>
