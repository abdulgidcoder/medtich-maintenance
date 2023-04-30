<script>
import AddForm from "../orders/AddForm.vue";
export default {
  components: {
    AddForm,
  },
};
</script>
<template>
  <div class="app-tab-view app-my-orders-page">
    <Head title="إضافة طلب جديد" />
    <Content :isBoxed="true">
      <add-form />
    </Content>
  </div>
</template>
