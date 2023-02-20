<script setup>
import { watch } from "vue";
import { useError } from "@/stores/useError";

const error = useError();

watch(
  () => error.show,
  () => {
    setTimeout(function () {
      error.show = false;
      error.style = "";
      error.masg = "";
    }, 4000);
  }
);
</script>
<template>
  <Teleport to="body">
    <Alert :show="error.show" :mode="error.style" :msg="error.masg" />
  </Teleport>
</template>
