<script>
export default {
  props: { currentTab: String }, 
  watch: {},
  methods: {
    activeTab(tab) {
      localStorage.setItem("currentTab", tab);
    },
  },
};
</script>

<template>
  <div class="app-tabsbar">
    <nav class="app-tabs-bar">
      <button
        class="app-tab-btn"
        @click="activeTab('home')"
        :class="{ active: currentTab == 'home' }"
      >
        <a>
          <Icon name="home" />
          <span class="title">Home</span>
        </a>
      </button>
      <button
        class="app-tab-btn"
        @click="activeTab('orders')"
        :class="{ active: currentTab == 'orders' }"
      >
        <a>
          <Icon name="cart" />
          <span class="title">My Orders</span>
        </a>
      </button>
      <button
        class="app-tab-btn"
        @click="activeTab('reports')"
        :class="{ active: currentTab == 'reports' }"
      >
        <a>
          <Icon name="file-chart" />
          <span class="title">My Reports</span>
        </a>
      </button>
      <button
        class="app-tab-btn"
        @click="activeTab('notify')"
        :class="{ active: currentTab == 'notify' }"
      >
        <a>
          <Icon name="bell" />
          <span class="title">Notify</span>
        </a>
      </button>
      <button
        class="app-tab-btn"
        @click="activeTab('profile')"
        :class="{ active: currentTab == 'profile' }"
      >
        <a>
          <Icon name="user" />
          <span class="title">Profile</span>
        </a>
      </button>
    </nav>
  </div>
</template>
