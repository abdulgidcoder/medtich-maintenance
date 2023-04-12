<script>
import { useOrdesStore } from "@/stores/useOrders.js";
import AddOffer from "./AddOffer.vue";

export default {
  components: { AddOffer },
  props: { details: Object },
  data() {
    return {
      myOrder:
        this.$auth.user_data?.id ==
        this.ordersStore.singleOrder?.acf?.technician,
      allowAddOffer: null,
    };
  },
  setup() {
    const ordersStore = useOrdesStore();
    return { ordersStore };
  },
  watch:{
    details(){
          this.allowOffer(this.details.acf?.offers);
    }
  },
  created() {
    this.allowOffer(this.details.acf?.offers);
  },
  methods: {
    allowOffer(offers) {
      if (offers) {
        offers.find((offer) => {
          this.allowAddOffer =
            offer.technical["ID"] === this.$auth.user_data.id ? false : true;
        });
      } else {
        this.allowAddOffer = true;
      }
    },
  },
};
</script>
<template>
  <div class="app-order-details">
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
        <ul>
          <li v-for="(offer, index) in details.acf?.offers" :key="index">
            <strong>{{
              offer.technical.display_name + " --  " + offer.price
            }}</strong>
            <div v-html="offer.technical.user_avatar"></div>
            <div>{{ $dateTime(offer.date) }}</div>
            <p>{{ offer.details }}</p>
          </li>
        </ul>
      </template>
    </Card>
    <div class="app-fixed-bottom">
      <AddOffer v-if="allowAddOffer && !myOrder" :orderID="details.id" />
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
