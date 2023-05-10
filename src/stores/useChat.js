import { defineStore } from "pinia";
import axios from "axios";
import { useAlert } from "@/stores/useAlert";
const alertStore = useAlert();
export const useChatStore = defineStore("chat", {
  state: () => ({
    list: null,
    total: "",
    singleChat: null,
  }),
  actions: {
    async checkChat(technician, order) {
      const response = await axios({
        method: "get",
        url: "wp-json/wp/v2/chat",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        params: {
          _fields: "id,acf",
          technician: technician,
          order_chat: order.id,
        },
      });
      return response;
    },
    async createChat(technician, order) {
      const response = await axios({
        method: "post",
        url: "wp-json/wp/v2/chat",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        params: {
          _fields: "id",
        },
        data: {
          status: "publish",
          title: "استفسار حل " + order.title.rendered,
          fields: {
            technician: technician,
            order: order.id,
          },
        },
      });
      return response;
    },
    async openChat(technician, order) {
      const getChatCheck = await this.checkChat(technician, order);
      if (getChatCheck.data.length) {
        this.router.push("/chat/" + getChatCheck.data[0].id);
      } else {
        const getChatCreate = await this.createChat(technician, order);
        this.router.push("/chat/" + getChatCreate.data.id);
      }
    },
    async ftechChats(user, currentPage, per_page) {
      if (user.role == "customer") {
        const response = await axios({
          method: "get",
          url: "/wp-json/wp/v2/chat",
          timeout: this.$timeoutRequest,
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          params: {
            _fields: "id,title,acf",
            page: currentPage ? currentPage : 1,
            per_page: per_page ? per_page : 10,
            author: user.user_data.id,
          },
        });
        if (response.data) {
          this.list = response.data;
          this.total = response.headers["x-wp-totalpages"];
        }
      }
      if (user.role == "technician") {
        const response = await axios({
          method: "get",
          url: "/wp-json/wp/v2/chat",
          timeout: this.$timeoutRequest,
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          params: {
            _fields: "id,title,acf",
            page: currentPage ? currentPage : 1,
            per_page: per_page ? per_page : 10,
            technician: user.user_data.id,
          },
        });
        if (response.data) {
          this.list = response.data;
          this.total = response.headers["x-wp-totalpages"];
        }
      }
    },
    async getChat(id) {
      const response = await axios({
        method: "get",
        timeout: this.$timeoutRequest,
        url: "/wp-json/wp/v2/chat/" + id,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        params: {
          _fields: "id,date,title,content,acf",
        },
      });
      if (response.data) {
        this.singleChat = response.data;
      }
    },
    async getMessages(chat) {
      const response = await axios({
        method: "get",
        timeout: this.$timeoutRequest,
        url: "/wp-json/wp/v2/comments/",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        params: {
          _fields: "id,date,content,author_avatar_urls",
          post: chat,
        },
      });
      return response;
    },
  },
});
