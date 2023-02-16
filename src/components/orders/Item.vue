<script>
import moment from "moment";
import { useOrdesStore } from "@/stores/useOrders.js";
export default {
  props: {
    id_items: Number,
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
  setup() {
    const ordersStore = useOrdesStore();
    return { ordersStore };
  },
  methods: {
    accept(id, ele) {
      ele.disabled = true;
      ele.innerHTML =
        "<span class='spinner-border spinner-border-sm' role='status' aria-hidden='true'></span> Loading...";
      this.ordersStore.acceptOrders(id, this.$auth.user_data.id).then((responseOrder) => { 
        ele.innerHTML = "Accept";
        ele.disabled = false; 
      });
    },
  },
};
</script>
<template>
  <Transition>
    <li class="order-item">
      <h4>{{ title }}</h4>
      <div class="order-bottom">
        <div class="order-meta">
          <span class="order-date">
            <Icon name="clock" />
            {{ moment.parseZone(date).local().startOf("second").fromNow() }}
          </span>
          <span class="order-name" v-if="name"
            ><Icon name="user" />{{ name }}</span
          >
          <!-- <span class="order-area"><Icon name="location" />{{ area /}}</span> -->
        </div>
        <button
          @click="accept(id_items,$event.target)"
          class="btn btn-sm btn-primary"
          v-if="$auth.user_data.acf['status'] == 'active'"
        >
          Accept
        </button>
      </div>
    </li>
  </Transition>
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
  .order-bottom {
    display: flex;
    justify-content: space-between;
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
