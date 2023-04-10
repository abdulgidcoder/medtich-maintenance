<script>
export default {
  setup() {},
};
</script>
<template>
  <div class="app-tabsbar">
    <nav class="app-tabs-bar">
      <button class="app-tab-btn">
        <RouterLink to="/home/main">
          <Icon name="home" />
          <span class="title">الرئيسية</span>
        </RouterLink>
      </button>
      <button class="app-tab-btn">
        <RouterLink to="/home/my-orders">
          <Icon name="cart" />
          <span class="title">طلباتى</span>
        </RouterLink>
      </button>
      <button class="app-tab-btn">
        <RouterLink to="/home/my-reports">
          <Icon name="file-chart" />
          <span class="title">تقاريرى</span>
        </RouterLink>
      </button>
      <!-- <button
            class="app-tab-btn"
            @click="activeTab('notify')"
            :class="{ active: currentTab === 'notify' }"
          >
            <RouterLink to="/home/">
              <Icon name="bell" />
              <span class="title">Notify</span>
            </RouterLink>
          </button> -->
      <button class="app-tab-btn">
        <RouterLink to="/home/my-profile">
          <Icon name="user" />
          <span class="title">حسابى</span>
        </RouterLink>
      </button>
    </nav>
  </div>
</template>
