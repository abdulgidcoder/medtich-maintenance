<script>
import { defineAsyncComponent } from "vue";

export default {
  components: {
    NewForm: defineAsyncComponent(() => import("@/layouts/orders/NewForm.vue")),
  },
  data() {
    return {
      isOpened: false,
    };
  },
};
</script>
<template>
  <div v-if="this.$auth.role == 'customer'">
    <button class="app-tab-btn" @click="this.isOpened = true">
      <a>
        <Icon name="plus-circle" />
        <span class="title">طلب جديد</span>
      </a>
    </button>
    <Modal
      class="page"
      :show="isOpened"
      animation="fadeUp"
      @dismiss="this.isOpened = false"
    >
      <Head title="إضافة طلب جديد">
        <template #left>
          <button
            @click="this.isOpened = false"
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
  </div>
</template>
