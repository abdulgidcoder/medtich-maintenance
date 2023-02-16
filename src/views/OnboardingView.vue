<script>
export default {
  data() {
    return {
      title: "Maintenance Technical",
      content:
        "You can see the maintenance orders with all details, true and convenient",
    };
  },
  setup() {},
  created() { 
  },
  methods: {
    getStartApp() { 
      this.$router.push("/login");
      localStorage.setItem('onboarding',true)
    },
  },
};
</script>
<template>
  <div class="app-page app-onboarding">
    <div class="app-page__offcanvas">
      <div class="app-onboarding__image">
        <img src="../assets/images/onboarding.svg" alt="onboarding" />
      </div>
      <div class="app-onboarding__content">
        <h1 v-html="title"></h1>
        <p v-html="content"></p>
        <button class="btn btn-primary btn-block btn-lg" @click="getStartApp">
          Get Start!
        </button>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.app-onboarding {
  
  &__wrapper {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  &__image {
    background-color:var(--bg-grey);
    height: 60vh;
    padding: 40px;
    border-radius: 0 0 25px 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    img{
      max-width: 280px;
    }
  }
  &__content {
    padding: 40px 20px;
    height: 40vh;
    text-align: center;
    display: flex;
    flex-direction: column;
  }
  .btn {
    margin-top: auto;
  }
}
</style>
