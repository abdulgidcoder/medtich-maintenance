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
    accept(order, ele) {
      ele.disabled = true;
      ele.innerHTML =
        "<span class='spinner-border spinner-border-sm' role='status' aria-hidden='true'></span> قبول...";
      this.ordersStore.acceptOrders(order, this.$auth.user_data.id).then(() => {
        ele.innerHTML = "قبول";
        ele.disabled = false;
      });
    }, 
  },
};
</script>
<template>
  <Transition name="fade">
    <li class="order-item">
      <h4>{{ order.title.rendered }}</h4>
      <div class="order-bottom">
        <div class="order-meta">
          <span class="order-date">
            <Icon name="calendar" />
            <span>{{ $dateTime(order.date) }}</span>
          </span>
          <span class="order-name" v-if="order.acf['name']"
            ><Icon name="user" /> <span>{{ order.acf["name"] }}</span></span
          >
        </div>
        <button
          @click="accept(order, $event.target)"
          class="btn btn-sm btn-primary"
          v-if="$auth.user_data.acf['status'] == 'active'"
        >
          قبول
        </button>
      </div>
    </li>
  </Transition>
</template>
