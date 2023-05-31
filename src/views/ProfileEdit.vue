<script>
import { useAuthStore } from "@/stores/useAuth";
import { useMediaStore } from "@/stores/useMedia";
import { useAlert } from "@/stores/useAlert";

import UserInfo from "@/layouts/auth/UserInfo.vue";

export default {
  components: { UserInfo },
  data() {
    return {
      user: {
        username: "",
        name: "",
        area: "",
        specialization: "",
        cv: "",
      },
      citieselected: "",
      spacSelected: "",
      deleteModal: false,
      uploadig: false,
      updating: false,
    };
  },
  setup() {
    const authStore = useAuthStore();
    const mediaStore = useMediaStore();
    const alertStore = useAlert();
    return {
      authStore,
      alertStore,
      mediaStore,
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
    chooseArea(data) {
      this.user.area = data[0].id;
    },
    chooseSpac(data) {
      this.user.specialization = data[0].id;
    },
    async uploadFiles(input) {
      this.uploadig = true;
      const files = input.target.files;
      await this.mediaStore.upload(files).then((response) => {
        this.alertStore.masg = "تم رفع السيرة الذاتية";
        this.alertStore.style = "success";
        this.alertStore.show = true;
        this.uploadig = false;
        this.user.cv = response[0].id;
      });
    },
    edit_user() {
      this.updating = true;
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
          this.alertStore.masg = "نجاح تحديث الملف الشخصي";
          this.alertStore.style = "success";
          this.alertStore.show = true;
          this.updating = false;
        })
        .catch((error) => {
          this.updating = false;
          this.alertStore.style = "danger";
          this.alertStore.show = true;
          if (error.response) {
            let mesg = JSON.stringify(error.response.data.message);
            this.alertStore.masg = mesg;
          } else {
            this.alertStore.masg = error;
          }
        });
    },
    delete_account() {
      this.authStore
        .deleteUser()
        .then(() => {
          this.alertStore.style = "success";
          this.alertStore.show = true;
          this.alertStore.masg = "تم حذف حسابك";
          this.deleteModal = false;
          this.$router.push({ name: "logout" });
        })
        .catch((error) => {
          this.alertStore.style = "danger";
          this.alertStore.show = true;
          this.alertStore.masg = "لم يتم حذف حسابك";
          this.deleteModal = false;
        });
    },
  },
};
</script>
<template>
  <Page class="app-profile-page">
    <Head title="تعديل حسابى" goBack="true"></Head>
    <Content :isBoxed="true" :bottomBar="true">
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
          <Select
            :onChange="chooseArea"
            :data="this.$cities"
            class="app-select"
            >{{
              this.user.area ? $nameCity(this.user.area) : "اختار منظقتك"
            }}</Select
          >
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
          v-if="this.$auth.role == 'technician'"
          :label="
            this.$auth.user_data?.acf['cv']
              ? 'قم بتحديث سيرتك الذاتية'
              : 'رفع السيرة الذاتية'
          "
          accept=".pdf"
          @change="uploadFiles"
          :uploadig="uploadig"
        />
        <FileBox
          v-if="
            this.$auth.user_data?.acf['cv'] && this.$auth.role == 'technician'
          "
          :icon="this.$auth.user_data?.acf['cv'].icon"
          :name="this.$auth.user_data?.acf['cv'].filename"
          :size="this.$auth.user_data?.acf['cv'].filesize"
        />
        <button
          class="btn btn-outline-danger btn-block delete-modal"
          @click="() => (this.deleteModal = true)"
          type="button"
        >
          حذف الحساب
        </button>
        <div class="app-fixed-bottom">
          <button
            class="btn btn-primary btn-block"
            type="submit"
            :disabled="updating"
          >
            <template v-if="updating">
              <Spinner class="spinner-sm"></Spinner>تحديث...
            </template>
            <template v-else> تحديث </template>
          </button>
        </div>
      </form>
    </Content>
    <Modal
      class="modal-delete-account center"
      :show="deleteModal"
      animation="fadeIn"
      @dismiss="this.deleteModal = false"
    >
      <h2>هل تريد حقاََ حذف حساب؟</h2>
      <p><strong>تحذير:</strong> سوف يتم حذف جميع بياناتك</p>
      <button class="btn btn-sm btn-danger" @click="delete_account">
        حذف الحساب
      </button>
      <button
        class="btn btn-sm btn-secondary"
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
</style>
