<template>
  <Transition name="fade">
    <li class="chat-item">
      <div class="chat-item_wrap">
        <div class="chat-item_wrap-right">
          <Skeleton width="42px" height="42px" borderRadius="50%" />
        </div>
        <div class="chat-item_wrap-left">
          <Skeleton width="100px" height="19px" style="margin-bottom: 10px" />
          <Skeleton width="180px" height="16px" />
        </div>
      </div>
    </li>
  </Transition>
</template>
<style lang="scss" scoped></style>
