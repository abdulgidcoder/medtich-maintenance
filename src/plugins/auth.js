import { useAuthStore } from "@/stores/useAuth";

export default {
  install: ({ config }) => {
    config.globalProperties.$auth = useAuthStore();
    config.globalProperties.$ftechUserData = () => {
      setInterval(function () {
        useAuthStore().ftechUser();
      }, 12000);
    };
  
  },
};
