import { useChatStore } from "@/stores/useChat";
export default {
  install: ({ config }) => {
    const chatStore = useChatStore();
    config.globalProperties.$fetchNewMessages = () => {
      setInterval(function () {
        chatStore.newMessages();
      }, 5000);
    };
  },
};
