<script>
import moment from "moment";
export default {
  props: {
    report: Object,
  },
  data() {
    return {
      moment: moment,
    };
  },
};
</script>
<template>
  <li class="report-item">
     <RouterLink
        :to="{
          name: 'single-report',
          params: { id: report.id },
        }"
      >

    <div class="report-item-wrap">
      <h4>{{ report.title.rendered }}</h4>
      <div class="report-meta">
        <span class="report-date"
          ><Icon name="calendar" />
          {{
            moment.parseZone(report.date).local().startOf("second").fromNow()
          }}</span
        >
        <span class="report-cost"
          ><Icon name="dollar" />{{ report.acf["expected_cost"] }} Sar</span
        >
        <span class="report-cost"
          ><Icon name="clock" />{{ report.acf["expected_time"] }} day</span
        >
        <span class="report-status">
          <span
            class="app-badge"
            :class="{
              completed: report.acf['status'] == 'active',
              pending: report.acf['status'] == 'pending',
              cancelled: report.acf['status'] == 'block',
            }"
            >{{ report.acf["status"] }}</span
          >
        </span>
      </div> 
    </div>
      </RouterLink>
  </li>
</template>
<style lang="scss">
.report-item {
  padding-bottom: 10px;
  margin-bottom: 12px;
  border-bottom: 1px solid var(--grey);
  a {
    display: flex;
    align-items: center;
    justify-content: space-between;
    line-height: 1;
  }
  .item-wrap {
    flex-grow: 1;
    margin-right: 15px;
  }
  .report-meta {
    display: flex;
    align-items: center;
    > span {
      color: var(--medium);
      font-size: 13px;
      vertical-align: middle;
      &:not(:first-child) {
        margin-left: 10px;
      }
      .app-icon {
        font-size: 15px;
        margin-right: 5px;
        color: var(--primary);
      }
      svg {
        width: auto;
        height: 12px;
      }
    }
    .report-date {
    }
  }
}
</style>
