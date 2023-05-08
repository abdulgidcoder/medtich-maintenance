<script>
import { useOrdersStore } from "@/stores/useOrders.js";
import { useAlert } from "@/stores/useAlert";
import { defineAsyncComponent } from "vue";

export default {
  components: {
    AddForm: defineAsyncComponent(() =>
      import("@/components/orders/AddForm.vue")
    ),
  },
  props: ["order", "loaded"],
  data() {
    return {
      orderData: this.order,
      Modal: false,
      send: false,
      newOrder: {
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
      },
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
  <template v-if="this.$auth.role == 'customer'">
    <div class="app-fab app-fab-main">
      <button class="app-fab-toogle" @click="this.Modal = true">
        <Icon name="cart-pulse" />
      </button>
    </div>
    <Modal
      class="page"
      :show="Modal"
      animation="fadeUp"
      @closeModal="this.Modal = false"
    >
      <Head title="إضافة طلب جديد">
        <template #left>
          <button
            @click="this.Modal = false"
            class="app-btn-back"
            type="button"
          >
            <Icon name="times" />
          </button>
        </template>
      </Head>
      <Content :isBoxed="true" :notBottom="false">
        <add-form />
      </Content>
    </Modal>
  </template>
</template>
