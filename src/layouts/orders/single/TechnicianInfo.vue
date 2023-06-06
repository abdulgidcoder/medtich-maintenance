<script>
export default {
  props: ["data"],
};
</script>
<template> 
    <Card v-if="data.technician.ID && data.payment_confirm">
      <template #title>بيانات المتخصص</template>
      <template #body>
        <ul class="order-details">
          <li>
            <strong>الاسم</strong>
            <p>{{ data.technician.display_name }}</p>
          </li>
          <li>
            <strong>الهاتف</strong>
            <p>
              <a
                :href="'tel:' + data.technician.user_nicename"
                class="btn btn-outline-primary btn-sm"
              >
                <Icon name="phone" />اتصل الان</a
              >
            </p>
          </li>
        </ul>
      </template>
    </Card>
</template>
