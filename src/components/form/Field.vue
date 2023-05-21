<script>
import { useAlert } from "@/stores/useAlert";
export default {
  data() {
    return {};
  },
  props: {
    label: String,
    type: String,
    placeholder: String,
    icon: String,
    required: Boolean,
    pattern: String,
    readonly: Boolean,
    modelValue: "",
    length: Number,
    append: String
  },
  setup(props, context) {
    const error = useAlert();
    const updateValue = (event) => {
      let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (props.length) {
        if (props.modelValue.length + 1 >= props.length) {
          event.target.classList.remove("is-invalid");
          event.target.classList.add("is-valid");
          error.show = false;
        } else {
          event.target.classList.remove("is-valid");
          event.target.classList.add("is-invalid");
          error.style = "warning";
          error.show = true;
          error.masg = `عدد ${
            props.type == "tel" || props.type == "number" ? "الارقام" : "الحروف"
          } اقل من ${props.length}`;
        }
      }
      if (props.type == "email") {
        if (props.modelValue.match(mailformat)) {
          event.target.classList.remove("is-invalid");
          event.target.classList.add("is-valid");
          error.show = false;
        } else {
          error.style = "warning";
          error.show = true;
          error.masg = "البريد الالكترونى غير صالح";
          event.target.classList.remove("is-valid");
          event.target.classList.add("is-invalid");
        }
      }
      context.emit("update:modelValue", event.target.value);
    };
    return { updateValue, error };
  },
  methods: {
    showContextMenu(event) {
      return true;
    },
  },
};
</script>

<template>
  <div class="app-field" :class="[{ 'field-icon': icon },{'append':append}, type]">
    <label class="app-field_label"
      >{{ label }}<span v-if="required" class="required">*</span></label
    >
    <div class="app-field_input">
      <input
        v-if="type !== 'textarea' && type !== 'date'"
        :type="type"
        :placeholder="placeholder"
        :value="modelValue"
        @input="updateValue"
        :readonly="readonly"
        :pattern="pattern"
        ref="input"
        @contextmenu="showContextMenu"
      />
      <textarea
        v-if="type == 'textarea'"
        class="app-field_textarea"
        :placeholder="placeholder"
        :value="modelValue"
        @input="updateValue"
        :pattern="pattern"
        ref="input"
        @contextmenu="showContextMenu"
      >
      </textarea>
      <input
        v-if="type == 'date'"
        type="date"
        :placeholder="placeholder"
        :value="modelValue"
        @input="updateValue"
        :readonly="readonly"
        :pattern="pattern"
        ref="input"
        @contextmenu="showContextMenu"
      />
      <div class="app-field_icon" :class="type" v-if="icon">
        <Icon :name="icon" />
      </div>      
      <div class="app-field_append" v-if="append">{{append}}</div>
    </div>
  </div>
</template>
