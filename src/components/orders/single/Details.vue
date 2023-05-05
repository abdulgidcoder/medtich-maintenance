<script>
import { useOrdersStore } from "@/stores/useOrders.js";
import AddOffer from "./AddOffer.vue";
import OfferItem from "./OfferItem.vue";
import Chekout from "./Chekout.vue";
import TechArrived from "./TechArrived.vue";
import ConfirmArrived from "./ConfirmArrived.vue";
import AddReport from "./AddReport.vue";

export default {
  components: {
    AddOffer,
    OfferItem,
    Chekout,
    TechArrived,
    ConfirmArrived,
    AddReport,
  },
  props: { details: Object },
  data() {
    return {
      myOrder: this.$auth.user_data?.id == this.details.acf?.technician,
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
    document.title = this.details.title?.rendered;
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
      :show="
        (details.acf['status'] == 'active' ||
          details.acf['status'] == 'pending') &&
        details.acf?.set_paid &&
        this.$auth.role == 'customer'
      "
    />
    <div class="app-order-details_head"> 
      <h3 class="order-title">{{ details.title?.rendered }}</h3>
      <div class="order-meta">
        <span>
          <Icon name="clock" />
          <span> {{ $dateTime(details.date) }}</span>
        </span>
        <span>
          <Icon name="location" />
          <span> {{ $nameCity(details.acf?.city) }}</span>
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
      <template #head> تفاصيل الطلب </template>
      <template #body>
        <ul class="order-details">
          <li>
            <strong>المنطقة</strong>
            <p>{{ details.acf?.region }}</p>
          </li>
          <li>
            <strong>الرقم التسلسلي للجهاز</strong>
            <p>{{ details.acf?.serial_number }}</p>
          </li>
          <li>
            <strong>الشركة المصنعة</strong>
            <p>{{ details.acf?.company }}</p>
          </li>
          <li v-if="details.acf?.technician">
            <strong>وصول الفنى</strong>
            <p>
              <span
                class="app-badge"
                :class="{
                  completed: details.acf?.technician_arrived.date,
                  cancelled: !details.acf?.technician_arrived.date,
                }"
                style="margin-left: 10px"
                >{{ details.acf?.technician_arrived.date ? "نعم" : "لا" }}</span
              >
              <template v-if="details.acf?.technician_arrived.date"
                >{{ $dateTime(details.acf?.technician_arrived.date) }}
              </template>
            </p>
          </li>
          <li v-if="details.acf?.technician">
            <strong>تاكيد وصول الفنى</strong>
            <p>
              <span
                class="app-badge"
                :class="{
                  completed: details.acf?.confirm_technician_arrived,
                  cancelled: !details.acf?.confirm_technician_arrived,
                }"
                style="margin-left: 10px"
                >{{
                  details.acf?.confirm_technician_arrived ? "نعم" : "لا"
                }}</span
              >
              <template v-if="details.acf?.confirm_technician_arrived"
                >{{ $dateTime(details.acf?.confirm_technician_arrived) }}
              </template>
            </p>
          </li>
        </ul>
      </template>
    </Card>
    <Card v-if="myOrder || this.$auth.role == 'customer'">
      <template #title>بيانات العميل</template>
      <template #body>
        <ul class="order-details">
          <li>
            <strong>الاسم</strong>
            <p>{{ details.acf?.name }}</p>
          </li>
          <li>
            <strong>البريد الالكترونى</strong>
            <p>{{ details.acf?.email }}</p>
          </li>
          <li>
            <strong>الهاتف</strong>
            <p>
              <a
                :href="'tel:' + details.acf?.mobile"
                class="btn btn-outline-primary btn-sm"
              >
                <Icon name="phone" />اتصل الان</a
              >
            </p>
          </li>
          <li>
            <strong>الموقع على الخريطة</strong>
            <a
              class="btn btn-outline-primary btn-sm"
              target="_blank"
              :href="
                'https://www.google.com/maps/dir/?api=1&origin=&destination=' +
                details.acf?.latitude +
                ',' +
                details.acf?.longitude
              "
            >
              <Icon name="location-crosshairs" />تتبع الموقع
            </a>
          </li>
        </ul>
      </template>
    </Card>
    <Card>
      <template #title>العروض</template>
      <template #actions>
        <AddOffer
          v-if="
            !allowAcceptOffer && !myOrder && this.$auth.role == 'technician'
          "
          :orderID="details.id"
        />
      </template>
      <template #body>
        <EmptyContent
          title="لا يوجد اى عروض"
          :iconsSize="100"
          v-if="!details.acf?.offers"
        />
        <ul class="order-offers" v-if="details.acf?.offers">
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

    <Card v-if="details.acf?.report?.date">
      <template #title>التقرير</template>
      <template #body>
        <ul class="report-details">
          <li>
            <strong>يحتاج إلى قطع غيار</strong>
            <p>
              <span
                class="app-badge"
                :class="{
                  completed:
                    details.acf?.report?.needs_replacement_parts == true,
                  cancelled:
                    details.acf?.report?.needs_replacement_parts == false,
                }"
                >{{
                  details.acf?.report?.needs_replacement_parts == true
                    ? "نعم"
                    : "لا"
                }}</span
              >
            </p>
          </li>
          <li v-if="details.acf?.report.expected_cost">
            <strong>التكلفة المتوقعة</strong>
            <p>{{ details.acf?.report.expected_cost + " جنية" }}</p>
          </li>
          <li v-if="details.acf?.report.expected_time">
            <strong>الوقت المتوقع لحل المشكلة</strong>
            <p>{{ details.acf?.report.expected_time + " يوم" }}</p>
          </li>
        </ul>
        <p v-html="details.acf?.report.details"></p>
        <div class="app-gallery" v-if="details.acf?.report.images != 0">
          <div
            class="col"
            v-for="item in details.acf?.report.images"
            :key="item"
          >
            <div class="image">
              <img :src="item.sizes.thumbnail" :alt="item.filename" />
            </div>
          </div>
        </div>
      </template>
    </Card>
    <div class="app-fixed-bottom">
      <Chekout :order="details" />
      <TechArrived :order="details" />
      <ConfirmArrived :order="details" />
      <AddReport :order="details" />
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
    </div>
  </div>
</template>
