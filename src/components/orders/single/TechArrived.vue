<script>
import { useOrdersStore } from "@/stores/useOrders.js";
import { useAlert } from "@/stores/useAlert";
import { Geolocation } from "@capacitor/geolocation";
import { Capacitor } from "@capacitor/core";

export default {
  props: {
    order: Object,
  },
  data() {
    return {
      isMyOrder: this.$auth.user_data?.id == this.order.acf?.technician?.ID,
      Modal: false,
      send: false,
      arrived: {
        date: new Date().toLocaleString(),
        location: "",
      },
    };
  },
  setup() {
    const ordersStore = useOrdersStore();
    const errorStore = useAlert();
    return { ordersStore, errorStore };
  },
  methods: {
    async TechArrived() {
      this.send = true;
      if (Capacitor.isNativePlatform()) {
        await Geolocation.requestPermissions();
      }
      await Geolocation.getCurrentPosition()
        .then((data) => {
          this.arrived.location = data.coords;
          this.ordersStore
            .TechArrived(this.order.id, this.arrived)
            .then(() => {
              this.send = false;
              this.Modal = false;
            })
            .catch(() => {
              this.send = false;
              this.Modal = false;
            });
        })
        .catch(() => {
          this.errorStore.style = "danger";
          this.errorStore.show = true;
          this.errorStore.masg = "لم يتم إضافة موقعك تاكد من فتح تحديد الموقع";
        });
    },
  },
};
</script>

<template>
  <template
    v-if="
      isMyOrder &&
      order.acf['status'] == 'processing' &&
      !order.acf?.technician_arrived.date
    "
  >
    <button @click="this.Modal = true" class="btn btn-primary">
      تسجيل وصول
    </button>
    <Modal
      class="bottom modal-chechin-order"
      :show="Modal"
      animation="fadeUp"
      @closeModal="this.Modal = false"
    >
      <h2>تسجيل وصول</h2>
      <p>يجب تسجل وصولك عن العميل</p>
      <p>تاكد من فتح تحديد المواقع اولاَ</p>
      <div class="form-actions">
        <button
          class="btn btn-primary btn-sm"
          type="submit"
          :disabled="send"
          @click="TechArrived"
        >
          <template v-if="!send">تسجيل</template>
          <template v-else> <Spinner class="spinner-border-sm" />تسجيل...</template>
        </button>
        <button class="btn btn-sm" type="button" @click="this.Modal = false">
          إلغاء
        </button>
      </div>
    </Modal>
  </template>
</template>

<style lang="scss" scoped>
.modal-chechin-order {
  h2 {
    text-align: center;
    margin-bottom: 25px;
  }
  p {
    text-align: center;
  }
  .btn-close {
    margin-top: 55px;
  }
}
</style>
