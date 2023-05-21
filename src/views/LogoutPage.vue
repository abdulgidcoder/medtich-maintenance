<script setup>
import { useRouter } from "vue-router";
import { onMounted } from "vue";
import { useAuthStore } from "@/stores/useAuth";

const auth = useAuthStore();
const router = useRouter();

document.title = `تسجيل خروج...`;

onMounted(() =>
  auth.logout().then(() => {
    setTimeout(function () {
      router.push("/login");
      const interval_id = window.setInterval(function () {},
      Number.MAX_SAFE_INTEGER);
      for (let i = 1; i < interval_id; i++) {
        window.clearInterval(i);
      }
    }, 1000);
  })
);
</script>
<style lang="scss">
.app-logout-page {
  .app-content {
    padding: 0;
    &-container {
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
    }
    .spinner-border {
      margin-bottom: 20px;
      width: 4rem;
      color: var(--primary);
      height: 4rem;
    }
    .lead {
      font-size: 16px;
      font-weight: 500;
    }
  }
}
</style>

<template>
  <Page class="app-logout-page">
    <Content :disableOffline="true">
      <div class="logout">
        <div class="spinner-border" role="status"></div>
        <div class="lead">تسجيل خروج ...</div>
      </div>
    </Content>
  </Page>
</template>
