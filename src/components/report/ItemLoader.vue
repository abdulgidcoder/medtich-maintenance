<template>
  <Transition name="fade">
    <li class="report-item-placeholder">
      <div class="report-top">
        <Skeleton width="98%" height="23px" />
      </div>
         <Skeleton width="40%" height="22px" style="margin-top:6px" />
      <div class="report-bottom">
        <div class="report-meta">
          <span>
            <Skeleton width="91px" height="14px" />
          </span>
          <span>
            <Skeleton width="47px" height="14px" />
          </span>
            <span>
            <Skeleton width="47px" height="14px" />
          </span>
            <span>
            <Skeleton width="50px" height="24px" borderRadius="15px"/>
          </span>
        </div>
      </div>
    </li>
  </Transition>
</template>
<style lang="scss" scoped>
.report-item-placeholder {
  padding-bottom: 10px;
  margin-bottom: 12px;
  border-bottom: 1px solid var(--grey);
  .report-meta {
    display: flex;
    align-items: center;
    > span {
      &:not(:first-child) {
        margin-left: 10px;
      }
    }
  }
  .report-bottom {
    margin-top: 7px;
    display: flex;
    justify-content: space-between;
  }
}
</style>
