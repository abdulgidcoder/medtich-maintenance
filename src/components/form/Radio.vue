<script>
export default {
  props: {
    label: String,
    name: String,
    data: Array,
    required: Boolean,
    modelValue: "",
  },
  setup(props, context) {
    const updateValue = (event) => {
      context.emit("update:modelValue", event.target.value);
    };
    return { updateValue };
  },
};
</script>
<template>
  <div class="app-field app-radio-group">
      <label class="app-field_label">{{ label }}<span v-if="required" class="required">*</span></label> 
    <div class="app-radio-group-container">
      <label class="app-radio" v-for="(item, index) in data" :key="index"
      :for="item.value"
        >{{ item.label }}
        <input
          type="radio"
          :name="name"
          :id="item.value"
          :value="item.value"
          :checked="item.value == this.modelValue"
          @change="updateValue"
        />
        <span class="checkmark"></span>
      </label>
    </div>
  </div>
</template>
