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
            moment.parseZone(details.date).local().startOf("second").fromNow()
          }}</span
        >
      </span>
    </div>
    <ul class="report-details">
      <li>
        <strong>Status</strong>
        <p>
          <span
            class="app-badge"
            :class="{
              completed: details.acf?.status == 'active',
              pending: details.acf?.status == 'pending',
              cancelled: details.acf?.status == 'block',
            }"
            >{{ details.acf?.status.toUpperCase() }}</span
          >
        </p>
      </li>
      <li>
        <strong>Needs replacement parts</strong>
        <p>
          <span
            class="app-badge"
            :class="{
              completed: details.acf?.replacement_parts == true,
              cancelled: details.acf?.replacement_parts == false,
            }"
            >{{ details.acf?.replacement_parts == true ? 'Yes' : 'No' }}</span
          >
        </p>
      </li>
      <li>
        <strong>Expected Cost</strong>
        <p>{{ details.acf?.expected_cost + " SAR" }}</p>
      </li>
      <li>
        <strong>Expected time to resolve the issue</strong>
        <p>{{ details.acf?.expected_time + " Day" }}</p>
      </li>
      <li v-if="details.acf?.order">
        <strong>Order</strong>
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
      <strong>Details</strong>
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
