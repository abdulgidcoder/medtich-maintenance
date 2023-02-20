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
        this.ordersStore.ftechOrders(data[0].id, 1, 6);
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
          <div>Your Area</div>
          <strong v-if="auth_user.user_data?.acf['area'] !== null">{{ 
            $nameArea( auth_user.user_data?.acf["area"])
          }}</strong>
          <Select
            :data="cities"
            :onChange="chooseArea"
            v-if="auth_user.user_data?.acf['area'] == null"
            >Choose Area</Select
          >
        </div>
      </div>
    </template>
    <template #right>
      <div class="app-avatar">
        <img
          :src="auth_user.user_data?.avatar_urls['48']"
          :alt="auth_user.user_data?.name"
        />
      </div>
    </template>
  </TopBar>
</template>
