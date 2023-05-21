<script>
import { defineAsyncComponent } from "vue";
export default {
  components: {
    TabsRouter: defineAsyncComponent(() =>
      import("@/layouts/tabs/TabsRouter.vue")
    ),
    TabsBar: defineAsyncComponent(() => import("@/layouts/tabs/TabsBar.vue")),
  },
  created() {
    document.title = "Home";
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
