<script>
import { useOrdersStore } from "@/stores/useOrders.js";
import { useAlert } from "@/stores/useAlert";
import { Geolocation } from "@capacitor/geolocation";
import { Capacitor } from "@capacitor/core";
import Icon from "../Icon.vue";
import SetLocation from "../SetLocation.vue";
export default {
  components: { Icon, SetLocation },
  data() {
    return {
      order: {
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
      adding: false,
    };
  },
  setup() {
    const ordersStore = useOrdersStore();
    const errorStore = useAlert();
    return { ordersStore, errorStore };
  },
  mounted() {
    document.title = "Add Order";
    this.order.city = this.$auth.user_data.acf?.area;
    this.order.name = this.$auth.user_data.name;
    this.order.mobile = this.$auth.user_data.username;
  },
  methods: {
    pushAlert(error) {
      this.errorStore.style = "warning";
      this.errorStore.show = true;
      this.errorStore.masg = " اضاف " + error + "!";
    },
    choosecity(data, indexArr) {
      this.order.city = data[0].id;
    },
    async setCurrentLocation() {
      if (Capacitor.isNativePlatform()) {
        await Geolocation.requestPermissions();
      }
      await Geolocation.getCurrentPosition()
        .then((data) => {
          this.order.location = data.coords;
          this.errorStore.style = "success";
          this.errorStore.show = true;
          this.errorStore.masg = "تم إضافة موقعك الحالى ";
        })
        .catch(() => {
          this.errorStore.style = "danger";
          this.errorStore.show = true;
          this.errorStore.masg = "لم يتم إضافة موقعك الحالى ";
        });
    },
    handleSubmit(ele) {
      if (this.order.title.length <= 5) {
        this.pushAlert("عنوان الطلب");
      } else if (this.order.content.name <= 5) {
        this.pushAlert("الاسم");
      } else if (this.order.content.mobile <= 5) {
        this.pushAlert("الجوال");
      } else if (
        !this.order.content.email &&
        !this.order.email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
      ) {
        this.pushAlert("البريد الالكترونى");
      } else if (this.order.serial_number.length <= 5) {
        this.pushAlert("الرقم التسلسلي للجهاز");
      } else if (this.order.company.length <= 5) {
        this.pushAlert("الشركة المصنعة");
      } else if (!this.order.city) {
        this.pushAlert("المدينة");
      }
      if (!this.order.region) {
        this.pushAlert("المنطقة");
      } else if (!this.order.location) {
        this.pushAlert("عنوانك الحالى");
      } else if (this.order.content.length <= 5) {
        this.pushAlert("التفاصيل");
      } else if (!this.order.payment_gateway) {
        this.pushAlert("وسيلة الدفع");
      } else {
        this.adding = true;
        this.ordersStore
          .addOrder(this.order)
          .then(() => {
            this.errorStore.masg = "تم إضافة طلبك بنجاح";
            this.errorStore.style = "success";
            this.errorStore.show = true;
            this.adding = false;
            ele.reset();
            ele
              .querySelectorAll(
                ".app-field_input input,.app-field_input textarea"
              )
              .forEach((element) => {
                element.classList.remove("is-valid");
                element.classList.remove("is-invalid");
              });
          })
          .catch((error) => {
            ele.reset();
            ele
              .querySelectorAll(
                ".app-field_input input,.app-field_input textarea"
              )
              .forEach((element) => {
                element.classList.remove("is-valid");
                element.classList.remove("is-invalid");
              });
            this.adding = false;
            this.errorStore.style = "danger";
            this.errorStore.show = true;
            if (error.response) {
              let mesg = JSON.stringify(error.response.data.message);
              this.errorStore.masg = mesg;
            } else {
              this.errorStore.masg = error;
            }
          });
      }
    },
  },
};
</script>
<template>
  <form @submit.prevent="handleSubmit($event.target)">
    <Field
      v-model="order.title"
      type="text"
      label="عنوان الطلب"
      :required="true"
      :length="5"
    />
    <Field
      v-model="order.name"
      type="text"
      label="الاسم"
      :required="true"
      :length="5"
    />
    <Field
      v-model="order.mobile"
      type="tel"
      label="رقم الجوال"
      :required="true"
      :length="11"
    />
    <Field
      v-model="order.email"
      type="email"
      label="البريد الالكترونى"
      :required="true"
    />

    <div class="field-location">
      <div
        class="app-field text"
        style="flex-grow: 1; margin-bottom: 0; padding-left: 15px"
      >
        <label class="app-field_label"
          >المدينة<span class="required">*</span></label
        >
        <Select
          :onChange="choosecity"
          :data="this.$cities"
          class="app-select"
          >{{
            this.order.city ? $nameCity(this.order.city) : "اختار المدينة"
          }}</Select
        >
      </div>
      <SetLocation
        @setLocation="setCurrentLocation"
        :location="order.location"
      />
    </div>
    <Field
      v-model="order.region"
      type="text"
      label="المنطقة"
      placeholder="مثل: مدينة نصر, مصر الجديدة"
      :required="true"
      :length="5"
    />
    <Radio
      label="وسيلة الدفع"
      name="payment_gateway"
      v-model="order.payment_gateway"
      :required="true"
      :data="[
        { label: 'فودافون كاش', value: 'voda_cache' },
        { label: 'تحويل بنكى', value: 'bank_transfer' },
      ]"
    />
    <Field
      v-model="order.serial_number"
      type="text"
      label="الرقم التسلسلي للجهاز"
      :required="true"
      :length="5"
    />
    <Field
      v-model="order.company"
      type="text"
      label="الشركة المصنعة"
      :required="true"
      :length="5"
    />
    <Field
      v-model="order.content"
      type="textarea"
      label="تفاصيل"
      :required="true"
      :length="5"
    />

    <div class="app-fixed-bottom">
      <button
        class="btn btn-primary btn-block"
        type="submit"
        :disabled="adding"
      >
        <template v-if="!adding"><Icon name="plus" />إضافة الطلب</template>
        <template v-else>
        <Spinner class="spinner-sm" />
          إضافة...
        </template>
      </button>
    </div>
  </form>
</template>

<style lang="scss">
.field-location {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
  .app-select {
    margin-bottom: 0;
  }
  .btn {
    margin-top: 20px;
  }
}
</style>
