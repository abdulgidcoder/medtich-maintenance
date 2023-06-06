<script>
import { defineAsyncComponent } from "vue";

export default {
  components: {
    NewForm: defineAsyncComponent(() => import("@/layouts/orders/NewForm.vue")),
  },
  data() {
    return {
      Modal: false,
    };
  },
};
</script>
<template>
  <template v-if="this.$auth.role == 'customer'">
    <button class="app-tab-btn" @click="this.Modal = true">
      <a>
        <Icon name="plus-circle" />
        <span class="title">طلب جديد</span>
      </a>
    </button>
    <Modal
      class="page"
      :show="Modal"
      animation="fadeUp"
      @dismiss="this.Modal = false"
    >
      <Head title="إضافة طلب جديد">
        <template #left>
          <button
            @click="this.Modal = false"
            class="app-btn-back"
            type="button"
          >
            <Icon name="times" />
          </button>
        </template>
      </Head>
      <Content :isBoxed="true" :bottomBar="true">
        <NewForm />
      </Content>
    </Modal>
  </template>
</template>
