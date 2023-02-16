<script setup>
import { ref, reactive } from "vue";

const props = defineProps({
  default: String,
  digitCount: {
    type: Number,
    required: true,
  },
});

const digits = reactive([]);
const otpCont = ref(null);
const emit = defineEmits(["update:otp"]);

const isDigitsFull = function () {
  for (const elem of digits) {
    if (elem == null || elem == undefined) {
      return false;
    }
  }

  return true;
};
if (props.default && props.default.length === props.digitCount) {
  for (let i = 0; i < props.digitCount; i++) {
    digits[i] = props.default.charAt(i);
  }
} else {
  for (let i = 0; i < props.digitCount; i++) {
    digits[i] = null;
  }
}
const handleKeyDown = function (event, index) {
  if (
    event.key !== "Tab" &&
    event.key !== "ArrowRight" &&
    event.key !== "ArrowLeft"
  ) {
    event.preventDefault();
  }

  if (event.key === "Backspace") {
    digits[index] = null;

    if (index != 0) {
      otpCont.value.children[index - 1].focus();
    }

    return;
  }

  if (new RegExp("^([0-9])$").test(event.key)) {
    digits[index] = event.key;

    if (index != props.digitCount - 1) {
      otpCont.value.children[index + 1].focus();
    }
  }
  if (isDigitsFull()) {
    emit("update:otp", digits.join(""));
  }
};
</script>
<template>
  <div ref="otpCont" class="digit-box">
    <input
      type="text"
      class="digit-box_input"
      v-for="(el, ind) in digits"
      :key="el + ind"
      v-model="digits[ind]"
      :autofocus="ind === 0"
      :placeholder="ind + 1"
      maxlength="1"
      @keydown="handleKeyDown($event, ind)"
    />
  </div>
</template>
<style scoped lang="scss">
.digit-box {
  margin-bottom: 15px;
  display: flex;
  justify-content: space-between;
}
.digit-box_input {
  height: 40px;
  width: 40px;
  padding: 10px;
  text-align: center;
  font-size: 16px;
  color: var(--primary);
}

.digit-box_input:focus {
  outline: 1px solid var(--primary);
}
</style>
