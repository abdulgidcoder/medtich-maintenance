<script>
import { useOrdersStore } from "@/stores/useOrders.js";
import { useAlert } from "@/stores/useAlert";
import { useMediaStore } from "@/stores/useMedia";
import PaymentGateway from "@/layouts/PaymentGateway.vue";
export default {
  components: { PaymentGateway },
  props: {
    report: Object,
    order: Object,
  },
  emits: ["onDismiss"],
  data() {
    return {
      isOpened: false,
      checkout: {
        payment_date: new Date().toUTCString(),
        payment_gateway: "bank_transfer",
        payment_price: "",
        payment_image: "",
      },
      images: [],
      uploadig: false,
      loading: false,
    };
  },
  mounted() {
    this.checkout.payment_price = this.report?.expected_cost;
  },
  setup() {
    const alertStore = useAlert();
    const ordersStore = useOrdersStore();
    const mediaStore = useMediaStore();
    return { alertStore, ordersStore, mediaStore };
  },
  methods: {
    dismissModal() {
      this.$emit("onDismiss");
      this.isOpened = false;
    },
    pushAlert(error) {
      this.alertStore.style = "warning";
      this.alertStore.show = true;
      this.alertStore.masg = " اختر " + error + "!";
    },
    async uploadFiles(input) {
      this.uploadig = true;
      const files = input.target.files;
      await this.mediaStore.upload(files).then((response) => {
        this.uploadig = false;
        for (let i = 0; i < response.length; i++) {
          this.images.push(response[i].src);
          this.checkout.payment_image = response[i].id;
        }
      });
    },
    accept() {
      if (!this.checkout.payment_gateway) {
        this.pushAlert("وسيلة الدفع");
      } else if (!this.checkout.payment_image) {
        this.pushAlert("صورة التحويل");
      } else {
        this.loading = true;
        this.ordersStore
          .acceptReport(this.order.id, this.checkout)
          .then(() => {
            this.loading = false;
            this.isOpened = false;
            this.$emit("onDismiss");
          })
          .catch(() => {
            this.loading = false;
            this.isOpened = false;
            this.$emit("onDismiss");
          });
      }
    },
  },
};
</script>

<template>
  <template
    v-if="
      this.$auth.role == 'customer' &&
      report?.needs_replacement_parts &&
      !report?.payment_date &&
      order?.acf.status == 'processing' &&
      !order?.acf.report_payment_confirm
    "
  >
    <button class="btn btn-primary btn-sm" @click="this.isOpened = true">
      قبول عرض المتخصص
    </button>
    <Modal
      class="bottom modal-accept-report"
      :show="isOpened"
      animation="fadeUp"
      @dismiss="dismissModal"
    >
      <div class="head">
        <h3 class="text-center">
          {{ "هل تريد قبول عرض " + order?.acf?.technician.display_name + " ؟" }}
        </h3>
        <p class="text-center">قم بتحويل التكلفة اولاََ حتى يتم تنفذ الطلب</p>
      </div>
      <form @submit.prevent="accept">
        <Field
          label="التكلفة"
          v-model="checkout.payment_price"
          type="number"
          append="جنية"
          required
          readonly
        />
        <Radio
          label="وسيلة الدفع"
          name="payment_gateway"
          v-model="checkout.payment_gateway"
          :required="true"
          :data="this.$paymentGateways"
        />
        <PaymentGateway :payment_gateway="checkout.payment_gateway" />
        <File
          @change="uploadFiles"
          label="رفع  صور التحويل"
          accept="image/png, image/jpeg"
          :uploadig="uploadig"
        />
        <Gellary :images="images" />
        <div class="form-actions">
          <button class="btn btn-sm btn-primary" type="submit">
            <template v-if="!loading">قبول</template>
            <template v-else> <Spinner class="spinner-sm" />قبول...</template>
          </button>
          <button
            class="btn btn-sm btn-secondary"
            @click="dismissModal"
            type="button"
          >
            الغاء
          </button>
        </div>
      </form>
    </Modal>
  </template>
</template>
<style lang="scss">
.modal-accept-report {
  .head {
    margin-bottom: 25px;
  }
  .payment-gateway-info {
    margin-bottom: 25px;
  }
}
</style>
