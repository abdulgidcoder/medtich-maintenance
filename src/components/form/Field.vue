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
    modelValue: "",
  },
  setup(props, context) {
    const updateValue = (event) => {
      context.emit("update:modelValue", event.target.value);
    };
    return { updateValue };
  },
  methods: {
    togglePassword(ele) {
      if (this.type === "password") {
        console.log(ele);
      }
    },
  },
};
</script>

<template>
  <div class="app-field">
    <label class="app-field_label">{{ label }}</label>
    <div class="app-field_input">
      <input
        class="app-field_input"
        :type="type"
        :placeholder="placeholder"
        :value="modelValue"
        @input="updateValue"
        :required="required"
        :pattern="pattern"
        ref="input"
      />
      <div class="app-field_icon" :class="type">
     <Icon :name="icon"/>
      </div>
    </div>
  </div>
</template>
