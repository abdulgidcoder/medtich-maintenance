<script>
import { useAuthStore } from "@/stores/useAuth.js";
import { useOrdersStore } from "@/stores/useOrders.js";
import Menu from "@/layouts/Menu.vue";

export default {
  components: { Menu },
  props: { show: Boolean },
  data() {
    return {
      menuOpen: false,
    };
  },
  setup() {
    const authStore = useAuthStore();
    const ordersStore = useOrdersStore();
    return { authStore, ordersStore };
  },
  methods: {
    chooseArea(data) {
      this.authStore.updateUser({ fields: { area: data[0].id } }).then(() => {
        this.ordersStore.ftechLast(this.$auth.user_data?.acf["area"], 6);
      });
    },
  },
};
</script>
<template>
  <TopBar class="fixed topbar-home">
    <template #left>
      <div class="user-area">
        <Icon name="location" />
        <div class="contant">
          <div>منطقتك</div>
          <strong v-if="this.$auth.user_data?.acf['area']">{{
            $nameCity(this.$auth.user_data?.acf["area"])
          }}</strong>
          <Select
            class="btn-link"
            :data="this.$cities"
            :onChange="chooseArea"
            v-else
          >
            اختر منطقتك
          </Select>
        </div>
      </div>
    </template>
    <template #right>
     <Menu/>
    </template>
  </TopBar>
</template>
<style lang="scss">
.topbar-home {
  border-bottom: 1px solid var(--grey);
  .user-area {
    display: flex;
    align-items: center;
    .contant {
      font-size: 13px;
      div {
        font-size: 12px;
        line-height: 1;
        color: var(--medium);
        margin-bottom: 5px;
      }
      strong {
        line-height: 1;
        display: block;
      }
    }
    svg {
      width: 22px;
      fill: var(--primary);
      margin-right: 10px;
    }
  }
}
</style>
