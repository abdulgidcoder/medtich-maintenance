<script>
import TopBar from "@/layouts/auth/TopBar.vue";
import { useAuthStore } from "@/stores/useAuth";
import VOtpInput from "vue3-otp-input";
import { StatusBar, Style } from "@capacitor/status-bar";
import { Capacitor } from "@capacitor/core";

import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
export default {
  components: {
    TopBar,
    VOtpInput,
  },
  data() {
    return {
      name: "",
      mobile: "",
      password: "",
      password_confirm: "",
      otpCode: "",
      countryCode: "+2",
      hasFeedback: false,
      feedbackStyle: "",
      feedback: "",
      modalOtp: false,
      privacyModal: false,
      privacyPolicy: false,
      appVerifier: "",
      roleUser: "technician",
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
  mounted() {
    document.title = "Register";
    if (Capacitor.isNativePlatform()) {
      StatusBar.setStyle({ style: Style.Light });
      StatusBar.setBackgroundColor({
        color: "#f4f8ff",
      });
    }
  },
  beforeUnmount() {
    if (Capacitor.isNativePlatform()) {
      StatusBar.setStyle({ style: Style.Dark });
      StatusBar.setBackgroundColor({
        color: "#00d9c8",
      });
    }
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
                "<span class='spinner-border spinner-sm' role='status' aria-hidden='true'></span> تسجيل...";
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
        .register(this.name, this.mobile, this.password, this.roleUser)
        .then((response) => {
          this.modalOtp = false;
          this.hasFeedback = true;
          this.feedbackStyle = "success";
          this.feedback = "سجل بنجاح";
          setTimeout(() => {
            this.$router.push({ name: "home" });
          }, 1500);
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
        "<span class='spinner-border spinner-sm' role='status' aria-hidden='true'></span> تاكيد...";
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
          type="tel"
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
        <Radio
          label="نوع الحساب"
          name="roleUser"
          v-model="roleUser"
          :data="[
            { label: 'مستشفى', value: 'customer' },
            { label: 'متخصص صيانة', value: 'technician' },
          ]"
        />
        <div style="display: flex; align-items: center">
          <Checkbox
            v-model="privacyPolicy"
            name="privacyPolicy"
            label="هل توافق على "
          />
          <div class="btn-link privacy-btn" @click="this.privacyModal = true">
            الشروط والاحكام
          </div>
        </div> 
        <div id="recaptcha-container"></div>
        <div class="app-field-submit">
          <button class="btn btn-primary btn-block" id="submit-btn">
            تسجيل
          </button>
        </div>
      </form>
      <p>هل لديك حساب ؟ <RouterLink to="/login">دخول</RouterLink></p>
    </Content>
    <Teleport to="body">
      <Alert :show="hasFeedback" :mode="feedbackStyle" :msg="feedback" />
    </Teleport>
    <Modal class="modal-otp bottom" :show="modalOtp" animation="fadeUp">
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
        class="btn btn-primary btn-block"
        @click="verifyOtp($event.target)"
      >
        تحقق من الرقم
      </button>
    </Modal>

    <Modal
      class="modal-otp page"
      :show="privacyModal"
      animation="fadeUp"
      @dismiss="this.privacyModal = false"
    >
      <Head title="الشروط والاحكام">
        <template #left>
          <button
            @click="this.privacyModal = false"
            class="app-btn-back"
            type="button"
          >
            <Icon name="times" />
          </button>
        </template>
      </Head>
      <Content :isBoxed="true">
        <div v-html="this.$privacy"></div>
      </Content>
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
