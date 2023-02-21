<script>
export default {
  props: {
    label: String,
    required: String,
    multiple: String,
    accept: String,
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
    <input
      type="file"
      :required="required"
      :multiple="multiple"
      :accept="accept"
      @change="onChange($event)"
    />
    <label class="app-label"><Icon name="upload" /><span class="app-label_text">{{ label }}</span></label>
  </div>
</template>
