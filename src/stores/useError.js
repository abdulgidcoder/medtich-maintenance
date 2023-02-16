import { defineStore } from "pinia";
export const useError = defineStore("error", {
  state: () => ({
    masg: "",
    style: "",
    show: false,
  }) 
});
