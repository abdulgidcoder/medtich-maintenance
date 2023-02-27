<script>
import MobileSelect from "mobile-select";
export default { 
  props: {
    data: Array,
    onChange: Function,
    value: String, 
  },
  setup(props, context) {
    const updateValue = (event) => {
      context.emit("update:modelValue", event.target.value);
    };
    return { updateValue };
  },
  data: () => ({
    msInstance: null,
    triggerDisplayValue: true,
    defalutPlaceholder: "Select",
  }),
  mounted() {
    this.triggerDisplayValue = !this.$slots.default;
    this.msInstance = new MobileSelect({
      cancelBtnText: "إلغاء",
      ensureBtnText: "اختيار",
      trigger: this.$refs.tirggerRef,
      wheels: [{data: this.data,},], 
      triggerDisplayValue: this.triggerDisplayValue, 
      onChange: this.onChange, 
    });
  },
  unmounted() {
    this.msInstance.destroy();
    this.msInstance = null;
  }, 
};
</script>
<template>
  <span ref="tirggerRef">
    <slot>{{ defalutPlaceholder }}</slot>
  </span>
</template>
<style>
.ms-mobile-select .ms-ensure{
  color: var(--primary);
}
</style>
