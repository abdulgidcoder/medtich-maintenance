<script>
import { useOrdersStore } from "@/stores/useOrders.js";
export default {
  props: {
    order: Object,
  },
  setup() {
    const ordersStore = useOrdersStore();
    return { ordersStore };
  },
  methods: {},
};
</script>
<template>
  <Transition name="fade">
    <li class="order-item">
      <RouterLink
        :to="{
          name: 'single-order',
          params: { id: order.id },
        }"
      >
        <h4>
          {{ order.title.rendered }}
        </h4>
        <div class="order-bottom">
          <div class="order-meta">
            <span class="order-date">
              <Icon name="calendar" />
              <span>{{ $dateTime(order.date) }}</span>
            </span>
            <span class="order-name" v-if="order.acf['offers']"
              ><Icon name="tag" />
              <span>{{ order.acf["offers"].length + " عرض" }}</span></span
            >
          </div>
        </div>
      </RouterLink>
    </li>
  </Transition>
</template>
