<script>
export default {
  data() {
    return {
      phoneNumber: "",
      isValidPhoneNumber: true,
    };
  },
  props: {
    label: { type: String },
    type: { type: String },
    placeholder: { type: String },
    icon: { type: String },
    required: { type: String },
    pattern: { type: String },
    readonly: Boolean,
    modelValue: "",
  },
  setup(props, context) {
    const updateValue = (event) => {
      context.emit("update:modelValue", event.target.value);
    };
    return { updateValue };
  },
  methods: {},
};
</script>

<template>
  <div class="app-field" :class="{ 'field-icon': icon }">
    <label class="app-field_label">{{ label }}</label>
    <div class="app-field_input">
      <input
        v-if="type != 'textarea'"
        :type="type"
        :placeholder="placeholder"
        :value="modelValue"
        @input="updateValue"
        :required="required"
        :readonly="readonly"
        :pattern="pattern"
        ref="input"
      />
      <textarea
        v-if="type == 'textarea'"
        class="app-field_textarea"
        :placeholder="placeholder"
        :value="modelValue"
        @input="updateValue"
        :required="required"
        :pattern="pattern"
        ref="input"
      ></textarea>
      <div class="app-field_icon" :class="type" v-if="icon">
        <Icon :name="icon" />
      </div>
    </div>
  </div>
</template>
