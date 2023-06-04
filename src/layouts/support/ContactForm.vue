<script>
import { useSupportStore } from "@/stores/useSupport.js";
import { useAlert } from "@/stores/useAlert"; 
export default { 
  data() {
    return {
      sending: false,
      request: {
        user: this.$auth.user_data,
        subject: "",
        message: "",
      },
    };
  },
  setup() {
    const storeSupport = useSupportStore();
    const errorStore = useAlert();
    return { storeSupport, errorStore };
  },
  methods: {
    pushAlert(error) {
      this.errorStore.style = "warning";
      this.errorStore.show = true;
      this.errorStore.masg = " اضاف " + error + "!";
    },
    seadRequest(ele) {
      if (this.request.subject <= 5) {
        this.pushAlert("الموضوع");
      } else if (this.request.message <= 5) {
        this.pushAlert("الرسالة");
      } else {
        this.sending = true;
        this.storeSupport
          .requestContent(this.request)
          .then(() => {
            this.sending = false;
            ele.reset();
            ele
              .querySelectorAll(
                ".app-field_input input,.app-field_input textarea"
              )
              .forEach((element) => {
                element.classList.remove("is-valid");
                element.classList.remove("is-invalid");
              });
          })
          .catch((error) => {
            ele.reset();
            ele
              .querySelectorAll(
                ".app-field_input input,.app-field_input textarea"
              )
              .forEach((element) => {
                element.classList.remove("is-valid");
                element.classList.remove("is-invalid");
              });
            this.sending = false;
          });
      }
    },
  },
};
</script>
<template>
  <div class="app-contact-info">
    {{  }}
    <ul>
      <li style="--icon-bg: var(--danger-tint); --icon-text: var(--danger)" v-if="this.$contactInfo['tel']">
        <a :href="'tel:'+ this.$contactInfo['tel']">
          <div class="icon"><Icon name="phone" /></div>
          <span class="title">اتصل بنا</span>
        </a>
      </li>
      <li style="--icon-bg: var(--info-tint); --icon-text: var(--info)"  v-if="this.$contactInfo['email']">
        <a :href="'mailto:' + this.$contactInfo['email']">
          <div class="icon"><Icon name="email" /></div>
          <span class="title">إيميل</span>
        </a>
      </li>
      <li style="--icon-bg: var(--success-tint); --icon-text: var(--success)"  v-if="this.$contactInfo['whatsapp']">
        <a :href="'https://wa.me/'+ this.$contactInfo['whatsapp']">
          <div class="icon"><Icon name="whatsapp" /></div>
          <span class="title">واتس اب</span>
        </a>
      </li>
    </ul>
  </div>
  <div class="app-contact-form">
    <form @submit.prevent="seadRequest($event.target)">
      <h2>طلب تواصل</h2>
      <field
        label="الموضوع"
        type="text"
        :length="5"
        v-model="request.subject"
      ></field>
      <field
        label="الرسالة"
        type="textarea"
        :length="5"
        v-model="request.message"
      ></field>
      <button
        class="btn btn-primary btn-block"
        type="submit"
        :disabled="sending"
      >
        <template v-if="!sending">ارسال</template>
        <template v-else>
        <Spinner class="spinner-sm" />
          ارسال...
        </template>
      </button>
    </form>
  </div>
</template>
