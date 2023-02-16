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
  <Transition>
    <li class="my-order-item">
      <RouterLink
        :to="{
          name: 'single-order',
          params: { id: order.id },
        }"
      >
        <div class="item-wrap">
          <h4>{{ order.title.rendered }}</h4>
          <div class="order-meta">
            <span class="order-date">
              <Icon name="clock" />
              {{
                moment.parseZone(order.date).local().startOf("second").fromNow()
              }}
            </span>
            <span class="order-name" v-if="order.acf['name']"
              ><Icon name="user" />{{ order.acf["name"] }}</span
            >
            <!-- <span class="order-area"><Icon name="location" />{{ area /}}</span> -->
          </div>
        </div>
        <Icon name="angle-right" />
      </RouterLink>
    </li>
  </Transition>
</template>
<style lang="scss">
.my-order-item {
  padding-bottom: 10px;
  margin-bottom: 12px;
  border-bottom: 1px solid var(--grey);
  a {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  svg {
    width: 20px;
    fill: var(--medium);
  }
  .order-meta {
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

.v-enter-active,
.v-leave-active {
  transition: opacity 0.4s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
