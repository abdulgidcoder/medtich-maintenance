<script>
import moment from "moment";
import { useOrdesStore } from "@/stores/useOrders.js";
export default {
  props: {
    order: Object,
  },
  data() {
    return {
      moment: moment,
    };
  },
  setup() {
    const ordersStore = useOrdesStore();
    return { ordersStore };
  },
  methods: {},
};
</script>
<template>
  <Transition name="fade">
    <li class="my-order-item-placeholder">
      <div class="item-wrap">
        <Skeleton width="100%" height="23px" />
        <div class="order-meta">
          <span><Skeleton width="100px" height="15px" /></span>
          <span><Skeleton width="100px" height="15px" /></span>
          <span
            ><Skeleton width="75px" height="24px" borderRadius="25px"
          /></span>
        </div>
      </div>
      <Skeleton width="16px" height="27px" />
    </li>
  </Transition>
</template>
<style lang="scss">
.my-order-item-placeholder {
  padding-bottom: 10px;
  margin-bottom: 12px;
  border-bottom: 1px solid var(--grey);
  display: flex;
  align-items: center;
  justify-content: space-between;
  .item-wrap {
    flex-grow: 1;
    margin-right: 25px;
    padding: 5px 0;
  }
  .order-meta {
    margin-top: 0.4375rem;
    display: flex;
    align-items: center;
    > span {
      &:not(:first-child) {
        margin-left: 10px;
      }
    }
  }
}
</style>
