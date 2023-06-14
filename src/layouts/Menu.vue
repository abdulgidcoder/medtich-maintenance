<script>
import InfoUser from "@/layouts/InfoUser.vue";
import UserInfo from "@/layouts/auth/UserInfo.vue";
import Nav from "@/layouts/Nav.vue";
export default {
  components: { Nav, UserInfo, InfoUser },
  data() {
    return {
      itemsNav: [
        { label: "تعديل حسابى", icon: "user", path: "edit" },
        { label: "طلباتى", icon: "cart", path: "my-orders" },
        {
          label: "الأسئلة الشائعة",
          icon: "exclamation-circle-alt",
          path: "faq",
        },
        { label: "الشروط والاحكام", icon: "shield-alt", path: "privacy" },
        { label: "تغيير كلمة المرور", icon: "password", path: "password" },
        { label: "تواصل معنا", icon: "phone-volume", path: "contact" },
      ],
    };
  },
};
</script>

<template>
  <Menu class="app-main-menu">
    <template #toggle>
      <div class="app-avatar">
        <img
          :src="this.$auth.user_data?.avatar_urls['96']"
          :alt="this.$auth.user_data?.name"
        />
      </div>
    </template>
    <template #content>
      <UserInfo />
      <nav class="app-menu-nav">
        <ul>
          <li v-for="(item, i) in itemsNav" :key="i">
            <RouterLink :to="{ name: item.path }"
              >
              <Icon :name="item.icon" class="item-icon" />
              <span class="item-text">{{ item.label }}</span></RouterLink
            >
          </li>
        </ul>
      </nav>
      <div class="footer">
        <RouterLink :to="{ name: 'logout' }" class="logout-link">
          <Icon name="power-off" />
          تسجيل خروج
        </RouterLink>
        <p>Version 1.1 (2)</p>
      </div>
    </template>
  </Menu>
</template>
<style lang="scss">
.app-main-menu {
  .app-menu_wrapper {
    padding: 20px;
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  .app-user-info {
    .app-avatar {
      width: 35px;
      height: 35px;
    }
    .app-user-content {
      h3 {
        font-size: 0.875rem;
      }
      p {
        font-size: 0.75rem;
      }
    }
  }
  .app-menu-nav {
    flex-grow: 1;
    li {
      padding: 15px 0;
      &:not(:last-child) {
        border-bottom: 1px solid var(--grey); 
      }
      a {
        display: flex;
        align-items: center; 
      }
      .item-text {
        display: flex;
        align-items: center;
        font-size: 16px;
        font-weight: 500;
      }
      .item-icon {
        color: var(--black);
        margin-left: 20px;
        width: 18px; 
      }
    }
  }
  .footer {
    text-align: center;
    .logout-link {
      font-size: 14px;
      font-weight: 600;
      margin-bottom: 20px;
      display: block;
      color: var(--danger);
      .app-icon {
        width: 18px;
        margin-left: 10px;
      }
    }
  }
}
</style>
