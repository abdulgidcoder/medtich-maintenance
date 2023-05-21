<script setup>
import { watch } from "vue";
import { useAlert } from "@/stores/useAlert";
const alertStore = useAlert();

watch(
  () => alertStore.show,
  () => {
    let alertSettime = () => {
      setTimeout(function () {
        alertStore.show = false;
        alertStore.style = "";
        alertStore.masg = "";
      }, 5000);
    };
    if (alertStore.show == true) {
      clearTimeout(alertSettime);
      alertSettime();
    }
  }
);
</script>
<template>
  <Teleport to="body">
    <Alert
      :show="alertStore.show"
      :mode="alertStore.style"
      :msg="alertStore.masg"
    />
  </Teleport>
</template>
