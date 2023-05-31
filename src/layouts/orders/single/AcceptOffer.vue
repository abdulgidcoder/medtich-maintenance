<script>
import { useOrdersStore } from "@/stores/useOrders.js";
import { useAlert } from "@/stores/useAlert";
import { useMediaStore } from "@/stores/useMedia";
export default {
  props: {
    offer: Object,
    order: Object,
  },
  emits: ["onDismiss"],
  data() {
    return {
      isOpened: false,
      gateways: [
        {
          label: "فودافون كاش",
          value: "voda_cache",
          number: "010123456789",
        },
        {
          label: "تحويل بنكى",
          value: "bank_transfer",
          number: "1001215151515",
        },
      ],
      checkout: {
        payment_date: new Date().toUTCString(),
        payment_gateway: "",
        order_price: this.offer.price,
        payment_image: "",
      },
      images: [],
      uploadig: false,
      loading: false,
    };
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
        this.alertStore.masg = "تم رفع الصور";
        this.alertStore.style = "success";
        this.alertStore.show = true;
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
          .acceptOffer(this.offer.technical.ID, this.order.id, this.checkout)
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
  <li
    @click="
      () => {
        this.isOpened = true;
      }
    "
  >
    <Icon name="check-circle-alt" /> قبول عرض الفنى
  </li>
  <Modal
    class="bottom modal-accept-offer"
    :show="isOpened"
    animation="fadeUp"
    @dismiss="dismissModal"
  >
    <div class="head">
      <h3 class="text-center">
        {{ "هل تريد قبول عرض " + offer.technical.display_name + " ؟" }}
      </h3>
      <p class="text-center">قم بتحويل قيمة العرض اولاََ حتى يتم تنفذ الطلب</p>
    </div>
    <!-- <div dir="ltr">{{ checkout }}</div> -->
    <form @submit.prevent="accept">
      <Field
        label="قيم العرض"
        v-model="checkout.order_price"
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
        :data="gateways"
      />
      <div class="payment-gateway-info" v-if="checkout.payment_gateway">
        <div v-for="pay in gateways" :key="pay.value">
          <Transition name="fade">
            <template v-if="checkout.payment_gateway == pay.value">{{
              "رقم " + pay.label + ": " + pay.number
            }}</template>
          </Transition>
        </div>
      </div>
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
        <button class="btn btn-sm btn-secondary" @click="dismissModal" type="button">
          الغاء
        </button>
      </div>
    </form>
  </Modal>
</template>
<style lang="scss">
.modal-accept-offer {
  .head {
    margin-bottom: 25px;
  }
  .payment-gateway-info {
    margin-bottom: 25px;
  }
}
</style>
