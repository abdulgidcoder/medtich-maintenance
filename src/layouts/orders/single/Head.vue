<script>
export default {
  props: ["data"],
};
</script>
<template> 
  <div class="app-order-details_head">
    <h3 class="order-title">{{ data.title?.rendered }}</h3>
    <div class="order-meta">
      <span>
        <Icon name="clock" />
        <span> {{ $dateTime(data.date) }}</span>
      </span>
      <span>
        <Icon name="location" />
        <span> {{ $nameCity(data.acf?.city) }}</span>
      </span>
      <span class="order-status">
        <span
          class="app-badge"
          :class="{
            active: data.acf['status'] == 'active',
            pending: data.acf['status'] == 'pending',
            processing: data.acf['status'] == 'processing',
            completed: data.acf['status'] == 'completed',
            cancelled: data.acf['status'] == 'cancelled',
          }"
          >{{
            data.acf["status"] == "active"
              ? "تلقى العروض"
              : data.acf["status"] == "pending"
              ? "قيد الانتظار "
              : data.acf["status"] == "completed"
              ? "اكتمل"
              : data.acf["status"] == "processing"
              ? "قيد التنفيذ"
              : data.acf["status"] == "cancelled"
              ? " ملغى "
              : ""
          }}</span
        >
      </span>
    </div>
  </div>
</template>
