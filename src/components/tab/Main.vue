<script>
import { StatusBar, Style } from "@capacitor/status-bar";
import { Capacitor } from "@capacitor/core";
import InfoUser from "../InfoUser.vue";
import TopbarHome from "../TopbarHome.vue";
import LastOrders from "../orders/Latest.vue";
export default {
  components: {
    LastOrders,
    InfoUser,
    TopbarHome,
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
      if(this.$auth.role == 'technician'){
        this.$refs.LastOrders.fetchOrders();
      }
    },
  },
};
</script>
<template>
  <div class="app-tab-view app-home-page">
    <TopbarHome />
    <Content :pullToRefresh="true" @onRefresh="reloadOrders">
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
      <div class="app-section app-main-banner">
        <img src="../../assets/images/slide.jpg" alt="Slide" />
        <div class="content">
          <h2>اهلا بك,</h2>
          <h3>فى ميدتك للصيانة</h3>
        </div>
      </div>
      <section
        class="app-section app-last-orders"
        v-if="this.$auth.role == 'technician'"
      >
        <div class="app-section-head">
          <h2 class="h1">اخر الطلبات</h2>
          <RouterLink to="/orders">عرض الكل</RouterLink>
        </div>
        <LastOrders ref="LastOrders" :per_page="6" />
      </section> 
    </Content>
  </div>
</template>

<style lang="scss">
.app-home-page {
  .app-content {
    background-color: var(--white);
    padding-top: 80px;
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
}
</style>
