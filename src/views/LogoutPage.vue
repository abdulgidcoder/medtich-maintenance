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
    }, 1000);
  })
);
</script>
<style scoped lang="scss">
.app-logout-page {
  .app-content {
    display: flex;
    justify-content: center;
    align-items: center;
    .spinner-border {
      margin-bottom: 20px;
      width: 4rem;
      color: var(--primary);
      height: 4rem;
    }
  }
}
</style>

<template>
  <Page class="app-logout-page">
    <Content>
      <div class="logout">
        <div class="spinner-border" role="status"></div>
        <div class="lead">`تسجيل خروج...</div>
      </div>
    </Content>
  </Page>
</template>
