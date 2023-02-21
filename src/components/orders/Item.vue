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
  methods: {
    accept(order, ele) {
      ele.disabled = true;
      ele.innerHTML =
        "<span class='spinner-border spinner-border-sm' role='status' aria-hidden='true'></span> Accepting...";
      this.ordersStore.acceptOrders(order, this.$auth.user_data.id).then(() => {
        ele.innerHTML = "Accept";
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
        <button
          @click="accept(order, $event.target)"
          class="btn btn-sm btn-primary"
          v-if="$auth.user_data.acf['status'] == 'active'"
        >
          Accept
        </button>
      </div>
    </li>
  </Transition>
</template>
