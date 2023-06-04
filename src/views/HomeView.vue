<script>
import { defineAsyncComponent } from "vue";
export default {
  components: {
    TabsRouter: defineAsyncComponent(() =>
      import("@/layouts/tabs/TabsRouter.vue")
    ),
    TabsBar: defineAsyncComponent(() => import("@/layouts/tabs/TabsBar.vue")),
  },
  mounted() {
    document.title = "Home";
    this.$fetchNewMessages();
    if (localStorage.getItem("token") != undefined) {
      this.$pollingNewMessages();
    } else {
      clearInterval(this.$pollingNewMessages);
    }
  },
  beforeMount() {
    clearInterval(this.$pollingNewMessages);
  },
};
</script>
<template>
  <Page class="app-home-page">
    <div class="app-tabs app-tabs-home">
      <TabsRouter />
      <TabsBar />
    </div>
  </Page>
</template>
