<template>
  <nav class="app-menu-profile">
    <ul>
      <li>
        <RouterLink :to="{ name: 'edit' }"
          ><span class="item-text"
            ><Icon name="user" class="item-icon" />تعديل حسابى</span
          ><Icon name="angle-right" class="item-arrow"
        /></RouterLink>
      </li>
      <li>
        <RouterLink :to="{ name: 'my-orders' }"
          ><span class="item-text"
            ><Icon name="cart" class="item-icon" />طلباتى</span
          ><Icon name="angle-right" class="item-arrow"
        /></RouterLink>
      </li>
      <li v-if="this.$auth.role == 'technician'">
        <RouterLink :to="{ name: 'my-reports' }"
          ><span class="item-text"
            ><Icon name="file-chart" class="item-icon" />تقاريرى</span
          ><Icon name="angle-right" class="item-arrow"
        /></RouterLink>
      </li>
      <li>
        <RouterLink :to="{ name: 'faq' }"
          ><span class="item-text"
            ><Icon name="exclamation-circle-alt" class="item-icon" />الأسئلة
            الشائعة</span
          ><Icon name="angle-right" class="item-arrow"
        /></RouterLink>
      </li>
      <li>
        <RouterLink :to="{ name: 'contact' }"
          ><span class="item-text"
            ><Icon name="phone-volume" class="item-icon" />تواصل معنا</span
          ><Icon name="angle-right" class="item-arrow"
        /></RouterLink>
      </li>
      <li>
        <RouterLink :to="{ name: 'password' }"
          ><span class="item-text"
            ><Icon name="password" class="item-icon" />تغيير كلمة المرور</span
          ><Icon name="angle-right" class="item-arrow"
        /></RouterLink>
      </li>
      <li>
        <RouterLink :to="{ name: 'logout' }"
          ><span class="item-text"
            ><Icon name="sign-out" class="item-icon" />تسجيل خروج</span
          >
        </RouterLink>
      </li>
    </ul>
  </nav>
</template>
<style lang="scss">
.app-menu-profile {
  li {
    &:not(:last-child) {
      padding-bottom: 10px;
      margin-bottom: 10px;
      border-bottom: 1px solid var(--grey);
    }
    a {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .item-text {
      display: flex;
      align-items: center;
      font-size: 16px;
      font-weight: 500;
    }
    .item-icon {
      background-color: var(--primary-tint);
      color: var(--primary);
      margin-right: 15px;
      border-radius: 5px;
      width: 35px;
      height: 35px;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      svg {
        width: 16px;
        height: 16px;
      }
    }
    .item-arrow {
      color: var(--primary);
      svg {
        width: 12px;
      }
    }
  }
}
</style>
