<script>
import { useOrdesStore } from "@/stores/useOrders.js";

export default {
  props: { details: Object },
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
        window.location.reload();
      });
    },
    cancel(order, ele) {
      ele.disabled = true;
      ele.innerHTML =
        "<span class='spinner-border spinner-border-sm' role='status' aria-hidden='true'></span> إلغاء...";
      this.ordersStore.cancelOrders(order).then(() => {
        ele.innerHTML = "إلغاء";
        ele.disabled = false;
        this.$router.push({name:"home"})
      });
    },
  },
};
</script>
<template>
  <div class="app-order-details">
    <div class="app-order-details_head">
      <h3 v-html="details.title?.rendered" class="order-title"></h3>
      <button
        @click="cancel(this.details, $event.target)"
        class="btn btn-sm btn-danger"
        v-if="$auth.user_data.acf['status'] == 'active' && this.$auth.user_data?.id === details.acf?.technician"
         
      >
        إلغاء
      </button>
     <button
          @click="accept(this.details, $event.target)"
          class="btn btn-sm btn-primary"
          v-if="$auth.user_data.acf['status'] == 'active' && !details.acf?.technician"
        >
          قبول
        </button>
    </div>
    <div class="order-meta">
      <span>
        <Icon name="clock" />
        <span> {{ $dateTime(details.date) }}</span>
      </span>
    </div>
    <ul class="order-details">
      <li v-if="this.$auth.user_data?.id === details.acf?.technician">
        <strong>الاسم</strong>
        <p>{{ details.acf?.name }}</p>
      </li>
      <li v-if="this.$auth.user_data?.id === details.acf?.technician">
        <strong>الهاتف</strong>
        <p>{{ details.acf?.mobile }}</p>
      </li>
      <li v-if="this.$auth.user_data?.id === details.acf?.technician">
        <strong>البريد الالكترونى</strong>
        <p>{{ details.acf?.email }}</p>
      </li>
      <li>
        <strong>المنطقة</strong>
        <p>{{ $nameArea(details.acf?.area) }}</p>
      </li>
      <li>
        <strong>التاريخ</strong>
        <p>{{ details.acf?.date }}</p>
      </li>
      <li>
        <strong>الرقم التسلسلي للجهاز</strong>
        <p>{{ details.acf?.serial_number }}</p>
      </li>
      <li>
        <strong>الشركة المصنعة</strong>
        <p>{{ details.acf?.company }}</p>
      </li>
    </ul>
    <div class="order-content">
      <strong>تفاصيل</strong>
      <div v-html="details.content?.rendered"></div>
    </div>
    <div class="app-fixed-bottom">
      <a
        class="btn btn-primary btn-lg btn-block"
        target="_blank"
        :href="
          'https://www.google.com/maps/dir/?api=1&origin=&destination=' +
          details.acf?.latitude +
          ',' +
          details.acf?.longitude
        "
      >
        <Icon name="location-crosshairs" />تتبع الموقع على الخريطة
      </a>
    </div>
  </div>
</template>
<style lang="scss">
.app-order-details {
  .order-title {
    margin-bottom: 3px;
  }
  &_head {
    display: flex;
    justify-content: space-between;
    .order-title {
      padding-left: 15px;
    }
  }
  .order-meta {
    font-size: 14px;
    margin-bottom: 20px;
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
  .order-details {
    li {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid var(--bg-grey-2);
      padding-bottom: 10px;
      margin-bottom: 10px;
      p {
        margin: 0;
      }
    }
  }
  .order-content {
    strong {
      margin-bottom: 10px;
      display: block;
    }
  }
}
</style>
