<script>
import { defineAsyncComponent } from "vue";
export default {
  components: {
    TabsRouter: defineAsyncComponent(() =>
      import("@/components/tab/TabsRouter.vue")
    ),
    TabsBar: defineAsyncComponent(() => import("@/components/tab/TabsBar.vue")),
  },
  created() {
    document.title = "Home";
  },
};
</script>
<template>
  <main id="app-main" class="app-main">
    <div class="app-tabs app-tabs-home">
      <TabsRouter />
      <TabsBar />
    </div>
  </main>
</template>
