<template>
  <nav class="app-menu-profile">
    <ul>
      <li>
        <RouterLink :to="{name:'edit'}"
          ><span class="item-text"
            ><Icon name="user" class="item-icon" />My Profile</span
          ><Icon name="angle-right" class="item-arrow"
        /></RouterLink>
      </li>
      <li>
        <RouterLink :to="{name:'password'}"
          ><span class="item-text"
            ><Icon name="password" class="item-icon" />Change Password</span
          ><Icon name="angle-right" class="item-arrow"
        /></RouterLink>
      </li>
      <li>
        <RouterLink :to="{name:'logout'}"
          ><span class="item-text"
            ><Icon name="sign-out" class="item-icon" />Logout</span
          >
        </RouterLink>
      </li>
    </ul>
  </nav>
</template>
<style lang="scss">
.app-menu-profile {
  li {
    padding-bottom: 15px;
    margin-bottom: 15px;
    border-bottom: 1px solid var(--grey);
    a {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .item-text {
      display: flex;
      align-items: center;
      font-size: 18px;
      font-weight: 500;
    }
    .item-icon {
      background-color: var(--primary-tint);
      color: var(--primary);
      margin-right: 15px;
      border-radius: 5px;
      width: 40px;
      height: 40px;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      svg {
        width: 20px;
        height: 20px;
      }
    }
    .item-arrow {
      color: var(--primary);
      svg {
        width: 15px;
      }
    }
  }
}
</style>
