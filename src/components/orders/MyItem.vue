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
              <Icon name="calendar" />
              {{
                moment.parseZone(order.date).local().startOf("second").fromNow()
              }}
            </span>
            <span class="order-name" v-if="order.acf['name']"
              ><Icon name="user" />{{ order.acf["name"] }}</span
            >
            <span class="order-area"><Icon name="location" />{{ $nameArea(order.acf["area"]) }}</span>
          </div>
        </div>
        <Icon name="angle-right" />
      </RouterLink>
    </li>
  </Transition>
</template> 