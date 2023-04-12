import { defineStore } from "pinia";
import axios from "axios";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    connection: true,
    loggedIn: localStorage.getItem("token") ? true : false,
    user_data: localStorage.getItem("userData")
      ? JSON.parse(localStorage.getItem("userData"))
      : {},
  }), 
  getters: {},
  actions: {
    async register(name, username, password, roleUser) {
      const response = await axios({
        method: "post",
        url: "",
        data: {
          AUTH_KEY:
            roleUser == "technician"
              ? "397R{6;d@cTB|p2vaMeA^Pm};B8"
              : roleUser == "customer"
              ? "NQhJr6{~K9=/TXeh(QXEdA8Yp|lz"
              : "397R{6;d@cTB|p2vaMeA^Pm};B8",
          user_login: username,
          email: username + "@medtich-eg.com",
          display_name: name,
          password: password,
        },
        params: {
          rest_route: "/auth/users",
        },
      });
      if (response.status && response.status == 200) {
        let token = `${response.data.jwt}`;
        localStorage.setItem("token", token);
        axios.defaults.headers.common["Authorization"] = "Bearer " + token;
        await this.ftechUser();
      }
    },
    async autoLogin() {
      const userToken = localStorage.getItem("token");
      if (userToken) {
        try {
          const response = await axios({
            method: "POST",
            url: "",
            params: {
              rest_route: "/auth/auth/refresh",
              jwt: userToken,
              AUTH_KEY: "397R{6;d@cTB|p2vaMeA^Pm};B8",
            },
          });
          let token = `${response.data.data.jwt}`;
          localStorage.setItem("token", token);
          await this.ftechUser();
        } catch (error) {
          localStorage.removeItem("token");
          localStorage.removeItem("userData");
          this.loggedIn = false;
          router.push("/login");
        }
      } else {
        this.loggedIn = false;
      }
    },
    async login(mobile, password) {
      const response = await axios({
        method: "post",
        url: "",
        headers: {
          // "Content-Type": "application/json",
        },
        params: {
          rest_route: "/auth/auth",
        },
        data: {
          AUTH_KEY: "397R{6;d@cTB|p2vaMeA^Pm};B8",
          username: mobile,
          password: password,
        },
      });
      if (response && response.data.data.jwt) {
        let token = `${response.data.data.jwt}`;
        localStorage.setItem("token", token);
        axios.defaults.headers.common["Authorization"] = "Bearer " + token;
        await this.ftechUser();
      }
    },
    async logout() {
      localStorage.removeItem("token");
      localStorage.removeItem("userData");
      localStorage.removeItem("currentTab");
      this.$reset();
    },
    async updateUser(data) {
      let response = await axios({
        method: "post",
        url: "wp-json/wp/v2/users/me",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        data: data,
      });
      localStorage.setItem("userData", JSON.stringify(response.data));
      this.user_data = response.data;
    },
    async deleteUser() {
      const response = await axios({
        method: "delete",
        url: "",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        data: {
          AUTH_KEY: "397R{6;d@cTB|p2vaMeA^Pm};B8",
        },
        params: {
          rest_route: "/auth/users",
        },
      });
    },
    async ftechUser() {
      let response = await axios({
        method: "get",
        url: "wp-json/wp/v2/users/me",
        timeout: 5000,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        params: {
          _fields: "id,username,name,email,avatar_urls,acf",
        },
      });
      this.loggedIn = true;
      localStorage.setItem("userData", JSON.stringify(response.data));
      this.user_data = response.data;
    },
    async connectionStatus() {
      const response = await axios({
        method: "get",
        url: "wp-json/api/v1/connection",
      })
        .then(() => {
          this.connection = true;
        })
        .catch((e) => {
          if (e.code === "ERR_NETWORK" || e.code === "ERR_NAME_NOT_RESOLVED") {
            this.connection = false;
          }
        });
    },
  },
});
