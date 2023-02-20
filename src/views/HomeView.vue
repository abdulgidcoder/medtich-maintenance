<script>
import Home from "../components/tab/Home.vue";
import Orders from "../components/tab/Orders.vue";
import Reports from "../components/tab/Reports.vue";
import Notify from "../components/tab/Notify.vue";
import Profile from "../components/tab/Profile.vue";

export default {
  data() {
    return {
      currentTab: localStorage.getItem("currentTab")
        ? localStorage.getItem("currentTab")
        : "home",
    };
  },
  components: { Home, Orders, Reports, Notify, Profile },
  setup() {},
  created() {
    document.title = "Home";
    this.setCurrentTab();
  },
  watch: {
    currentTab(tab) {
      localStorage.setItem("currentTab", tab);
    },
  },
  methods: {
    setCurrentTab() {
      if (!this.currentTab) {
        localStorage.setItem("currentTab", "home");
      }
    },
    activeTab(tab) {
      this.currentTab = tab;
    },
  },
};
</script>
<template>
  <main id="app-main" class="app-main">
    <div class="app-tabs app-tabs-home">
      <Home :show="currentTab === 'home'" />
      <Orders :show="currentTab === 'orders'" />
      <Reports :show="currentTab === 'reports'" />
      <Notify :show="currentTab === 'notify'" />
      <Profile :show="currentTab === 'profile'" />
      <div class="app-tabsbar">
        <nav class="app-tabs-bar">
          <button
            class="app-tab-btn"
            @click="activeTab('home')"
            :class="{ active: currentTab === 'home' }"
          >
            <a>
              <Icon name="home" />
              <span class="title">Home</span>
            </a>
          </button>
          <button
            class="app-tab-btn"
            @click="activeTab('orders')"
            :class="{ active: currentTab === 'orders' }"
          >
            <a>
              <Icon name="cart" />
              <span class="title">My Orders</span>
            </a>
          </button>
          <button
            class="app-tab-btn"
            @click="activeTab('reports')"
            :class="{ active: currentTab === 'reports' }"
          >
            <a>
              <Icon name="file-chart" />
              <span class="title">My Reports</span>
            </a>
          </button>
          <!-- <button
            class="app-tab-btn"
            @click="activeTab('notify')"
            :class="{ active: currentTab === 'notify' }"
          >
            <a>
              <Icon name="bell" />
              <span class="title">Notify</span>
            </a>
          </button> -->
          <button
            class="app-tab-btn"
            @click="activeTab('profile')"
            :class="{ active: currentTab === 'profile' }"
          >
            <a>
              <Icon name="user" />
              <span class="title">Profile</span>
            </a>
          </button>
        </nav>
      </div>
    </div>
  </main>
</template>

<style lang="scss">
</style>
