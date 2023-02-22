<script>
import moment from "moment";

export default {
  props: { details: Object },
  data() {
    return {
      moment: moment,
    };
  },
};
</script>
<template>
  <div class="app-report-details">
    <h2 v-html="details.title?.rendered" class="report-title"></h2>
    <div class="report-meta">
      <span>
        <Icon name="clock" />
        <span>
          {{
           $dateTime(details.date)
          }}</span
        >
      </span>
    </div>
    <ul class="report-details">
      <li>
        <strong>الحالة</strong>
        <p>
          <span
            class="app-badge"
            :class="{
              completed: details.acf?.status == 'active',
              pending: details.acf?.status == 'pending',
              cancelled: details.acf?.status == 'block',
            }"
            >{{  details.acf?.status == 'active' ? 'نشط' :
              details.acf?.status == 'pending' ? 'قيد الانتظار' :
              details.acf?.status == 'block' ? 'مرفوض' : '' }}</span
          >
        </p>
      </li>
      <li>
        <strong>يحتاج إلى قطع غيار</strong>
        <p>
          <span
            class="app-badge"
            :class="{
              completed: details.acf?.replacement_parts == true,
              cancelled: details.acf?.replacement_parts == false,
            }"
            >{{ details.acf?.replacement_parts == true ? 'نعم' : 'لا' }}</span
          >
        </p>
      </li>
      <li>
        <strong>التكلفة المتوقعة</strong>
        <p>{{ details.acf?.expected_cost + " ريال" }}</p>
      </li>
      <li>
        <strong>الوقت المتوقع لحل المشكلة</strong>
        <p>{{ details.acf?.expected_time + " يوم" }}</p>
      </li>
      <li v-if="details.acf?.order">
        <strong>الطلب</strong>
        <p>
          <RouterLink
            :to="{
              name: 'single-order',
              params: { id: details.acf?.order['ID'] },
            }"
            class="btn-link"
            >{{ details.acf?.order["post_title"] }}</RouterLink
          >
        </p>
      </li>
    </ul>
    <div class="report-content">
      <strong>التفاصيل</strong>
      <div v-html="details.content?.rendered"></div>
    </div> 
          <div class="app-gallery" v-if="details.acf?.image">
        <div class="col" v-for="item in details.acf?.image" :key="item"> 
          <div class="image">
            <img :src="item.sizes?.thumbnail" :alt="item.title" />
          </div>
        </div>
      </div>
  </div>
</template>
<style lang="scss">
.app-report-details {
  .report-title {
    margin-bottom: 3px;
  }
  .report-meta {
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
  .report-content {
    strong {
      margin-bottom: 10px;
      display: block;
    }
  }
}
</style>
