<script>
export default {
  props: { details: Object },
};
</script>
<template>
  <div class="app-order-details">
    <h2 v-html="details.title?.rendered" class="order-title"></h2>
    <div class="order-meta">
      <span>
        <Icon name="clock" />
        <span> {{ $dateTime(details.date) }}</span>
      </span>
    </div>
    <ul class="order-details">
      <li>
        <strong>الاسم</strong>
        <p>{{ details.acf?.name }}</p>
      </li>
      <li>
        <strong>الهاتف</strong>
        <p>{{ details.acf?.mobile }}</p>
      </li>
      <li>
        <strong>المنطقة</strong>
        <p>{{ $nameArea(details.acf?.area) }}</p>
      </li>
      <li>
        <strong>التاريخ</strong>
        <p>{{ details.acf?.date }}</p>
      </li>
      <li>
        <strong>الرقم التسلسلي للجهاز</strong>
        <p>{{ details.acf?.serial_number }}</p>
      </li>
      <li>
        <strong>الشركة المصنعة</strong>
        <p>{{ details.acf?.company }}</p>
      </li>
    </ul>
    <div class="order-content">
      <strong>تفاصيل</strong>
      <div v-html="details.content?.rendered"></div>
    </div>
    <div class="app-fixed-bottom">
      <a
        class="btn btn-primary btn-lg btn-block"
        target="_blank"
        :href="
          'https://www.google.com/maps/dir/?api=1&origin=&destination=' +
          details.acf?.latitude +
          ',' +
          details.acf?.longitude
        "
      >
        <Icon name="location-crosshairs" />تتبع الموقع على الخريطة
      </a>
    </div>
  </div>
</template>
<style lang="scss">
.app-order-details {
  .order-title {
    margin-bottom: 3px;
  }
  .order-meta {
    font-size: 14px;
    margin-bottom: 20px;
    > span {
      color: var(--dark);
      vertical-align: middle;
      &:not(:first-child) {
        margin-left: 10px;
      }
    }
    svg {
      width: auto;
      height: 10px;
      vertical-align: middle;
      margin-right: 5px;
      fill: var(--primary);
    }
  }
  .order-details {
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
  .order-content {
    strong {
      margin-bottom: 10px;
      display: block;
    }
  }
}
</style>
