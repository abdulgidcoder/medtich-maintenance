<script>
import { useOrdesStore } from "@/stores/useOrders.js";
export default {
  props: {
    order: Object,
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
              <span> {{ $dateTime(order.date) }}</span>
            </span>
            <span class="order-name" v-if="order.acf['name']"
              ><Icon name="user" /><span>{{ order.acf["name"] }}</span></span
            >
            <span class="order-area"
              ><Icon name="location" /><span>{{
                $nameArea(order.acf["area"])
              }}</span></span
            >
          </div>
        </div>
        <Icon name="angle-right" />
      </RouterLink>
    </li>
  </Transition>
</template>
