<script>
export default {
  inheritAttrs: false,
  props: {
    label: String,
    uploadig: {
      type: Boolean,
      default: false,
    },
    modelValue: "",
  },
  methods: {
    onChange(event) {
      this.$emit("update:modelValue", event.target.files);
    },
  },
};
</script>

<template>
  <div class="app-file">
    <input type="file" @change="onChange($event)" v-bind="$attrs" />
    <label class="app-label">
      <Icon name="upload" />
      <template v-if="uploadig">
        <Spinner class="spinner-sm" />رفع ...
      </template>
      <span class="app-label_text" v-else> {{ label }}</span>
    </label>
  </div>
</template>
