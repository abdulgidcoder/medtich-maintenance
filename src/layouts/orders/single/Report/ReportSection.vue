<script>
import AcceptReport from "./AcceptReport.vue";

export default {
  components: { AcceptReport },
  props: ["data"],
};
</script>
<template>
  <Card v-if="data.acf?.report?.date">
    <template #title>التقرير</template>
    <template #actions>
      <AcceptReport :order="data" :report="data.acf?.report" />
    </template>
    <template #body>
      <ul class="report-details">
        <li>
          <strong>التاريخ </strong>
          <p>{{ $dateTime(data.acf?.report.date) }}</p>
        </li>
        <li
          v-if="
            data.acf?.report.payment_date 
          "
        >
          <strong> الدفع </strong>
          <p>
            <span
              class="app-badge"
              :class="{
                completed: data.acf?.report_payment_confirm,
                cancelled: data.acf?.report_payment_confirm == false,
              }"
              >{{data.acf?.report_payment_confirm == true ? "تم التاكيد " : "لم يتم التاكيد"}}
            </span>
          <span style="margin-right: 10px;">
            {{ $dateTime(data.acf?.report.payment_date) }}
          </span>
          </p>
        </li>
        <li>
          <strong>يحتاج إلى قطع غيار</strong>
          <p>
            <span
              class="app-badge"
              :class="{
                completed: data.acf?.report?.needs_replacement_parts == true,
                cancelled: data.acf?.report?.needs_replacement_parts == false,
              }"
              >{{
                data.acf?.report?.needs_replacement_parts == true ? "نعم" : "لا"
              }}</span
            >
          </p>
        </li>
        <li v-if="data.acf?.report.expected_cost">
          <strong>التكلفة المتوقعة</strong>
          <p>{{ data.acf?.report.expected_cost + " جنية" }}</p>
        </li>
        <li v-if="data.acf?.report.expected_time">
          <strong>الوقت المتوقع لحل المشكلة</strong>
          <p>{{ data.acf?.report.expected_time + " يوم" }}</p>
        </li>
      </ul>
      <p v-html="data.acf?.report.data"></p>
      <div class="app-gallery" v-if="data.acf?.report.images != 0">
        <div class="col" v-for="item in data.acf?.report.images" :key="item">
          <div class="image">
            <img :src="item.sizes.thumbnail" :alt="item.filename" />
          </div>
        </div>
      </div>
    </template>
  </Card>
</template>
