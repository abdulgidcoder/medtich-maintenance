<script>
import { useReportsStore } from "@/stores/useReports.js";
import { useError } from "@/stores/useError";

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
    const error = useError();
    return { reportsStore, error };
  },
  mounted() {
    document.title = "Add Report";
    console.log('dd' + this.report.order)
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
        "<span class='spinner-border spinner-border-sm'></span>Uploading ...";
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
          input.target.nextSibling.children[1].innerHTML = "Upload Images";
        })
        .catch((error) => {
          input.target.nextSibling.children[1].innerHTML = "Upload Images";
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
          "<span class='spinner-border spinner-border-sm' role='status' aria-hidden='true'></span> Adding...";
        useReportsStore()
          .addReport(this.report)
          .then(() => {
            this.error.masg = "Add Report Success";
            this.error.style = "success";
            this.error.show = true;
            btnSubmit.innerHTML = "Added";
            ele.reset();
          })
          .catch((error) => {
            ele.reset();
            btnSubmit.disabled = false;
            btnSubmit.innerHTML = "Add New";
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
        this.error.masg = "Some fields are not valid";
      }
    },
  },
};
</script>
<template>
  <Page class="app-add-report">
    <Head title="Add Report" route="home" />
    <Content :isBoxed="true">
      <form @submit.prevent="handleSubmit($event.target)">
        <Field
          v-model="report.title"
          type="text"
          label="Title"
          @keyup="validField($event.target)"
        />
        <Field
          v-model="report.expected_time"
          type="number"
          label="Expected time to resolve the issue (Day)"
          @keyup="validNumber($event.target)"
        />
        <Field
          v-model="report.expected_cost"
          type="number"
          label="Expected Cost (SAR)"
          @keyup="validNumber($event.target)"
        />
        <Field
          v-model="report.content"
          type="textarea"
          label="Datails"
          @keyup="validField($event.target)"
        />
        <Checkbox
          v-model:checked="report.replacement_parts"
          name="replacement_parts"
          label="Needs replacement parts"
           
        />
        <File
          @change="uploadFiles"
          label="Upload Images"
          accept="image/png, image/jpeg"
           
          multiple
        />
        <div class="app-fixed-bottom">
          <button class="btn btn-primary btn-lg btn-block" id="submit-report">
            Add Report
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
