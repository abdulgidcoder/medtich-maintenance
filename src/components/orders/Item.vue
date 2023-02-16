<script>
import moment from "moment";
export default {
  props: {
    title: String,
    date: String,
    name: String,
    area: String,
  },
  data() {
    return {
      moment: moment,
    };
  },
};
</script>
<template>
  <li class="order-item">
    <h4>{{ title }}</h4>
    <div class="order-meta">
      <span class="order-date">
        <Icon name="clock" />
        {{ moment.parseZone(date).local().startOf("second").fromNow() }}
      </span>
      <span class="order-name" v-if="name"><Icon name="user" />{{ name }}</span>
      <!-- <span class="order-area"><Icon name="location" />{{ area /}}</span> -->
    </div>
  </li>
</template>
<style lang="scss">
.order-item {
  border-radius: 5px;
  box-shadow: 0 2px 4px var(--grey);
  padding: 10px;
  margin-bottom: 12px;
  background: var(--light);
  .order-meta {
    display: flex;
    align-items: center;
    font-size: 10px;
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
}
</style>
