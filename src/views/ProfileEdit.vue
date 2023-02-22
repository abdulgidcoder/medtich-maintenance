<script>
import axios from "axios";
import { useAuthStore } from "@/stores/useAuth";
import { useError } from "@/stores/useError";

import UserInfo from "../components/auth/UserInfo.vue";
import FileBox from "../components/FileBox.vue";

export default {
  components: { UserInfo, FileBox },
  data() {
    return {
      cities: [
        { id: "riyadh", value: "الرياض" },
        { id: "makkah", value: "مكة المكرمة" },
        { id: "almadinah", value: "المدينة المنورة" },
        { id: "alqassim", value: "القصيم" },
        { id: "eastern", value: "الشرقية" },
        { id: "aseer", value: "عسير" },
        { id: "tabuk", value: "تبوك" },
        { id: "hail", value: "حائل" },
        { id: "northern-borders", value: "الحدود الشمالية" },
        { id: "jazan", value: "جازان" },
        { id: "najran", value: "نجران" },
        { id: "albahah", value: "الباحة" },
        { id: "aljowf", value: "الجوف" },
      ],
      specialization: [
        { id: "dental", value: "طب الأسنان" },
        { id: "dental-x-ray", value: "طب الأسنان والأشعة" },
        { id: "dermatology", value: "الجلدية" },
        { id: "endoscopy", value: "المناظير" },
        { id: "laboratory", value: "المختبرات" },
        { id: "ent", value: "الأنف واذن والحنجرة" },
        { id: "or", value: "or قسم العمليات" },
        { id: "physiotherapy", value: "العلاج الطبيعى" },
        { id: "radiology", value: "الأشعة" },
        { id: "sterilization-cssd", value: "قسم تعقيم" },
        { id: "sterilization-endoscopy", value: "التعقيم - المناظير" },
        { id: "sterilization-lab", value: "قسم التعقيم المختبرات" },
      ],
      user: {
        username: "",
        name: "",
        area: "",
        specialization: "",
        cv: "",
      },
      areaSelected: "",
      spacSelected: "",
    };
  },
  setup() {
    const authStore = useAuthStore();
    const error = useError();
    return {
      authStore,
      error,
    };
  },

  mounted() {
    document.title = `Edit Profile`;
    this.user.username = this.$auth.user_data?.username;
    this.user.name = this.$auth.user_data?.name;
    this.user.area = this.$auth.user_data?.acf["area"];
    this.user.specialization = this.$auth.user_data?.acf["specialization"];
    this.user.cv = this.$auth.user_data?.acf["cv"];
  },
  methods: {
    chooseArea(data, indexArr) {
      this.user.area = data[0].id;
    },
    chooseSpac(data, indexArr) {
      this.user.specialization = data[0].id;
    },
    returnFileSize(number) {
      if (number < 1024) {
        return `${number} bytes`;
      } else if (number >= 1024 && number < 1048576) {
        return `${(number / 1024).toFixed(1)} KB`;
      } else if (number >= 1048576) {
        return `${(number / 1048576).toFixed(1)} MB`;
      }
    },
    async uploadFiles(input) {
      input.target.nextSibling.children[1].innerHTML =
        "<span class='spinner-border spinner-border-sm'></span>تحديث ...";
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
            this.user.cv=response.data[i].id;
          }
          input.target.nextSibling.children[1].innerHTML = "تحديث السيرة الذاتية";
          this.error.masg = "تم رفع السيرة الذاتية";
          this.error.style = "success";
          this.error.show = true;
        })
        .catch((error) => {
          input.target.nextSibling.children[1].innerHTML = "'رفع السيرة الذاتية";
             this.error.style = "danger";
          this.error.show = true;
          if (error.response) {
            let mesg = JSON.stringify(error.response.data.message);
            this.error.masg = mesg;
          } else {
            this.error.masg = error;
          }
        });
    },

    edit_user() {
      const btnSubmit = document.getElementById("updata-user");
      btnSubmit.disabled = true;
      btnSubmit.innerHTML =
        "<span class='spinner-border spinner-border-sm' role='status' aria-hidden='true'></span>تحديث...";
      this.authStore
        .updateUser({
          name: this.user.name,
          nickname: this.user.name,
          fields: {
            area: this.user.area,
            specialization: this.user.specialization,
            cv: this.user.cv,
          },
        })
        .then(() => {
          this.error.masg = "نجاح تحديث الملف الشخصي";
          this.error.style = "success";
          this.error.show = true;
          btnSubmit.innerHTML = "تحديث";
        })
        .catch((error) => {
          btnSubmit.disabled = false;
          btnSubmit.innerHTML = "تحديث";
          this.error.style = "danger";
          this.error.show = true;
          if (error.response) {
            let mesg = JSON.stringify(error.response.data.message);
            this.error.masg = mesg;
          } else {
            this.error.masg = error;
          }
        });
    },
  },
};
</script>
<template>
  <Page class="app-profile-page">
    <Head title="حسابى" route="home"></Head>
    <Content :isBoxed="true">
      <UserInfo />
      <form @submit.prevent="edit_user($event.target)">
        <Field
          type="text"
          label="الهاتف"
          :modelValue="this.$auth.user_data?.username"
          :readonly="true"
            icon="mobile"
        />
        <Field
          type="text"
          label="الاسم"
          :modelValue="this.$auth.user_data?.name"
          v-model="user.name"
            icon="user"
        />
        <label>المنطقة</label>
        <Select :onChange="chooseArea" :data="cities" class="app-select">{{
          $nameArea(this.user.area)
        }}</Select>
        <label>التخصص</label>
        <Select
          :onChange="chooseSpac"
          :data="specialization"
          class="app-select"
          >{{ $nameSpac(this.user.specialization) }}</Select
        >
        <File :label="this.$auth.user_data?.acf['cv'] ? 'قم بتحديث سيرتك الذاتية' : 'رفع السيرة الذاتية'" accept=".pdf" @change="uploadFiles" />
        <div class="app-fixed-bottom">
          <button class="btn btn-primary btn-lg btn-block" id="updata-user">
            تحديث
          </button>
        </div>
      </form>
      <FileBox
        v-if="this.$auth.user_data?.acf['cv']"
        :icon="this.$auth.user_data?.acf['cv'].icon"
        :name="this.$auth.user_data?.acf['cv'].filename"
        :size="returnFileSize(this.$auth.user_data?.acf['cv'].filesize)"
      />
    </Content>
  </Page>
</template>
