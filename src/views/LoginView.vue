<script>
import TopBar from "../components/auth/TopBar.vue";
import { useAuthStore } from "@/stores/useAuth";
export default {
  components: {
    TopBar,
  },
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
  },
  methods: {
    handleSubmit(ele) {
      if (this.mobile && this.password) {
        const btnSubmit = ele.querySelectorAll(".submit-btn");
        btnSubmit.forEach((btn) => {
          btn.disabled = true;
          btn.innerHTML =
            "<span class='spinner-border spinner-border-sm' role='status' aria-hidden='true'></span> Logging...";
        });
        useAuthStore()
          .login(this.mobile, this.password)
          .then((response) => {
            this.hasFeedback = true;
            this.feedbackStyle = "alert-success";
            this.feedback = "Login Success";
            btnSubmit.forEach((btn) => {
              btn.innerHTML = "Logined";
            });
            this.$router.push({ name: "home" });
          })
          .catch((error) => {
            ele.reset();
            btnSubmit.forEach((btn) => {
              btn.disabled = false;
              btn.innerHTML = "Login";
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
        this.feedback = "mobile number and password are empty!";
        this.feedbackStyle = "danger";
      } else if (!this.mobile) {
        this.hasFeedback = true;
        this.feedback = "mobile is empty!";
        this.feedbackStyle = "danger";
      } else if (!this.password) {
        this.hasFeedback = true;
        this.feedback = "password is empty!";
        this.feedbackStyle = "danger";
      }
    },
  },
};
</script>

<template>
  <Page class="app-page-auth">
    <!-- <TopBar /> -->
    <Content>
      <AppLogo />
      <h1>Welcome back</h1>
      <form @submit.prevent="handleSubmit($event.target)">
        <Field
          v-model="mobile"
          type="number"
         placeholder="050 XXX XXXX"
          label="Mobile"
          icon="mobile"
        />
        <Field
          v-model="password"
          type="password"
          placeholder="*********"
          label="Password"
          icon="password"
        />
        <!-- <div class="app-forget-password">
            <RouterLink to="/resetpassword">Forget Password ?</RouterLink>
          </div> -->
        <div class="app-field-submit">
          <button class="btn btn-primary btn-block btn-lg submit-btn">
            Login
          </button>
        </div>
      </form>
      <p>
        Don't have an account yet?
        <RouterLink to="/register">Register</RouterLink>
      </p>
    </Content>
    <Teleport to="body">
      <Alert :show="hasFeedback" :mode="feedbackStyle" :msg="feedback" />
    </Teleport>
  </Page>
</template>
