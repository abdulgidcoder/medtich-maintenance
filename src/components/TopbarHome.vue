<script>
import { useAuthStore } from "@/stores/useAuth.js";
import { useOrdesStore } from "@/stores/useOrders.js";

export default {
  props: { show: Boolean },
  data() {
    return {
      cities: [
        { id: "riyadh", value: "الرياض" },
        { id: "makkah", value: "مكة المكرمة" },
        { id: "almadinah", value: "المدينة المنورة" },
        { id: "alqassim", value: "القصيم" },
        { id: "eastern", value: "الشرقية" },
        { id: "aseer", value: "عسير" },
        { id: "tabuk", value: "تبوك" },
        { id: "hail", value: "حائل" },
        { id: "northern-borders", value: "الحدود الشمالية" },
        { id: "jazan", value: "جازان" },
        { id: "najran", value: "نجران" },
        { id: "albahah", value: "الباحة" },
        { id: "aljowf", value: "الجوف" },
      ],
      auth_user: this.$auth,
    };
  },
  setup() {
    const authStore = useAuthStore();
    const ordersStore = useOrdesStore();
    return { authStore, ordersStore };
  },
  methods: {
    chooseArea(data, indexArr) {
      this.authStore.updateUser({ fields: { area: data[0].id } }).then(() => {
        this.ordersStore.ftechLast(this.$auth.user_data?.acf["area"], 6);          
      });
    },
  },
};
</script>
<template>
  <TopBar class="fixed">
    <template #left>
      <div class="user-area">
        <Icon name="location" />
        <div class="contant">
          <div>منطقتك</div>
          <strong v-if="this.$auth.user_data?.acf['area'] !== null">{{ 
            $nameArea( this.$auth.user_data?.acf["area"])
          }}</strong>
          <Select
           class="btn-link"
            :data="cities"
            :onChange="chooseArea"
            v-if="this.$auth.user_data?.acf['area'] == null"
            >اختر منطقتك</Select
          >
        </div>
      </div>
    </template>
    <template #right>
      <div class="app-avatar">
        <img
          :src="this.$auth.user_data?.avatar_urls['48']"
          :alt="this.$auth.user_data?.name"
        />
      </div>
    </template>
  </TopBar>
</template>
