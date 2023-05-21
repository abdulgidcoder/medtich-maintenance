<script>
export default {
  props: ["data",'isMyOrder'],
};
</script>
<template>
  <Card v-if="isMyOrder || this.$auth.role == 'customer'">
    <template #title>بيانات العميل</template>
    <template #body>
      <ul class="order-details">
        <li>
          <strong>الاسم</strong>
          <p>{{ data.acf?.name }}</p>
        </li>
        <li>
          <strong>البريد الالكترونى</strong>
          <p>{{ data.acf?.email }}</p>
        </li>
        <li v-if="data.acf?.mobile">
          <strong>الهاتف</strong>
          <p>
            <a
              :href="'tel:' + data.acf?.mobile"
              class="btn btn-outline-primary btn-sm"
            >
              <Icon name="phone" />اتصل الان</a
            >
          </p>
        </li>
        <li v-if="data.acf?.latitude && data.acf?.latitude">
          <strong>الموقع على الخريطة</strong>
          <a
            class="btn btn-outline-primary btn-sm"
            target="_blank"
            :href="
              'https://www.google.com/maps/dir/?api=1&origin=&destination=' +
              data.acf?.latitude +
              ',' +
              data.acf?.longitude
            "
          >
            <Icon name="location-crosshairs" />تتبع الموقع
          </a>
        </li>
      </ul>
    </template>
  </Card>
</template>
