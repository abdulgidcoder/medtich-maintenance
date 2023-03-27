import axios from "axios";
import router from "../router";
axios.defaults.baseURL = "https://maintenance.medtich-eg.com";

axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response) {
      switch (error.response.status) {
        case 401:
        case 403:
          localStorage.removeItem("token");
          localStorage.removeItem("userData");
          localStorage.removeItem("currentTab");
          window.location.reload();
          router.push({
            name: "login",
          });
      }
    }
    // if (error.code == "ERR_NETWORK" || error.code == "ERR_NAME_NOT_RESOLVED") {
    // }
    return Promise.reject(error);
  }
);

export default axios;
