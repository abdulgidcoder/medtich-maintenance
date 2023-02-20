import axios from "axios";
import router from "../router";
axios.defaults.baseURL = "https://maintenance.medtich.com";

// Add a response interceptor
axios.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if (error.response) {
      switch (error.response.status) {
        case 401:
        case 403:
          localStorage.removeItem("token");
          localStorage.removeItem("userData");
          window.location.reload();
          router.push({
            name: "login",
          });
        default:
          console.log(error.response.data);
      }
    }
    if (error.code == "ERR_NETWORK" || error.code == "ERR_NAME_NOT_RESOLVED") {
      router.push({
        name: "orders",
      });
    } 

    return Promise.reject(error);
  }
);

export default axios;
