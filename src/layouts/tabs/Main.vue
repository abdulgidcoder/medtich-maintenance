<script>
import { defineAsyncComponent } from "vue";
import { StatusBar, Style } from "@capacitor/status-bar";
import { Capacitor } from "@capacitor/core";

export default {
  components: {
    LastOrders: defineAsyncComponent(() =>
      import("@/layouts/orders/Latest.vue")
    ),
    ProcessingList: defineAsyncComponent(() =>
      import("@/layouts/orders/ProcessingList.vue")
    ),
    InfoUser: defineAsyncComponent(() => import("@/layouts/InfoUser.vue")),
    TopbarHome: defineAsyncComponent(() => import("@/layouts/TopbarHome.vue")),
  },
  mounted() {
    if (Capacitor.isNativePlatform()) {
      StatusBar.setStyle({ style: Style.Light });
      StatusBar.setBackgroundColor({
        color: "#ffffff",
      });
    }
  },
  beforeUnmount() {
    if (Capacitor.isNativePlatform()) {
      StatusBar.setStyle({ style: Style.Dark });
      StatusBar.setBackgroundColor({
        color: "#00d9c8",
      });
    }
  },
  methods: {
    reloadOrders() {
      if (this.$auth.role == "technician") {
        this.$refs.LastOrders.fetchOrders();
      }
      this.$refs.ProcessingList.fetchOrders();
      
    },
  },
};
</script>
<template>
  <div class="app-tab-view app-home-page">
    <TopbarHome />
    <Content
      :pullToRefresh="true"
      @onRefresh="reloadOrders"
      :enableOffline="true"
    >
      <InfoUser />
      <h2 class="app-welcome-back">
        {{ "أهلا بك, " + this.$auth.user_data.name + "!" }}
      </h2>
      <div class="app-section" v-if="false">
        <button class="app-search-toggle">
          <Icon name="search" />
          ابحث عن طلبك
        </button>
      </div>
      <section class="app-section app-main-banner">
        <img src="../../assets/images/slide.jpg" alt="Slide" />
        <div class="content">
          <h2>اهلا بك,</h2>
          <h3>فى ميدتك للصيانة</h3>
        </div>
      </section>
      <section
        class="app-section app-last-orders"
        v-if="this.$auth.role == 'technician' && this.$auth.user_data.acf?.area"
      >
        <div class="app-section-head">
          <h2 class="h1">اخر الطلبات</h2>
          <RouterLink to="/orders">عرض الكل</RouterLink>
        </div>
        <LastOrders ref="LastOrders" :per_page="6" />
      </section>
      <section class="app-section app-processing-orders">
        <div class="app-section-head">
          <h2 class="h1">طلبات قيد التفيذ</h2>
        </div>
        <ProcessingList ref="ProcessingList" :per_page="6" />
      </section>
    </Content>
    <Teleport to="body">
      <div class="app-fab app-fab-main">
        <a
          class="app-fab-toogle"
          :href="'https://wa.me/' + this.$contactInfo['whatsapp']"
        >
          <Icon name="comment-smile" />
        </a>
      </div>
    </Teleport>
  </div>
</template>

<style lang="scss">
.app-home-page {
  .app-welcome-back {
    padding: 10px 0;
    margin-bottom: 0;
  }
  .app-main-banner {
    position: relative;
    img {
      border-radius: 10px;
      max-height: 180px;
    }
    .content {
      position: absolute;
      top: 50%;
      right: 20px;
      transform: translateY(-50%);
      h2 {
        color: var(--white);
        font-size: 22px;
      }
      h3 {
        color: var(--white);
        margin-bottom: 0;
      }
    }
  }
  .app-section-head {
    h2 {
      color: var(--primary);
    }
  }
  .app-last-orders,
  .app-processing-orders {
    padding-top: 15px;
    border-top: 1px solid var(--grey);
  }
}
</style>
