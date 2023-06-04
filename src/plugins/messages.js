import { useChatStore } from "@/stores/useChat";
export default {
  install: ({ config }) => {
    const chatStore = useChatStore();
    config.globalProperties.$pollingNewMessages = () => {
      setInterval(function () {
        chatStore.newMessages();
      }, 5000);
    };
    config.globalProperties.$fetchNewMessages = () => {
      chatStore.newMessages();
    };
  },
};
