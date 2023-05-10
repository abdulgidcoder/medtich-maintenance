<script>
export default {
  props: {
    location: Object,
  },
  emits: ["setLocation"],
  data() {
    return {
      Modal: false,
      adding: false,
    };
  },
  setup() {},
  methods: {
    addLocation(){
      this.Modal = false;
      this.$emit('setLocation');
    }
  },
};
</script>
<template> 
  <button
    class="btn"
    :class="{ 'btn-primary': location.latitude && location.longitude }"
    type="button"
    @click="!location.latitude &&  !location.longitud ? this.Modal = true : false"
  >
    <Icon name="location" />
    {{ location.latitude && location.longitude ? "تم إضافة عنوانك" : "إضافة العنوان الحالى" }}
  </button> 
  <Modal
    class="center"
    :show="Modal"
    animation="fadeIn"
    @closeModal="this.Modal = false"
  >
  <h2>إضافة العنوان الحالى</h2>
  <p>تاكد من فتح تحديد الموقع اولاَ</p>
  <div class="form-actions">
    <button class="btn btn-primary btn-sm"  @click="addLocation" :disabled="adding">
      <template v-if="!adding">إضافة العنوان</template>
      <template v-else>
          <Spinner class="spinner-border-sm" />
        إضافة...
      </template>
    </button>
    <button class="btn btn-sm" type="button" @click="this.Modal = false">
      إلغاء
    </button>
  </div> 
  </Modal>
</template>
<style scoped lang="scss">
.add-offer-modal {
  h2 {
    text-align: center;
    color: var(--primary);
    margin-bottom: 15px;
  }
}
</style>
