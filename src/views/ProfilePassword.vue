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
      password: "",
      password_confirm: "",
      isValid: null,
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
    document.title = `Change Password`;
  },
  methods: {
    edit_password(ele) {
      if (this.password.length >= 7) { 
        if (this.password == this.password_confirm) {
          const btnSubmit = document.getElementById("updata-user");
          btnSubmit.disabled = true;
          btnSubmit.innerHTML =
            "<span class='spinner-border spinner-border-sm' role='status' aria-hidden='true'></span> تغير...";
          this.authStore
            .updateUser({
              password: this.password,
            })
            .then(() => {
              this.error.masg = "نجاح تغير كلمة المرور";
              this.error.style = "success";
              this.error.show = true;
              btnSubmit.disabled = false;
              btnSubmit.innerHTML = "تغير";
                   ele.reset(); 
            })
            .catch((error) => { 
              btnSubmit.disabled = false;
              btnSubmit.innerHTML = "تغير";
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
          this.error.show = true;
          this.error.masg = "كلمة السر غير متطابقة";
          this.error.style = "warning";
        }
      } else {
        this.error.show = true;
        this.error.style = "warning";
        this.error.masg = "كلمة المرور غير صالحة";
      }
    },
    passwordValid(ele) {
      if (this.password.length <= 7 || !this.password) {
        this.isValid = false;
        this.error.show = true;
        this.error.style = "warning";
        this.error.masg = "كلمة مرور أكثر من 8";
        ele.classList.remove("is-valid");
        ele.classList.add("is-invalid");
      } else {
        this.isValid = true;
        this.error.show = false;
        ele.classList.remove("is-invalid");
        ele.classList.add("is-valid");
      }
    },
    passwordConfirmValid(ele) {
      if (this.password != this.password_confirm) {
        this.isValid = false;
        this.error.show = true;
        this.error.masg = "كلمة السر غير متطابقة";
        this.error.style = "warning";
        ele.classList.remove("is-valid");
        ele.classList.add("is-invalid");
      } else {
        this.isValid = true;
        this.error.show = false;
        ele.classList.remove("is-invalid");
        ele.classList.add("is-valid");
      }
    },
  },
};
</script>
<template>
  <Page class="app-profile-page">
    <Head title="تغيير كلمة المرور" goBack="true"></Head>
    <Content :isBoxed="true">
      <UserInfo />
      <form @submit.prevent="edit_password($event.target)">
        <Field
          v-model="password"
          type="password"
          placeholder="*********"
          label="كلمة المرور"
          icon="password"
          @keyup="passwordValid($event.target)"
        />
        <Field
          v-model="password_confirm"
          type="password"
          placeholder="*********"
          label="تأكيد كلمة المرور"
          icon="password"
          @keyup="passwordConfirmValid($event.target)"
        />
        <div class="app-fixed-bottom">
          <button class="btn btn-primary btn-lg btn-block" id="updata-user">
            تغير
          </button>
        </div>
      </form>
    </Content>
  </Page>
</template>
