<script>
export default {
   inheritAttrs: false,
  props: {
    label: String,
    name: String,
    required: String,
    checked: Boolean,
  },
  computed: {
    model: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      },
    },
  },
};
</script>

<template>
  <div class="app-checkbox">
    <input
      type="checkbox"
      :id="name"
      :checked="checked"
      @input="(event) => $emit('update:modelValue', event.target.checked)"
      :required="required"
    />
    <label class="app-label" :for="name">{{ label }}</label>
    <span class="checkmark"></span>
  </div>
</template>
