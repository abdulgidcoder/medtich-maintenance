<script>
import TopBar from "../components/auth/TopBar.vue";
// import otp from "../components/form/OTP.vue";
import Modal from "../components/Modal.vue";
import { useAuthStore } from "@/stores/useAuth";
import VOtpInput from "vue3-otp-input";

import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
export default {
  components: {
    TopBar,
    VOtpInput,
    Modal,
  },
  data() {
    return {
      name: "",
      mobile: "",
      password: "",
      password_confirm: "",
      otpCode: "",
      countryCode: "+2",
      mailformat: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      hasFeedback: false,
      feedbackStyle: "",
      feedback: "",
      modalOtp: false,
      privacyModal: false,
      privacyPolicy: false,
      appVerifier: "",
      roleUser: "",
      valid: {
        name: 5,
        mobile: 11,
        password: 8,
      },
    };
  },
  setup() {
    const auth = useAuthStore();
    return {
      auth,
    };
  },
  created() {
    document.title = "Register"; 
  },
  mounted() {
    this.initReCaptcha();
  },
  methods: {
    validName(ele) {
      if (ele.value.length >= this.valid.name) {
        ele.classList.remove("is-invalid");
        ele.classList.add("is-valid");
      } else {
        ele.classList.remove("is-valid");
        ele.classList.add("is-invalid");
      }
    },
    validMobile(ele) {
      if (ele.value.length === this.valid.mobile) {
        ele.classList.remove("is-invalid");
        ele.classList.add("is-valid");
      } else {
        ele.classList.remove("is-valid");
        ele.classList.add("is-invalid");
      }
    },
    passwordValid(ele) {
      if (this.password.length >= this.valid.password) {
        this.hasFeedback = false;
        ele.classList.remove("is-invalid");
        ele.classList.add("is-valid");
      } else {
        this.hasFeedback = true;
        this.feedbackStyle = "warning";
        this.feedback = "كلمة مرور أقل من 8";
        ele.classList.remove("is-valid");
        ele.classList.add("is-invalid");
      }
    },
    passwordConfirmValid(ele) {
      if (this.password != this.password_confirm) {
        this.hasFeedback = true;
        this.feedback = "كلمة السر غير متطابقة";
        this.feedbackStyle = "warning";
        ele.classList.remove("is-valid");
        ele.classList.add("is-invalid");
      } else {
        this.hasFeedback = false;
        ele.classList.remove("is-invalid");
        ele.classList.add("is-valid");
      }
    },
    initReCaptcha() {
      const authFirebase = getAuth();
      authFirebase.languageCode = "ar";
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "normal",
        },
        authFirebase
      );
      recaptchaVerifier.render();
    },
    sendOtp() {
      const authFirebase = getAuth();
      const phoneNumber = this.countryCode + this.mobile;
      const appVerifier = window.recaptchaVerifier;
      signInWithPhoneNumber(authFirebase, phoneNumber, appVerifier)
        .then((confirmationResult) => {
          this.modalOtp = true;
          window.confirmationResult = confirmationResult;
        })
        .catch((error) => {
          this.hasFeedback = true;
          this.feedbackStyle = "warning";
          this.feedback = error;
          let btnSubmit = document.getElementById("submit-btn");
          btnSubmit.disabled = false;
          btnSubmit.innerHTML = "متابعه";
        });
    },
    handleSubmit(ele) {
      if (this.name.length >= this.valid.name) {
        if (this.mobile.length == this.valid.mobile) {
          if (this.password.length >= this.valid.password) {
            if (!this.roleUser) {
              this.hasFeedback = true;
              this.feedbackStyle = "warning";
              this.feedback = "اختر نوع الحساب";
            } else if (!this.privacyPolicy) {
              this.hasFeedback = true;
              this.feedbackStyle = "warning";
              this.feedback = "يجب الموافقة على الشروط والاحكام";
            } else {
              this.hasFeedback = false;
              let btnSubmit = document.getElementById("submit-btn");
              btnSubmit.disabled = true;
              btnSubmit.innerHTML =
                "<span class='spinner-border spinner-border-sm' role='status' aria-hidden='true'></span> تسجيل...";
              this.sendOtp();
            }
          }
        }
      } else {
        this.hasFeedback = true;
        this.feedbackStyle = "warning";
        this.feedback = "بعض الحقول غير صالحة";
      }
    },
    signUp() {
      useAuthStore()
        .register(this.name, this.mobile, this.password,this.roleUser)
        .then((response) => {
          this.modalOtp = false;
          this.hasFeedback = true;
          this.feedbackStyle = "success";
          this.feedback = "سجل بنجاح";
          setTimeout(() => {
            this.$router.push({ name: "home" });
          }, 2000);
        })
        .catch((error) => {
          let btnSubmit = document.getElementById("submit-btn");
          btnSubmit.disabled = false;
          btnSubmit.innerHTML = "تسجيل";
          this.modalOtp = false;
          this.hasFeedback = true;
          this.feedbackStyle = "danger";
          if (error.response) {
            let mesg = error.response.data.data.message;
            this.feedback = mesg;
          } else {
            this.feedback = error;
          }
        });
    },
    verifyOtp(ele) {
      ele.disabled = true;
      ele.innerHTML =
        "<span class='spinner-border spinner-border-sm' role='status' aria-hidden='true'></span> تاكيد...";
      const code = this.otpCode;
      confirmationResult
        .confirm(code)
        .then((result) => {
          this.signUp();
        })
        .catch((error) => {
          this.hasFeedback = true;
          this.feedbackStyle = "danger";
          this.feedback = "رمز التحقق غير صالح";
          ele.disabled = false;
          ele.innerHTML = "تحقق من الرقم";
        });
    },
  },
};
</script>

<template>
  <Page class="app-page-auth">
    <!-- <TopBar /> -->
    <Content>
      <AppLogo />
      <h1>تسجيل</h1>
      <form @submit.prevent="handleSubmit($event.target)">
        <Field
          v-model="name"
          type="text"
          placeholder="احمد محمد"
          label="الاسم"
          icon="user"
          @keyup="validName($event.target)"
        />
        <Field
          v-model="mobile"
          type="number"
          placeholder="01X XXX XXX XX"
          label="الهاتف"
          icon="mobile"
          @keyup="validMobile($event.target)"
        />

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
        <div class="app-field">
          <label class="app-field_label">نوع الحساب</label>
          <div class="radio_group">
            <input
              type="radio"
              id="customer"
              value="customer"
              v-model="roleUser"
            />
            <label for="customer">مستشفى</label>

            <input
              type="radio"
              id="technician"
              value="technician"
              v-model="roleUser"
            />
            <label for="technician">فنى صيانة</label>
          </div>
        </div>

        <div style="display: flex; align-items: center">
          <Checkbox
            v-model:checked="privacyPolicy"
            name="privacyPolicy"
            label="هل توافق على "
          />
          <div class="btn-link privacy-btn" @click="this.privacyModal = true">
            الشروط والاحكام
          </div>
        </div>
        <div id="recaptcha-container"></div>
        <div class="app-field-submit">
          <button class="btn btn-primary btn-block btn-lg" id="submit-btn">
            تسجيل
          </button>
        </div>
      </form>
      <p>هل لديك حساب ؟ <RouterLink to="/login">دخول</RouterLink></p>
    </Content>
    <Teleport to="body">
      <Alert :show="hasFeedback" :mode="feedbackStyle" :msg="feedback" />
    </Teleport>
    <Modal classes="modal-otp bottom" :show="modalOtp">
      <h2>قم بتاكيد رقمك</h2>
      <p>
        أدخل الرمز المكون من 6 أرقام المرسل إليه<br /><strong>{{
          countryCode + mobile
        }}</strong>
      </p>

      <v-otp-input
        class="otp-box"
        ref="otpInput"
        input-classes="otp-input"
        separator=""
        :num-inputs="6"
        :should-auto-focus="true"
        :is-input-num="true"
        :placeholder="['*', '*', '*', '*', '*', '*']"
        @on-complete="otpCode = $event"
      />
      <button
        id="verify-btn"
        class="btn btn-primary btn-block btn-lg"
        @click="verifyOtp($event.target)"
      >
        تحقق من الرقم
      </button>
    </Modal>

    <Modal
      classes="modal-otp bottom"
      :show="privacyModal"
      @closeModal="this.privacyModal = false"
    >
      <h2>الشروط والاحكام</h2>
      <p>
        This text template will help you to create your web site’s privacy
        policy. The template contains a suggestion of sections you most likely
        will need. Under each section heading you will find a short summary of
        what information you should provide, which will help you to get started.
        Some sections include suggested policy content, others will have to be
        completed with information from your theme and plugins. Please edit your
        privacy policy content, making sure to delete the summaries, and adding
        any information from your theme and plugins. Once you publish your
        policy page, remember to add it to your navigation menu. It is your
        responsibility to write a comprehensive privacy policy, to make sure it
        reflects all national and international legal requirements on privacy,
        and to keep your policy current and accurate.
      </p>
    </Modal>
  </Page>
</template>
<style lang="scss">
.modal-otp {
  text-align: center;
  p {
    font-size: 14px;
    margin-bottom: 25px;
  }
}
#recaptcha-container {
  height: 78px;
  margin-bottom: 15px;
}
.privacy-btn {
  margin: 0 5px 15px 0;
  label {
    font-weight: 400 !important;
  }
}
.radio_group {
  margin-top: 15px;
  label {
    margin-right: 5px;
    margin-left: 15px;
    font-weight: 400;
    margin-bottom: 0;
  }
}
</style>
