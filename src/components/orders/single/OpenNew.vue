<script>
import { useOrdersStore } from "@/stores/useOrders.js";
import { useAlert } from "@/stores/useAlert";
export default {
  props: ["order", "loaded"],
  data() {
    return {
      orderData: this.order,
      Modal: false,
      send: false,
      newOrder:  {
        title: "",
        name: "",
        mobile: "",
        email: "",
        city: "",
        region: "",
        date: "",
        serial_number: "",
        company: "",
        content: "",
        payment_gateway: "",
        location: {},
      }
    };
  },
  setup() {
    const ordersStore = useOrdersStore();
    const errorStore = useAlert();
    return { ordersStore, errorStore };
  },
  watch: {},
  created() {},
  methods: {
    async handleSubmit() {
      this.send = true;
      // this.ordersStore
      //   .changeSetting(this.order.id, this.status)
      //   .then(() => {
      //     this.send = false;
      //     this.Modal = false;
      //   })
      //   .catch(() => {
      //     this.send = false;
      //     this.Modal = false;
      //   });
    },
  },
};
</script>
<template>
  <template v-if="this.$auth.role == 'customer' && order.acf?.report?.date && order.acf['status'] == 'completed' ">
    <Skeleton v-if="loaded" width="34px" height="34px" />
    <button v-else @click="this.Modal = true" class="btn btn-black btn-sm">
      <Icon name="plus" />طلب جديد
    </button>
    <Modal
      class="bottom modal-chechin-order"
      :show="Modal"
      animation="fadeUp"
      @closeModal="this.Modal = false"
    >
    <div class="text-center">
      <h2 class="text-center">انشاء طلب جديد</h2>
      <p class="text-center">يمكنك انشاء طلب صيانة جديد مع نفس الفنى</p> 
      <div class="app-avatar" v-html="order.acf?.technician?.user_avatar"></div>
      <h3>{{ order.acf?.technician?.display_name }}</h3>
    </div>

      <div class="form-actions">
        <button
          class="btn btn-primary btn-sm"
          type="submit"
          :disabled="send"
          @click="handleSubmit"
        >
          <template v-if="!send">تغير</template>
          <template v-else>
            <span
              class="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
            تغير...
          </template>
        </button>
        <button class="btn btn-sm" type="button" @click="this.Modal = false">
          إلغاء
        </button>
      </div>
    </Modal>
  </template>
</template>
