<script>
export default {
  props: ["data"],
};
</script>
<template> 
    <Card>
      <template #head> تفاصيل الطلب </template>
      <template #body>
        <ul class="order-details">
          <li>
            <strong>المنطقة</strong>
            <p>{{ data.acf?.region }}</p>
          </li>
          <li>
            <strong>الرقم التسلسلي للجهاز</strong>
            <p>{{ data.acf?.serial_number }}</p>
          </li>
          <li>
            <strong>الشركة المصنعة</strong>
            <p>{{ data.acf?.company }}</p>
          </li>
          <li v-if="data.acf?.technician.ID">
            <strong>وصول الفنى</strong>
            <p>
              <span
                class="app-badge"
                :class="{
                  completed: data.acf?.technician_arrived?.date,
                  cancelled: !data.acf?.technician_arrived?.date,
                }"
                style="margin-left: 10px"
                >{{
                  data.acf?.technician_arrived?.date ? "نعم" : "لا"
                }}</span
              >
              <template v-if="data.acf?.technician_arrived?.date"
                >{{ $dateTime(data.acf?.technician_arrived?.date) }}
              </template>
            </p>
          </li>
          <li v-if="data.acf?.technician?.ID">
            <strong>تاكيد وصول الفنى</strong>
            <p>
              <span
                class="app-badge"
                :class="{
                  completed: data.acf?.confirm_arrived,
                  cancelled: !data.acf?.confirm_arrived,
                }"
                style="margin-left: 10px"
                >{{ data.acf?.confirm_arrived ? "نعم" : "لا" }}</span
              >
              <!-- <template v-if="data.acf?.confirm_arrived"
                >{{ $dateTime(data.acf?.confirm_arrived) }}
              </template> -->
            </p>
          </li>
        </ul>
      </template>
    </Card>
</template>
