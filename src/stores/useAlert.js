import { defineStore } from "pinia";
export const useAlert = defineStore("alert", {
  state: () => ({
    masg: "",
    style: "",
    show: false,
  }),
});
