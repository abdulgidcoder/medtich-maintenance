<script>
import axios from "axios";
import { useAuthStore } from "@/stores/useAuth";
import { useError } from "@/stores/useError";
import Modal from "../components/Modal.vue";
import UserInfo from "../components/auth/UserInfo.vue";
import FileBox from "../components/FileBox.vue";
import Info from "../components/Info.vue";

export default {
  components: { UserInfo, FileBox, Modal, Info },
  data() {
    return { 
      user: {
        username: "",
        name: "",
        area: "",
        specialization: "",
        cv: "",
      },
      areaSelected: "",
      spacSelected: "",
      deleteModal: false,
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
            this.user.cv = response.data[i].id;
          }
          input.target.nextSibling.children[1].innerHTML =
            "تحديث السيرة الذاتية";
          this.error.masg = "تم رفع السيرة الذاتية";
          this.error.style = "success";
          this.error.show = true;
        })
        .catch((error) => {
          input.target.nextSibling.children[1].innerHTML =
            "'رفع السيرة الذاتية";
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
          btnSubmit.disabled = false;
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
    delete_account() {
      this.authStore
        .deleteUser()
        .then(() => {
          this.error.style = "success";
          this.error.show = true;
          this.error.masg = "تم حذف حسابك";
          this.deleteModal = false;
          this.$router.push({ name: "logout" });
        })
        .catch((error) => {
          this.error.style = "danger";
          this.error.show = true;
          this.error.masg = "لم يتم حذف حسابك";
          this.deleteModal = false;
        });
    },
  },
};
</script>
<template>
  <Page class="app-profile-page">
    <Head title="حسابى" goBack="true"></Head>
    <Content :isBoxed="true">
      <Info
        mode="warning"
        msg="قم برفع  سيرتك الذاتية"
        :show="
          !this.$auth.user_data?.acf['cv'] && this.$auth.role == 'technician'
        "
      />
      <UserInfo class="center" />
      <form @submit.prevent="edit_user($event.target)">
        <!-- Username Field -->
        <Field
          type="text"
          label="الهاتف"
          :modelValue="this.$auth.user_data?.username"
          :readonly="true"
          icon="mobile"
        />
             <!-- Name Field -->
        <Field
          type="text"
          label="الاسم"
          :modelValue="this.$auth.user_data?.name"
          v-model="user.name"
          icon="user"
        />
             <!-- Area Field -->
        <div>
          <label>المنطقة</label>
          <Select :onChange="chooseArea" :data="this.$cities" class="app-select">{{
            this.user.area ? $nameArea(this.user.area) : "اختار منظقتك"
          }}</Select>
        </div>
             <!-- Specialization Field -->
        <div v-if="this.$auth.role == 'technician'">
          <label>التخصص</label>
          <Select
            :onChange="chooseSpac"
            :data="this.$specialization"
            class="app-select"
            >{{
              this.user.specialization
                ? $nameSpac(this.user.specialization)
                : "اختار تخصصك"
            }}</Select
          >
        </div>
        <!-- Cv Field -->
        <File
          :label="
            this.$auth.user_data?.acf['cv']
              ? 'قم بتحديث سيرتك الذاتية'
              : 'رفع السيرة الذاتية'
          "
          accept=".pdf"
          @change="uploadFiles"
          v-if="this.$auth.role == 'technician'"
        />
        <FileBox 
          v-if="this.$auth.user_data?.acf['cv'] && this.$auth.role == 'technician'"
          :icon="this.$auth.user_data?.acf['cv'].icon"
          :name="this.$auth.user_data?.acf['cv'].filename"
          :size="returnFileSize(this.$auth.user_data?.acf['cv'].filesize)"
        />
        <button
          class="btn btn-outline-danger   btn-block delete-modal"
          @click="() => (this.deleteModal = true)"
          type="button"
        >
          حذف الحساب
        </button>
        <div class="app-fixed-bottom">
          <button
            class="btn btn-primary btn-lg btn-block"
            id="updata-user"
            type="submit"
          >
            تحديث
          </button>
        </div>
      </form>
    </Content>
    <Modal
      class="modal-delete-account center"
      :show="deleteModal"
      animation="fadeIn"
      @closeModal="this.deleteModal = false"
    >
      <h2>هل تريد حقاََ حذف حساب؟</h2>
      <p><strong>تحذير:</strong> سوف يتم حذف جميع بياناتك</p>
      <button class="btn btn-danger" @click="delete_account">حذف الحساب</button>
      <button
        class="btn btn-secondary"
        @click="() => (this.deleteModal = false)"
      >
        الغاء
      </button>
    </Modal>
  </Page>
</template>
<style lang="scss">
.btn.delete-modal {
  margin: 25px 0 20px;
}
.modal-delete-account {
  .app-modal__container {
    text-align: center;
    padding: 35px 20px;
    p {
      margin-bottom: 25px;
    }
    .btn-secondary {
      margin-right: 30px;
    }
  }
}
</style>
