<script>
import { useOrdersStore } from "@/stores/useOrders.js";
import { useAlert } from "@/stores/useAlert";

import axios from "axios";
export default {
  props: {
    order: Object,
  },
  data() {
    return {
      Modal: false,
      send: false,
      report: {
        replacement_parts: false,
        date:  new Date().toLocaleString(),
        expected_cost: "",
        expected_time: "",
        technical: this.$auth.user_data.id,
        details: "",
        images: [],
      },
      gallery: [],
    };
  },
  setup() {
    const ordersStore = useOrdersStore();
    const alertStore = useAlert();
    return { ordersStore, alertStore };
  },
  watch: {},
  methods: {
    pushAlert(error) {
      this.alertStore.style = "warning";
      this.alertStore.show = true;
      this.alertStore.masg = " اضاف " + error + "!";
    },
    async uploadFiles(input) {
      input.target.nextSibling.children[1].innerHTML =
        "<span class='spinner-border spinner-border-sm'></span>تحميل ...";
      const files = input.target.files;
      const formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        formData.append(`file[${i}]`, files[i]);
      }
      const response = await axios({
        method: "post",
        url: "wp-json/app/v1/files",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Content-Type": "multipart/form-data",
        },
        data: formData,
      })
        .then((response) => {
          for (let i = 0; i < response.data.length; i++) {
            this.gallery.push(response.data[i].src);
            this.report.images.push(response.data[i].id);
          }
          input.target.nextSibling.children[1].innerHTML = "رفع صور";
        })
        .catch((error) => {
          input.target.nextSibling.children[1].innerHTML = "رفع صور";
        });
    },
    addreport(ele) {
      if (
        this.report.replacement_parts &&
        this.report.expected_time.length + 1 <= 1
      ) {
        this.pushAlert("الوقت المتوقع لحل المشكلة");
      } else if (
        this.report.replacement_parts &&
        this.report.expected_cost.length + 1 <= 2
      ) {
        this.pushAlert("التكلفة المتوقعة");
      } else if (this.report.details.length + 1 <= 5) {
        this.pushAlert("تفاصيل التقرير");
      } else if (this.report.images.length + 1 <= 1) {
        this.pushAlert("صور");
      } else {
        this.send = true;
        this.ordersStore.addReport(this.order.id, this.report).then(() => {
          this.send = false;
          this.Modal = false;
        });
      }
    },
  },
};
</script>
<template>
  <template
    v-if="
      order.acf['status'] == 'processing' &&
      this.$auth.role == 'technician' &&
      order.acf?.confirm_technician_arrived &&
      order.acf?.technician_arrived.date &&
      !order.acf?.report.date
    "
  >
    <button @click="this.Modal = true" class="btn btn-danger">
      إضافة تقرير
    </button>
    <Modal class="bottom header" :show="Modal" animation="fadeUp">
      <form @submit.prevent="addreport($event.target)">
        <Head title="إضافة تقرير">
          <template #left>
            <button
              @click="this.Modal = false"
              class="app-btn-back"
              type="button"
            >
              <Icon name="arrow-left" />
            </button>
          </template>
          <template #right>
            <button
              class="btn btn-danger btn-sm"
              type="submit"
              :disabled="send"
            >
              <template v-if="!send">إضافة</template>
              <template v-else>
                <span
                  class="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
                إضافة...
              </template>
            </button>
          </template>
        </Head>
        <Checkbox
          v-model:checked="report.replacement_parts"
          name="replacement_parts"
          label="يحتاج إلى قطع غيار"
        />
        <Transition>
          <div v-if="report.replacement_parts">
            <Field
              v-model="report.expected_time"
              type="number"
              label="الوقت المتوقع لحل المشكلة (اليوم)"
              :required="true"
              :length="1"
            />
            <Field
              v-model="report.expected_cost"
              type="number"
              label="التكلفة المتوقعة (جنية)"
              :required="true"
              :length="2"
            />
          </div>
        </Transition>
        <Field
          v-model="report.details"
          type="textarea"
          label="تفاصيل"
          :required="true"
          :length="5"
        />
        <File
          @change="uploadFiles"
          label="رفع  صور"
          accept="image/png, image/jpeg"
          multiple
        />
        <div class="app-gallery" v-if="gallery != 0">
          <div class="col" v-for="item in gallery" :key="item">
            <div class="image">
              <span class="badge"><Icon name="correct" /></span>
              <img :src="item" :alt="item" />
            </div>
          </div>
        </div>
      </form>
    </Modal>
  </template>
</template>
