<script>
import { useOrdersStore } from "@/stores/useOrders.js";
import TechArrived from "./TechArrived.vue";
import ConfirmArrived from "./ConfirmArrived.vue";
import AddReport from "./Report/AddReport.vue";
import AlertInfo from "./AlertInfo.vue";
import Head from "./Head.vue";
import OrderInfo from "./OrderInfo.vue";
import CustomerInfo from "./CustomerInfo.vue";
import TechnicianInfo from "./TechnicianInfo.vue";
import OffersSection from "./Offers/OffersSection.vue";
import ReportSection from "./Report/ReportSection.vue";

export default {
  components: {
    TechArrived,
    ConfirmArrived,
    AddReport,
    AlertInfo,
    Head,
    OrderInfo,
    CustomerInfo,
    TechnicianInfo,
    OffersSection,
    ReportSection,
  },
  props: { details: Object },
  data() {
    return {
      myOrder: this.$auth.user_data?.id == this.details.acf?.technician?.ID,
    };
  },
  setup() {
    const ordersStore = useOrdersStore();
    return { ordersStore };
  },
  mounted() {
    document.title = this.details.title?.rendered;
  },
};
</script>
<template>
  <div class="app-order-details">
    <AlertInfo :data="details" />
    <Head :data="details" />
    <Card>
      <template #body>
        <div v-html="details.content?.rendered"></div>
      </template>
    </Card>
    <OrderInfo :data="details" />
    <CustomerInfo :data="details" :isMyOrder="myOrder" />
    <TechnicianInfo :data="details.acf" />
    <OffersSection :data="details" :isMyOrder="myOrder" />
    <ReportSection :data="details" />
    <div class="app-fixed-bottom">
      <TechArrived :order="details" />
      <ConfirmArrived :order="details" />
      <AddReport :order="details" />
    </div>
  </div>
</template>
