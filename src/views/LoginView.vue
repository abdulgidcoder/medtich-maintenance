<script>
import { useAuthStore } from "@/stores/useAuth";
import { StatusBar, Style } from "@capacitor/status-bar";
import { Capacitor } from "@capacitor/core";
import { useAlert } from "@/stores/useAlert";
export default {
  data() {
    return {
      mobile: "010327004",
      password: "123456789",
      hasFeedback: false,
      feedbackStyle: "",
      feedback: "",
    };
  },
  setup() {
    const auth = useAuthStore(),
      errorStore = useAlert();
    return { auth, errorStore };
  },
  created() {
    document.title = "Login";
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
  methods: {
    handleSubmit(ele) {
      if (this.mobile && this.password) {
        const btnSubmit = ele.querySelectorAll(".submit-btn");
        btnSubmit.forEach((btn) => {
          btn.disabled = true;
          btn.innerHTML =
            "<span class='spinner-border spinner-sm' role='status' aria-hidden='true'></span> دخول...";
        });
        useAuthStore()
          .login(this.mobile, this.password)
          .then((response) => {
            this.errorStore.show = true;
            this.errorStore.style = "success";
            this.errorStore.masg = "تسجيل الدخول بنجاح";
            btnSubmit.forEach((btn) => {
              btn.innerHTML = "تسجيل الدخول";
            });
            this.$router.push({ name: "home" });
          })
          .catch((error) => {
            ele.reset();
            (this.mobile = ""),
              (this.password = ""),
              btnSubmit.forEach((btn) => {
                btn.disabled = false;
                btn.innerHTML = "دخول";
              });
            this.errorStore.show = true;
            this.errorStore.style = "danger";
            let mesg1 = error.response.data.message;
            let mesg2 = error.response.data.data.message;
            if (mesg1) {
              this.errorStore.masg = mesg1;
            } else if (mesg2) {
              this.errorStore.masg = mesg2;
            }
          });
      } else if (!this.mobile && !this.password) {
        this.errorStore.show = true;
        this.errorStore.masg = "رقم الجوال وكلمة المرور فارغين!";
        this.errorStore.style = "danger";
      } else if (!this.mobile) {
        this.errorStore.show = true;
        this.errorStore.masg = "الجوال فارغ!";
        this.errorStore.style = "danger";
      } else if (!this.password) {
        this.errorStore.show = true;
        this.errorStore.masg = "كلمة المرور فارغة!";
        this.errorStore.style = "danger";
      }
    },
  },
};
</script>

<template>
  <Page class="app-page-auth">
    <Content :disableOffline="true">
      <AppLogo />
      <h1>مرحبًا بعودتك</h1>
      <form @submit.prevent="handleSubmit($event.target)">
        <Field
          v-model="mobile"
          type="number"
          placeholder="01X XXX XXX XX"
          label="الهاتف"
          icon="mobile"
        />
        <Field
          v-model="password"
          type="password"
          placeholder="*********"
          label="كلمة المرور"
          icon="password"
        />
        <div class="app-forget-password">
          <RouterLink to="/resetpassword">نسيت كلمة المرور ؟</RouterLink>
        </div>
        <div class="app-field-submit">
          <button class="btn btn-primary btn-block btn-lg submit-btn">
            دخول
          </button>
        </div>
      </form>
      <p>
        لا تملك حسابا حتى الآن؟
        <RouterLink to="/register">تسجيل</RouterLink>
      </p>
    </Content>
    <Teleport to="body">
      <Alert :show="hasFeedback" :mode="feedbackStyle" :msg="feedback" />
    </Teleport>
  </Page>
</template>
