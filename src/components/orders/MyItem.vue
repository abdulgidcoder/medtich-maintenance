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
            <span class="order-name" v-if="order.acf['name'] &&  this.$auth.role=='technician'"
              ><Icon name="user" /><span>{{ order.acf["name"] }}</span></span
            >
              <span class="order-name"
              v-if="this.$auth.role=='customer'"
              ><Icon name="tag" />
              <span>{{
                order.acf["offers"].length
                  ? order.acf["offers"].length + " عرض"
                  : " لايوجد عروض"
              }}</span></span
            >
                <span class="order-status">
            <span
              class="app-badge"
              :class="{
                active: order.acf['status'] == 'active',
                pending: order.acf['status'] == 'pending',
                processing: order.acf['status'] == 'processing',
                completed: order.acf['status'] == 'completed',
                cancelled: order.acf['status'] == 'cancelled',
              }"
              >{{
                 order.acf["status"] == "active"
                  ? "تلقى العروض":
                    order.acf["status"] == "pending"
                  ? " قيد الانتظار ":
                  order.acf["status"] == "completed"
                  ? " اكتمل "
                  : order.acf["status"] == "processing"
                  ?  "قيد التنفيذ"
                  : order.acf["status"] == "cancelled"
                  ? " ملغى "
                  : ""
                
              }}</span
            >
          </span>
          </div>
        </div>
        <Icon name="angle-right" />
      </RouterLink>
    </li>
  </Transition>
</template>
