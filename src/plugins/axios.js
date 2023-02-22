import axios from "axios";
import router from "../router";
axios.defaults.baseURL = "https://maintenance.medtich.com";

axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response) {
      switch (error.response.status) {
        case 401: 
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
    // if (error.code == "ERR_NETWORK" || error.code == "ERR_NAME_NOT_RESOLVED") {
    //   router.push({
    //     name: "orders",
    //   });
    // }
    return Promise.reject(error);
  }
);

export default axios;
