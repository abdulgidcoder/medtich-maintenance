<script>  
import AddForm from '../orders/AddForm.vue';
export default {
  props: { show: Boolean },
  components: {  
    AddForm,
  },
  data() {
    return {
      auth_user: this.$auth,
    };
  },
  created(){
  
  }
};
</script>
<template> 
  <div class="app-tab-view app-my-orders-page">
    <Head title="إضافة طلب جديد" />
    <Content :isBoxed="true">
     <add-form/>
    </Content>
  </div>
</template>
