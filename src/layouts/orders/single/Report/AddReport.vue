<script>
import { useOrdersStore } from "@/stores/useOrders.js";
import { useMediaStore } from "@/stores/useMedia";
import { useAlert } from "@/stores/useAlert";
export default {
  props: {
    order: Object,
  },
  data() {
    return {
      Modal: false,
      send: false,
      uploadig: false,
      report: {
        replacement_parts: false,
        date: new Date().toUTCString(),
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
    const mediaStore = useMediaStore();
    return { ordersStore, alertStore, mediaStore };
  }, 
  methods: {
    pushAlert(error) {
      this.alertStore.style = "warning";
      this.alertStore.show = true;
      this.alertStore.masg = " اضاف " + error + "!";
    },
    async uploadFiles(input) {
      this.uploadig = true;
      const files = input.target.files;
      await this.mediaStore.upload(files).then((response) => { 
        this.uploadig = false;
        for (let i = 0; i < response.length; i++) { 
          this.gallery.push(response[i].src);
          this.report.images.push(response[i].id);
        }
      });
    },
    addreport(ele) {
      if (
        this.report.replacement_parts &&
        this.report.expected_time.length +1 <= 1
      ) {
        this.pushAlert("الوقت المتوقع لحل المشكلة");
      } else if (
        this.report.replacement_parts &&
        this.report.expected_cost.length +1 <= 2
      ) {
        this.pushAlert("التكلفة المتوقعة");
      } else if (this.report.details.length +1 <= 5) {
        this.pushAlert("تفاصيل التقرير");
      } else if (this.report.images.length +1 <= 1) {
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
  <div
    v-if="
      order.acf['status'] == 'processing' &&
      this.$auth.role == 'technician' &&
      order.acf?.confirm_arrived &&
      order.acf?.technician_arrived.date &&
      order.acf?.report?.date == ''
    "
  >
    <button @click="this.Modal = true" class="btn btn-danger">
      إضافة تقرير
    </button>
    <Modal class="page" :show="Modal" animation="fadeUp">
      <form @submit.prevent="addreport($event.target)">
        <Head title="إضافة تقرير">
          <template #left>
            <button
              @click="this.Modal = false"
              class="app-btn-back"
              type="button"
            >
              <Icon name="times" />
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
                  class="spinner-border spinner-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
                إضافة...
              </template>
            </button>
          </template>
        </Head>
        <Content :isBoxed="true">
          <Checkbox
            v-model="report.replacement_parts"
            name="replacement_parts"
            label="يحتاج إلى قطع غيار"
          />
          <Transition>
            <div v-if="report.replacement_parts">
              <Field
                v-model="report.expected_time"
                type="number"
                label="الوقت المتوقع لحل المشكلة"
                :required="true"
                :length="1"
                append="يوم"
              />
              <Field
                v-model="report.expected_cost"
                type="number"
                label="التكلفة المتوقعة"
                :required="true"
                :length="2"
                append="جنية"
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
            :uploadig="uploadig"
          />
          <Gellary :images="gallery" />
        </Content>
      </form>
    </Modal>
  </div>
</template>
