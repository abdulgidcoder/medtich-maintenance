import { defineStore } from "pinia";
import axios from "axios";
import { useError } from "@/stores/useError";
const error = useError();
export const useSupportStore = defineStore("support", {
  state: () => ({
    list: null,
    total: "",
  }),
  actions: {
    async ftechFaq(currentPage, per_page) {
      const response = await axios({
        method: "get",
        timeout: 2000,
        url: "wp-json/wp/v2/faq",
        params: {
          _fields: "id,title,content",
          page: currentPage,
          orderby: "modified",
          per_page: per_page,
        },
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }).then((response) => {
        this.list = response.data;
        this.total = response.headers["x-wp-totalpages"];
      });
    },
    async requestContent(request) {
      const response = await axios({
        method: "post",
        url: "wp-json/contact-form-7/v1/contact-forms/214/feedback",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        data: {
          "user-id": request.user.id,
          "user-name": request.user.name,
          "user-tel": request.user.username,
          subject: request.subject,
          message: request.message,
        },
      }).then((response) => {
        error.masg = response.data.message;
        error.style = "success";
        error.show = true;
      });
    },
  },
});
