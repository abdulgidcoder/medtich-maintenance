<script>
import TopBar from "../components/auth/TopBar.vue";
import otp from "../components/form/OTP.vue";
import Modal from "../components/Modal.vue";
import { useAuthStore } from "@/stores/useAuth";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
export default {
  components: {
    TopBar,
    otp,
    Modal,
  },
  data() {
    return {
      name: "",
      mobile: "",
      password: "",
      password_confirm: "",
      otpCode: "",
      countryCode: "+966",
      mailformat: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      hasFeedback: false,
      feedbackStyle: "",
      feedback: "",
      modalOtp: false,
      appVerifier: "",
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
      if (ele.value.length >= 5) {
        ele.classList.remove("is-invalid");
        ele.classList.add("is-valid");
        this.isValid = true;
      } else {
        this.isValid = false;
        ele.classList.remove("is-valid");
        ele.classList.add("is-invalid");
      }
    },
    validMobile(ele) {
      if (ele.value.length === 11) {
        this.isValid = true;
        ele.classList.remove("is-invalid");
        ele.classList.add("is-valid");
      } else {
        this.isValid = false;
        ele.classList.remove("is-valid");
        ele.classList.add("is-invalid");
      }
    },
    passwordValid(ele) {
      if (this.password.length <= 7 || !this.password) {
        this.isValid = false;
        this.hasFeedback = true;
        this.feedbackStyle = "warning";
        this.feedback = "Password more less 8";
        ele.classList.remove("is-valid");
        ele.classList.add("is-invalid");
      } else {
        this.isValid = true;
        this.hasFeedback = false;
        ele.classList.remove("is-invalid");
        ele.classList.add("is-valid");
      }
    },
    passwordConfirmValid(ele) {
      if (this.password != this.password_confirm) {
        this.isValid = false;
        this.hasFeedback = true;
        this.feedback = "Password does not match";
        this.feedbackStyle = "warning";
        ele.classList.remove("is-valid");
        ele.classList.add("is-invalid");
      } else {
        this.isValid = true;
        this.hasFeedback = false;
        ele.classList.remove("is-invalid");
        ele.classList.add("is-valid");
      }
    },
    initReCaptcha() {
      const authFirebase = getAuth();
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "normal",
        },
        authFirebase
      );
      recaptchaVerifier.render().then((widgetId) => {
        window.recaptchaWidgetId = widgetId;
      });
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
          btnSubmit.innerHTML = "Contiune";
        });
    },
    handleSubmit(ele) {
      if (
        this.mobile &&
        this.name &&
        this.isValid &&
        this.password_confirm &&
        this.password
      ) {
        this.hasFeedback = false;
        let btnSubmit = document.getElementById("submit-btn");
        btnSubmit.disabled = true;
        btnSubmit.innerHTML =
          "<span class='spinner-border spinner-border-sm' role='status' aria-hidden='true'></span> Contiune...";
        this.sendOtp();
      } else {
        this.hasFeedback = true;
        this.feedbackStyle = "warning";
        this.feedback = "Some fields are not valid";
      }
    },
    signUp() {
      useAuthStore()
        .register(this.name, this.mobile, this.password)
        .then((response) => {
          this.modalOtp = false;
          this.hasFeedback = true;
          this.feedbackStyle = "success";
          this.feedback = "Register Success";
          setTimeout(() => {
            this.$router.push({ name: "home" });
          }, 2000);
        })
        .catch((error) => {
          let btnSubmit = document.getElementById("submit-btn");
          btnSubmit.disabled = false;
          btnSubmit.innerHTML = "Contiune";
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
        "<span class='spinner-border spinner-border-sm' role='status' aria-hidden='true'></span> Verify...";
      const code = this.otpCode;
      confirmationResult
        .confirm(code)
        .then((result) => {
          this.signUp();
        })
        .catch((error) => {
          this.hasFeedback = true;
          this.feedbackStyle = "danger";
          this.feedback = "Invalid Verification Code";
          ele.disabled = false;
          ele.innerHTML = "Verify number";
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
      <h1>Register</h1>
      <form @submit.prevent="handleSubmit($event.target)">
        <Field
          v-model="name"
          type="text"
          placeholder="Ahmed Ali"
          label="Name"
          icon="user"
          @keyup="validName($event.target)"
        />
        <Field
          v-model="mobile"
          type="number"
          placeholder="050 XXX XXXX"
          label="Mobile"
          icon="mobile"
          @keyup="validMobile($event.target)"
        />
        <Field
          v-model="password"
          type="password"
          placeholder="*********"
          label="Password"
          icon="password"
          @keyup="passwordValid($event.target)"
        />
        <Field
          v-model="password_confirm"
          type="password"
          placeholder="*********"
          label="Password Confirm"
          icon="password"
          @keyup="passwordConfirmValid($event.target)"
        />
        <div id="recaptcha-container"></div>
        <div class="app-field-submit">
          <button class="btn btn-primary btn-block btn-lg" id="submit-btn">
            Contiune
          </button>
        </div>
      </form>
      <p>
        Already have an account ? <RouterLink to="/login">Login</RouterLink>
      </p>
    </Content>
    <Teleport to="body">
      <Alert :show="hasFeedback" :mode="feedbackStyle" :msg="feedback" />
    </Teleport>
    <Modal classes="modal-otp bottom" :show="modalOtp">
      <h2>Confirm your number</h2>
      <p>
        Enter the 6 digit code send to<br /><strong>{{
          countryCode + mobile
        }}</strong>
      </p>
      <otp :digit-count="6" @update:otp="otpCode = $event"></otp>
      <button
        id="verify-btn"
        class="btn btn-primary btn-block btn-lg"
        @click="verifyOtp($event.target)"
      >
        Verify number
      </button>
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
</style>
