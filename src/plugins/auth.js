import { useAuthStore } from "@/stores/useAuth";

export default {
  install: ({ config }) => {
    config.globalProperties.$auth = useAuthStore();
    const ftechUserData = () => {
      setInterval(function () {
        useAuthStore().ftechUser();
      }, 12000);
    };
    if (localStorage.getItem("token") != undefined) {
      ftechUserData();
    } else {
      clearInterval(ftechUserData);
    }
    const ftechConnecStatus = () => {
      setInterval(function () {
        useAuthStore().connectionStatus();
      }, 3000);
    };
    // ftechConnecStatus();
  },
};
