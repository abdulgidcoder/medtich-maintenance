import { defineStore } from "pinia";
import axios from "axios";
import { useAlert } from "@/stores/useAlert";

export const useMediaStore = defineStore("media", {
  state: () => ({}),
  actions: {
    async upload(files) {
      const alertStore = useAlert();
      const formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        formData.append(`file[${i}]`, files[i]);
      }
      const response = await axios({
        method: "post",
        url: "wp-json/app/v1/files",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Content-Type": "multipart/form-data",
        },
        data: formData,
      });
      for (let i = 0; i < response.data.length; i++) {
        return response.data;
      }
    },
  },
});
