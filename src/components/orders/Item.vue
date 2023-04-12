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
  methods: {
    
  },
};
</script>
<template>
  <Transition name="fade">
    <li class="order-item">
      <h4>
        <RouterLink
          :to="{
            name: 'single-order',
            params: { id: order.id },
          }"
          >{{ order.title.rendered }}</RouterLink
        >
      </h4>
      <div class="order-bottom">
        <div class="order-meta">
          <span class="order-date">
            <Icon name="calendar" />
            <span>{{ $dateTime(order.date) }}</span>
          </span>
          <!-- <span class="order-name" v-if="order.acf['name']"
            ><Icon name="user" /> <span>{{ order.acf["name"] }}</span></span
          > -->
        </div> 
      </div>
    </li>
  </Transition>
</template>
