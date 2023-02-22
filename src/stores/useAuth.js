import { defineStore } from "pinia";
import axios from "axios";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    loggedIn: localStorage.getItem("token") ? true : false,
    user_data: localStorage.getItem("userData")
      ? JSON.parse(localStorage.getItem("userData"))
      : {},
  }),
  getters: {},
  actions: {
    async register(name, username, password) {
      const response = await axios({
        method: "post",
        url: "",
        data: {
          AUTH_KEY: "zb}^Vbrh}tZa(=I8C/F`Dvi",
          user_login: username,
          email: username + "@medtich.com",
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
              AUTH_KEY: "zb}^Vbrh}tZa(=I8C/F`Dvi",
            },
          });
          let token = `${response.data.data.jwt}`;
          localStorage.setItem("token", token);
          await this.ftechUser();
          console.log(token);
        } catch (error) {
          localStorage.removeItem("token");
          localStorage.removeItem("userData");
          this.loggedIn = false;
          console.log(error);
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
          AUTH_KEY: "zb}^Vbrh}tZa(=I8C/F`Dvi",
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
    async ftechUser() {
      let response = await axios({
        method: "get",
        url: "wp-json/wp/v2/users/me",
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
  },
});
