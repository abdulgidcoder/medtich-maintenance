<script>
import { useAuthStore } from "@/stores/useAuth.js";
import { useOrdesStore } from "@/stores/useOrders.js";

export default {
  props: { show: Boolean },
  data() {
    return {
      cities: [
     	{ id: "cairo", value: "القاهرة" },
		{ id: "giza", value: "الجيزة" },
		{ id: "alexandria", value: "الأسكندرية" },
		{ id: "dakahlia", value: "الدقهلية" },
		{ id: "red-sea", value: "البحر الأحمر" },
		{ id: "beheira", value: "البحيرة" },
		{ id: "fayoum", value: "الفيوم" },
		{ id: "gharbiya", value: "الغربية" },
		{ id: "ismailia", value: "الإسماعلية" },
		{ id: "menofia", value: "المنوفية" },
		{ id: "minya", value: "المنيا" },
		{ id: "qaliubiya", value: "القليوبية" },
		{ id: "new-valley", value: "الوادي الجديد" },
		{ id: "suez", value: "السويس" },
		{ id: "aswan", value: "اسوان" },
		{ id: "assiut", value: "اسيوط" },
		{ id: "beni-suef", value: "بني سويف" },
		{ id: "port-said", value: "بورسعيد" },
		{ id: "damietta", value: "دمياط" },
		{ id: "sharkia", value: "الشرقية" },
		{ id: "south-sinai", value: "جنوب سيناء" },
		{ id: "kafr-al-sheikh", value: "كفر الشيخ" },
		{ id: "matrouh", value: "مطروح" },
		{ id: "luxor", value: "الأقصر" },
		{ id: "qena", value: "قنا" },
		{ id: "nort-sinai", value: "شمال سيناء" },
		{ id: "sohag", value: "سوهاج" }
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
          <strong v-if="this.$auth.user_data?.acf['area']">{{ 
            $nameArea( this.$auth.user_data?.acf["area"])
          }}</strong>
          <Select
           class="btn-link"
            :data="cities"
            :onChange="chooseArea"
            v-else="this.$auth.user_data?.acf['area']"
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
