<script>
import { useOrdersStore } from "@/stores/useOrders.js";
import AddOffer from "./AddOffer.vue"; 
import OfferItem from "./OfferItem.vue";
import Chekout from './Chekout.vue';

export default {
  components: { AddOffer, OfferItem, Chekout },
  props: { details: Object },
  data() {
    return {
      myOrder:
        this.$auth.user_data?.id ==
        this.ordersStore.singleOrder?.acf?.technician,
      allowAcceptOffer: null,
     
    };
  },
  setup() {
    const ordersStore = useOrdersStore();
    return { ordersStore };
  },
  watch: {
    details() {
      this.acceptedOffer(this.details.acf?.offers);
    },
  },
  created() {
    this.acceptedOffer(this.details.acf?.offers);
  },
  methods: {
    acceptedOffer(offers) {
      if (offers) {
        offers.find((offer) => {
          this.allowAcceptOffer =
            offer.technical["ID"] === this.$auth.user_data.id ? true : false;
        });
      } else {
        this.allowAcceptOffer = false;
      }
    },
  },
};
</script>
<template>
  <div class="app-order-details">
    <Info
      mode="warning"
      msg="برجاء الدفع حتى يتم تفيذ طلبك "
      :show="this.$auth.role == 'customer' && !details.acf?.set_paid"
    />
    <Info
      mode="info"
      msg="يتم مراجعة عملية الدفع من قبل الادارة"
      :show="(details.acf['status'] == 'active' || details.acf['status'] == 'pending') && details.acf?.set_paid"
    />
    <div class="app-order-details_head">
      <h3 v-html="details.title?.rendered" class="order-title"></h3>
      <div class="order-meta">
        <span>
          <Icon name="clock" />
          <span> {{ $dateTime(details.date) }}</span>
        </span>
        <span>
          <Icon name="location" />
          <span> {{ $nameArea(details.acf?.area) }}</span>
        </span>
        <span class="order-status">
          <span
            class="app-badge"
            :class="{
              active: details.acf['status'] == 'active',
              pending: details.acf['status'] == 'pending',
              processing: details.acf['status'] == 'processing',
              completed: details.acf['status'] == 'completed',
              cancelled: details.acf['status'] == 'cancelled',
            }"
            >{{
              details.acf["status"] == "active"
                ? "تلقى العروض"
                : details.acf["status"] == "pending"
                ? "فى انتظار الدفع "
                : details.acf["status"] == "completed"
                ? " اكتمل "
                : details.acf["status"] == "processing"
                ? "قيد التنفيذ"
                : details.acf["status"] == "cancelled"
                ? " ملغى "
                : ""
            }}</span
          >
        </span>
      </div>
    </div>
    <Card>
      <template #body>
        <div v-html="details.content?.rendered"></div>
      </template>
    </Card>
    <Card>
      <template #title> تفاصيل الطلب </template>
      <template #body>
        <ul class="order-details">
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
      </template>
    </Card>

    <Card v-if="myOrder">
      <template #title>بيانات العميل</template>
      <template #body>
        <ul class="order-details">
          <li>
            <strong>الاسم</strong>
            <p>{{ details.acf?.name }}</p>
          </li>
          <li>
            <strong>الهاتف</strong>
            <p>{{ details.acf?.mobile }}</p>
          </li>
        </ul>
      </template>
    </Card>

    <Card v-if="details.acf?.offers">
      <template #title>العروض</template>
      <template #body>
        <ul class="order-offers">
          <OfferItem
            v-for="(offer, index) in details.acf?.offers"
            :key="index"
            :offer="offer"
            :acceptTech="details.acf?.technician"
            :orderID="details.id"
          />
        </ul>
      </template>
    </Card>
    <div class="app-fixed-bottom">
      <AddOffer
        v-if="!allowAcceptOffer && !myOrder && this.$auth.role == 'technician'"
        :orderID="details.id"
      />
      <Chekout
        v-if="this.$auth.role == 'customer' && !details.acf?.set_paid"
      :order="details"
      />
      <RouterLink
        v-if="
          details.acf['status'] == 'completed' &&
          this.$auth.role == 'technician'
        "
        style="margin-left: 15px"
        class="btn btn-danger"
        :to="{
          name: 'add-report',
          params: { orderId: details.id },
        }"
        >إضافة تقرير</RouterLink
      >
   
      <a
        class="btn btn-outline-primary"
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

