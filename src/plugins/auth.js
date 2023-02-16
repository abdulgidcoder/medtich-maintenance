import { useAuthStore } from "@/stores/useAuth";

export default {
  install: ({ config }) => {
    config.globalProperties.$auth = useAuthStore();

    const ftechUserData = () => {
      setInterval(function () {
        useAuthStore().ftechUser();
      }, 5000);
    };
    if (localStorage.getItem("token") != undefined) {
      ftechUserData();
    } else {
      clearInterval(ftechUserData);
    }
  },
};
