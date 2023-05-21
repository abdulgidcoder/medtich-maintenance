<template>
  <div class="app-order-details">
    <Skeleton width="100%" height="18px" style="margin-bottom: 15px" />
    <div class="order-meta">
      <span>
        <Skeleton width="66px" height="18px" />
      </span>
      <span>
        <Skeleton width="50px" height="18px" />
      </span>
      <span>
        <Skeleton width="72px" height="24px" borderRadius="15px" />
      </span>
    </div>

    <Card>
      <template #body>
        <Skeleton width="100%" height="12px" style="margin-bottom: 5px" />
        <Skeleton width="100%" height="12px" style="margin-bottom: 5px" />
        <Skeleton width="100%" height="12px" />
      </template>
    </Card>

    <Card>
      <template #title>
        <Skeleton width="100px" height="20px" style="margin-bottom: 15px"
      /></template>
      <template #body>
        <ul class="order-details">
          <li>
            <strong> <Skeleton width="70px" height="15px" /></strong>
            <p><Skeleton width="60px" height="15px" /></p>
          </li>
          <li>
            <strong> <Skeleton width="140px" height="15px" /></strong>
            <p><Skeleton width="60px" height="15px" /></p>
          </li>
          <li>
            <strong> <Skeleton width="90px" height="15px" /></strong>
            <p><Skeleton width="120px" height="15px" /></p>
          </li>
        </ul>
      </template>
    </Card>
    <Card>
      <template #title>
        <Skeleton width="100px" height="20px" style="margin-bottom: 15px"
      /></template>
      <template #body>
        <ul class="order-details">
          <li>
            <strong> <Skeleton width="80px" height="15px" /></strong>
            <p><Skeleton width="150px" height="15px" /></p>
          </li>
          <li>
            <strong> <Skeleton width="80px" height="15px" /></strong>
            <p><Skeleton width="120px" height="15px" /></p>
          </li>
           <li>
            <strong> <Skeleton width="80px" height="15px" /></strong>
            <p><Skeleton width="106" height="34px" /></p>
          </li>
           <li>
            <strong> <Skeleton width="80px" height="15px" /></strong>
            <p><Skeleton width="120px" height="34px" /></p>
          </li>
        </ul>
      </template>
    </Card>
    <Card>
      <template #title>
        <Skeleton width="90px" height="20px" style="margin-bottom: 15px"
      /></template>
      <template #body>
        <Skeleton width="100%" height="75px" style="margin-bottom: 10px" />
        <Skeleton width="100%" height="75px" style="margin-bottom: 10px" />
      </template>
    </Card>
    <div class="app-fixed-bottom">
      <Skeleton width="51px" height="42px" style="margin-left: 15px" /> 
    </div>
  </div>
</template>
