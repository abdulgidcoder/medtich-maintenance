import axios from "axios";
import { useAuthStore } from "@/stores/useAuth";
import router from "../router";
axios.defaults.baseURL = "https://medtich.dev/backend";
axios.interceptors.response.use(
  function (response) {
    const authStore = useAuthStore();
    authStore.$patch({ connection: true });
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
    if (error.code == "ERR_NETWORK" || error.code == "ERR_NAME_NOT_RESOLVED") {
      const authStore = useAuthStore();
      authStore.$patch({ connection: false });
    }
    return Promise.reject(error);
  }
);

export default axios;
