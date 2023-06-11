import { defineStore } from "pinia";
import axios from "axios";
import { useAuthStore } from "@/stores/useAuth";

export const useChatStore = defineStore("chat", {
  state: () => ({
    list: null,
    total: "",
    messages: null,
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
          title: "استفسار عن " + order.title.rendered,
          fields: {
            technician: technician,
            order: order.id,
            technician_new_messages: 0,
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
        await this.createMeassage(
          getChatCreate.data.id,
          "استفسار عن " + order.title.rendered
        );
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
            _fields: "id,modified,title,acf,last_comment,author_chat",
            orderby: "modified",
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
            _fields: "id,modified,title,acf,last_comment,author_chat",
            orderby: "modified",
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
    async newMessages() {
      let authStore = useAuthStore();
      if (authStore.role == "customer") {
        const response = await axios({
          method: "get",
          url: "/wp-json/wp/v2/chat",
          timeout: this.$timeoutRequest,
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          params: {
            _fields: "acf.customer_new_messages,author",
            author: authStore.user_data.id,
            customer_messages: true,
          },
        });
        if (response.data) {
          this.messages = response.headers["x-wp-total"];
        }
      }
      if (authStore.role == "technician") {
        const response = await axios({
          method: "get",
          url: "/wp-json/wp/v2/chat",
          timeout: this.$timeoutRequest,
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          params: {
            _fields: "acf.technician_new_messages,technician",
            technician: authStore.user_data.id,
            tech_messages: true,
          },
        });
        if (response.data) {
          this.messages = response.headers["x-wp-total"];
        }
      }
    },
    async getChat(id) {
      const response = await axios({
        method: "get",
        url: "/wp-json/wp/v2/chat/" + id,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        params: {
          _fields: "id,date,title,content,acf,author_chat",
        },
      });
      if (response.data) {
        this.singleChat = response.data;
      }
      return response;
    },
    async getMessages(chat, per_page, offset) {
      const response = await axios({
        method: "get",
        url: "/wp-json/wp/v2/comments/",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        params: {
          _fields: "id,date,content,author",
          per_page: per_page,
          offset: offset,
          post: chat,
        },
      });
      return response;
    },
    async pushMessage(id) {
      let authStore = useAuthStore();
      let getChatData = await this.getChat(id);
      if (authStore.role == "customer") {
        let newValTechnician =
          Number(getChatData.data.acf.technician_new_messages) + 1;
        const response = await axios({
          method: "post",
          url: "/wp-json/wp/v2/chat/" + id,
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          params: {
            _fields: "id,acf.technician_new_messages",
          },
          data: {
            fields: {
              technician_new_messages: newValTechnician,
            },
          },
        });
        return response;
      }
      if (authStore.role == "technician") {
        let newValCutomer =
          Number(getChatData.data.acf.customer_new_messages) + 1;
        const response = await axios({
          method: "post",
          url: "/wp-json/wp/v2/chat/" + id,
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          params: {
            _fields: "id,acf.customer_new_messages",
          },
          data: {
            fields: {
              customer_new_messages: newValCutomer,
            },
          },
        });
        return response;
      }
    },
    async createMeassage(chat, message) {
      const response = await axios({
        method: "post",
        url: "wp-json/wp/v2/comments",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        params: {
          _fields: "id,date,content,author",
        },
        data: {
          post: chat,
          content: message,
        },
      });
      await this.pushMessage(chat);
      return response;
    },
    async seenMessage(id) {
      let authStore = useAuthStore();
      if (authStore.role == "customer") {
        const response = await axios({
          method: "post",
          url: "/wp-json/wp/v2/chat/" + id,
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          params: {
            _fields: "id,acf.technician_new_messages",
          },
          data: {
            fields: {
              customer_new_messages: "",
            },
          },
        });
        return response;
      }
      if (authStore.role == "technician") {
        const response = await axios({
          method: "post",
          url: "/wp-json/wp/v2/chat/" + id,
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          params: {
            _fields: "id,acf.customer_new_messages",
          },
          data: {
            fields: {
              technician_new_messages: "",
            },
          },
        });
        return response;
      }
    },
  },
});
