<template>
  <Transition name="fade">
    <li class="message-item-loader">
      <div class="message-item_wrap">
        <div class="message-item_content">
          <Skeleton width="200px" height="15px" />
          <Skeleton width="150px" height="15px" style="margin-top: 5px" />
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
  line-height: 1;
  margin-bottom: 20px;
  &_wrap {
    display: inline-block;
  }

  .message-item_content {
    background-color: var(--primary);
    padding: 10px;
    margin-bottom: 8px;
    border-radius: 10px;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 2px;
  }

  &:nth-child(even) {
    text-align: left;
    .message-item_content {
      background-color: var(--white);

      border-bottom-left-radius: 2px;
    }
    .message-item_date .skeleton {
      margin-right: auto;
    }
  }
}
</style>
