<script>
import { useAuthStore } from "@/stores/useAuth";
import { StatusBar, Style } from "@capacitor/status-bar";
import { Capacitor } from "@capacitor/core";
import { useAlert } from "@/stores/useAlert";
export default {
  data() {
    return {
      mobile: "",
      password: "",
      login: false,
    };
  },
  setup() {
    const authStore = useAuthStore(),
      alertStore = useAlert();
    return { authStore, alertStore };
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
        this.login = true;
        this.authStore
          .login(this.mobile, this.password)
          .then((response) => {
            this.alertStore.show = true;
            this.alertStore.style = "success";
            this.alertStore.masg = "تسجيل الدخول بنجاح";
            this.login = false;
            this.$router.push({ name: "home" });
          })
          .catch((error) => {
            ele.reset();
            (this.mobile = ""), (this.password = ""), (this.login = false);
            this.alertStore.show = true;
            this.alertStore.style = "danger";
            let mesg1 = error.response.data.message;
            let mesg2 = error.response.data.data.message;
            if (mesg1) {
              this.alertStore.masg = mesg1;
            } else if (mesg2) {
              this.alertStore.masg = mesg2;
            }
          });
      } else if (!this.mobile && !this.password) {
        this.alertStore.show = true;
        this.alertStore.masg = "رقم الجوال وكلمة المرور فارغين!";
        this.alertStore.style = "danger";
      } else if (!this.mobile) {
        this.alertStore.show = true;
        this.alertStore.masg = "الجوال فارغ!";
        this.alertStore.style = "danger";
      } else if (!this.password) {
        this.alertStore.show = true;
        this.alertStore.masg = "كلمة المرور فارغة!";
        this.alertStore.style = "danger";
      }
    },
  },
};
</script>

<template>
  <Page class="app-page-auth">
    <Content>
      <AppLogo />
      <h1>مرحبًا بعودتك</h1>
      <form @submit.prevent="handleSubmit($event.target)">
        <Field
          v-model="mobile"
          type="tel"
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
          <RouterLink to="/reset-password">نسيت كلمة المرور ؟</RouterLink>
        </div>
        <div class="app-field-submit">
          <button class="btn btn-primary btn-block" :disabled="login">
            <template v-if="login"
              ><Spinner class="spinner-sm" /> دخول...
            </template>
            <template v-else>دخول</template>
          </button>
        </div>
      </form>
      <p>
        لا تملك حسابا حتى الآن؟
        <RouterLink to="/register">تسجيل</RouterLink>
      </p>
    </Content>
  </Page>
</template>
