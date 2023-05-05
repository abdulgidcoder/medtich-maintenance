<script>
import { useReportsStore } from "@/stores/useReports.js";
import { useAlert } from "@/stores/useAlert";

import axios from "axios";
export default {
  components: {},
  data() {
    return {
      loader: true,
      report: {
        title: "",
        expected_time: "",
        expected_cost: "",
        content: "",
        replacement_parts: false,
        order: this.$route.params.orderId,
        images: [],
      },
      gallery: [],
    };
  },
  setup() {
    const reportsStore = useReportsStore();
    const error = useAlert();
    return { reportsStore, error };
  },
  mounted() {
    document.title = "Add Report"; 
  },
  watch: {},
  methods: {
    validField(ele) {
      if (ele.value.length >= 5) {
        ele.classList.remove("is-invalid");
        ele.classList.add("is-valid");
        
      } else { 
        ele.classList.remove("is-valid");
        ele.classList.add("is-invalid");
      }
    },
    validNumber(ele) {
      if (ele.value.length >= 1) {
        ele.classList.remove("is-invalid");
        ele.classList.add("is-valid"); 
      } else { 
        ele.classList.remove("is-valid");
        ele.classList.add("is-invalid");
      }
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
    handleSubmit(ele) {
      if (
        this.report.title   &&
        this.report.expected_time &&
        this.report.expected_cost &&
        this.report.content  
      ) {
        const btnSubmit = document.getElementById("submit-report");
        btnSubmit.disabled = true;
        btnSubmit.innerHTML =
          "<span class='spinner-border spinner-border-sm' role='status' aria-hidden='true'></span> اضافة ...";
        useReportsStore()
          .addReport(this.report)
          .then(() => {
            this.error.masg = "إضافة تقرير بنجاح";
            this.error.style = "success";
            this.error.show = true;
            btnSubmit.innerHTML = "مضاف";
            ele.reset();
            this.$router.go(-1)
          })
          .catch((error) => {
            ele.reset();
            btnSubmit.disabled = false;
            btnSubmit.innerHTML = "اضف جديد";
            this.error.style = "danger";
            this.error.show = true;
            if (error.response) {
              let mesg = JSON.stringify(error.response.data.message);
              this.error.masg = mesg;
            } else {
              this.error.masg = error;
            }
          });
      } else {
        this.error.style = "warning";
        this.error.show = true;
        this.error.masg = "بعض الحقول غير صالحة";
      }
    },
  },
};
</script>
<template>
  <Page class="app-add-report">
    <Head title="إضافة تقرير" goBack="true" />
    <Content :isBoxed="true">
      <form @submit.prevent="handleSubmit($event.target)">
        <Field
          v-model="report.title"
          type="text"
          label="العنوان"
          @keyup="validField($event.target)"
        />
        <Field
          v-model="report.expected_time"
          type="number"
          label="الوقت المتوقع لحل المشكلة (اليوم)"
          @keyup="validNumber($event.target)"
        />
        <Field
          v-model="report.expected_cost"
          type="number"
          label="التكلفة المتوقعة (جنية)"
          @keyup="validNumber($event.target)"
        />
        <Field
          v-model="report.content"
          type="textarea"
          label="تفاصيل"
          @keyup="validField($event.target)"
        />
        <Checkbox
          v-model:checked="report.replacement_parts"
          name="replacement_parts"
          label="يحتاج إلى قطع غيار"
           
        />
        <File
          @change="uploadFiles"
          label="رفع  صور"
          accept="image/png, image/jpeg"
           
          multiple
        />
        <div class="app-fixed-bottom">
          <button class="btn btn-primary btn-lg btn-block" id="submit-report">
          إضافة تقرير
          </button>
        </div>
      </form>
      <div class="app-gallery" v-if="gallery != 0">
        <div class="col" v-for="item in gallery" :key="item">
          <div class="image">
            <span class="badge"><Icon name="correct" /></span>
            <img :src="item" :alt="item" />
          </div>
        </div>
      </div>
    </Content>
  </Page>
</template>

<style lang="scss"></style>
