<script>
import Modal from "../components/Modal.vue";
import VOtpInput from "vue3-otp-input";
import { useAuthStore } from "@/stores/useAuth";
import { useAlert } from "@/stores/useAlert";
import { StatusBar, Style } from "@capacitor/status-bar";
import { Capacitor } from "@capacitor/core";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import axios from "axios";
export default {
  components: {
    VOtpInput,
    Modal,
  },
  data() {
    return {
      user_id: "",
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
      modalSetPassword: false,
      appVerifier: "",
      valid: {
        mobile: 11,
        password: 8,
      },
      app_pass: "gD1T vo8s srrE rzJx Bt7N 4IFF",
    };
  },
  setup() {
    const auth = useAuthStore();
    const error = useAlert();
    return {
      auth,
      error,
    };
  },
  created() {
    document.title = "Reset Password";
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
        this.error.show = false;
        ele.classList.remove("is-invalid");
        ele.classList.add("is-valid");
      } else {
        this.error.show = true;
        this.error.style = "warning";
        this.error.masg = "كلمة مرور أقل من 8";
        ele.classList.remove("is-valid");
        ele.classList.add("is-invalid");
      }
    },
    passwordConfirmValid(ele) {
      if (this.password != this.password_confirm) {
        this.error.show = true;
        this.error.masg = "كلمة السر غير متطابقة";
        this.error.style = "warning";
        ele.classList.remove("is-valid");
        ele.classList.add("is-invalid");
      } else {
        this.error.show = false;
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
    async handleSubmit(ele) {
      if (this.mobile.length == this.valid.mobile) {
        this.$refs.submitBtn.disabled = true;
        this.$refs.submitBtn.innerHTML =
          "<span class='spinner-border spinner-sm' role='status' aria-hidden='true'></span> تحقق من الرقم...";
        const response = await axios({
          method: "get",
          url: "wp-json/wp/v2/users",
          auth: {
            username: "admin",
            password: this.app_pass,
          },
          params: {
            search: this.mobile,
          },
        });
        if (this.mobile == response.data[0]?.username) {
          this.user_id = response.data[0]?.id;
          this.error.show = false;
          this.$refs.submitBtn.disabled = false;
          this.$refs.submitBtn.innerHTML = "إعادة تعيين كلمة المرور";
          this.sendOtp();
        } else {
          ele.reset();
          this.$refs.submitBtn.disabled = false;
          this.$refs.submitBtn.innerHTML = "إعادة تعيين كلمة المرور";
          this.error.show = true;
          this.error.style = "danger";
          this.error.masg = "لا يوجد حساب بهذا الرقم";
        }
      } else {
        this.error.show = true;
        this.error.style = "warning";
        this.error.masg = "رقم الهاتف غير صالح";
      }
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
          this.error.show = true;
          this.error.style = "warning";
          this.error.masg = error;
          this.$refs.submitBtn.disabled = false;
          this.$refs.submitBtn.innerHTML = " إعادة تعيين كلمة المرور ";
        });
    },
    async setPassword(ele) {
      if (this.password.length >= this.valid.password) {
        this.$refs.setPassBtn.disabled = true;
        this.$refs.setPassBtn.innerHTML =
          "<span class='spinner-border spinner-sm' role='status' aria-hidden='true'></span> تغير ...";
        const response = await axios({
          method: "post",
          url: "wp-json/wp/v2/users/" + this.user_id,
          auth: {
            username: "admin",
            password: this.app_pass,
          },
          data: {
            password: this.password,
          },
        })
          .then((response) => {
            if (response) {
              this.$refs.setPassBtn.innerHTML = "تغير";
              this.error.show = true;
              this.error.style = "success";
              this.error.masg = "تم التغير بنجاح";
              setTimeout(() => {
                this.$router.push({ name: "login" });
              }, 2000);
            }
          })
          .catch((error) => {
            ele.reset();
            this.$refs.setPassBtn.disabled = false;
            this.$refs.setPassBtn.innerHTML = "تغير";
            this.error.show = true;
            this.error.style = "danger";
            this.error.masg = "كلمة المرور غير صالحة";
          });
      } else {
        this.error.show = true;
        this.error.style = "warning";
        this.error.masg = "كلمة المرور غير صالحة";
      }
    },
    verifyOtp(ele) {
      ele.disabled = true;
      ele.innerHTML =
        "<span class='spinner-border spinner-sm' role='status' aria-hidden='true'></span> تاكيد...";
      const code = this.otpCode;
      confirmationResult
        .confirm(code)
        .then((result) => {
          this.modalOtp = false;
          this.modalSetPassword = true;
        })
        .catch((error) => {
          this.error.show = true;
          this.error.style = "danger";
          this.error.masg = "رمز التحقق غير صالح";
          ele.disabled = false;
          ele.innerHTML = "تحقق من الرقم";
        });
    },
  },
};
</script>

<template>
  <Page class="app-page-auth resetpassword">
    <TopBar>
      <template #left>
        <button @click="this.$router.push('/login')" class="app-btn-back">
          <Icon name="arrow-left" />
        </button>
        <h4 style="margin-right: 10px">إعادة تعيين كلمة المرور</h4>
      </template>
    </TopBar>
    <Content :isBoxed="true">
      <h1>إعادة تعيين كلمة المرور</h1>
      <p>من فضلك ادخل رقم الهاتف لإعادة تعيين كلمة المرور</p>
      <form @submit.prevent="handleSubmit($event.target)">
        <Field
          v-model="mobile"
          type="number"
          placeholder="01X XXX XXX XX"
          label="الهاتف"
          icon="mobile"
          @keyup="validMobile($event.target)"
        />
        <div id="recaptcha-container"></div>
        <div class="app-field-submit">
          <button
            class="btn btn-primary btn-block btn-lg"
            id="submit-btn"
            ref="submitBtn"
          >
            إعادة تعيين كلمة المرور
          </button>
        </div>
      </form>
    </Content>
    <Teleport to="body">
      <Alert :show="hasFeedback" :mode="feedbackStyle" :msg="feedback" />
    </Teleport>
    <Modal class="modal-otp bottom" animation="fadeUp" :show="modalOtp">
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
      class="modal-resetpassword"
      animation="fadeUp"
      :show="modalSetPassword"
    >
      <Page class="app-page-auth">
        <TopBar>
          <template #left>
            <button
              @click="
                () => {
                  this.modalSetPassword = false;
                }
              "
              class="app-btn-back"
            >
              <Icon name="arrow-left" />
            </button>
          </template>
        </TopBar>
        <Content>
          <h1>كلمة مرور جديد</h1>
          <form @submit.prevent="setPassword($event.target)">
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
            <div class="app-field-submit">
              <button class="btn btn-primary btn-block btn-lg" ref="setPassBtn">
                تغير
              </button>
            </div>
          </form>
        </Content>
      </Page>
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
.app-page-auth.resetpassword {
  .app-content {
    padding-top: 60px;
    padding-bottom: 0;
  }
}
#recaptcha-container {
  height: 78px;
  margin-bottom: 15px;
}
</style>
