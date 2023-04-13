<script> 
import { useAuthStore } from "@/stores/useAuth";
import { StatusBar, Style } from "@capacitor/status-bar";
export default { 
  data() {
    return {
      mobile: "",
      password: "",
      hasFeedback: false,
      feedbackStyle: "",
      feedback: "",
    };
  },
  setup() {
    const auth = useAuthStore();
    return { auth };
  },
  created() {
    document.title = "Login";
   StatusBar.setStyle({ style: Style.Light });
    StatusBar.setBackgroundColor({
      color: "#f4f8ff",
    });
  }, 
  beforeUnmount() {
    StatusBar.setStyle({ style: Style.Dark });
    StatusBar.setBackgroundColor({
      color: "#00d9c8",
    });
  },
  methods: {
    handleSubmit(ele) {
      if (this.mobile && this.password) {
        const btnSubmit = ele.querySelectorAll(".submit-btn");
        btnSubmit.forEach((btn) => {
          btn.disabled = true;
          btn.innerHTML =
            "<span class='spinner-border spinner-border-sm' role='status' aria-hidden='true'></span> دخول...";
        });
        useAuthStore()
          .login(this.mobile, this.password)
          .then((response) => {
            this.hasFeedback = true;
            this.feedbackStyle = "alert-success";
            this.feedback = "تسجيل الدخول بنجاح";
            btnSubmit.forEach((btn) => {
              btn.innerHTML = "تسجيل الدخول";
            });
            this.$router.push({ name: "home" });
          })
          .catch((error) => {
            ele.reset();
            btnSubmit.forEach((btn) => {
              btn.disabled = false;
              btn.innerHTML = "دخول";
            });
            this.hasFeedback = true;
            this.feedbackStyle = "danger";
            let mesg1 = error.response.data.message;
            let mesg2 = error.response.data.data.message;
            if (mesg1) {
              this.feedback = mesg1;
            } else if (mesg2) {
              this.feedback = mesg2;
            }
          });
      } else if (!this.mobile && !this.password) {
        this.hasFeedback = true;
        this.feedback = "رقم الجوال وكلمة المرور فارغين!";
        this.feedbackStyle = "danger";
      } else if (!this.mobile) {
        this.hasFeedback = true;
        this.feedback = "الجوال فارغ!";
        this.feedbackStyle = "danger";
      } else if (!this.password) {
        this.hasFeedback = true;
        this.feedback = "كلمة المرور فارغة!";
        this.feedbackStyle = "danger";
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
