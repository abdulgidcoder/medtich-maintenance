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
      <!-- <button class="app-tab-btn" v-if="this.$auth.role == 'customer'">
        <RouterLink to="/home/add-order">
          <Icon name="cart-pulse" />
          <span class="title">طلب جديد</span>
        </RouterLink>
      </button> -->
      <button class="app-tab-btn">
        <RouterLink to="/home/orders-tab">
          <Icon name="cart" />
          <span class="title">طلباتى</span>
        </RouterLink>
      </button>
      <!-- <button class="app-tab-btn" v-if="this.$auth.role == 'technician'">
        <RouterLink to="/home/reports-tab">
          <Icon name="file-chart" />
          <span class="title">تقاريرى</span>
        </RouterLink>
      </button> -->
      <button class="app-tab-btn">
        <RouterLink to="/home/messages">
          <Icon name="comments" />
          <span class="title">الرسائل</span>
        </RouterLink>
      </button>
      <button class="app-tab-btn">
        <RouterLink to="/home/my-profile">
          <Icon name="user" />
          <span class="title">حسابى</span>
        </RouterLink>
      </button>
    </nav>
  </div>
</template>
