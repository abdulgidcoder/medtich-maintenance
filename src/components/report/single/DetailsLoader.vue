<template>
  <div class="app-report-details-placeholder">
    <Skeleton width="100%" height="28px" style="margin-bottom: 10px" />
    <Skeleton width="100px" height="16px" style="margin-bottom: 20px" />
    <ul class="report-details">
      <li>
        <Skeleton width="43px" height="21px" />
        <Skeleton width="50px" height="24px" borderRadius="15px" />
      </li>
      <li>
        <Skeleton width="168px" height="21px" />
        <Skeleton width="31px" height="24px" borderRadius="15px" />
      </li>
      <li>
        <Skeleton width="95px" height="21px" />
        <Skeleton width="31px" height="18px" />
      </li>
      <li>
        <Skeleton width="220px" height="21px" />
        <Skeleton width="31px" height="18px" />
      </li>
      <li>
        <Skeleton width="38px" height="21px" />
        <Skeleton width="130px" height="18px" />
      </li>
    </ul>
    <Skeleton width="50px" height="20px" style="margin-bottom: 10px" />
    <Skeleton width="100%" height="12px" style="margin-bottom: 5px" />
    <Skeleton width="100%" height="12px" style="margin-bottom: 5px" />
    <Skeleton width="100%" height="12px" style="margin-bottom: 5px" />
    <Skeleton width="100%" height="12px" style="margin-bottom: 5px" />
    <Skeleton width="100%" height="12px" style="margin-bottom: 5px" />
    <Skeleton width="100%" height="12px" style="margin-bottom: 5px" />
  </div>
</template>
<style lang="scss">
.app-report-details-placeholder {
  .report-details {
    li {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid var(--bg-grey-2);
      padding-bottom: 10px;
      margin-bottom: 10px;
      p {
        margin: 0;
      }
    }
  }
}
</style>
