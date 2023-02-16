import { createRouter, createWebHistory } from "vue-router";

import { useAuthStore } from "@/stores/useAuth";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Onboarding",
      component: () => import("@/views/OnboardingView.vue"),
      beforeEnter: (to, from, next) => {
        if (!useAuthStore().loggedIn && !localStorage.getItem("onboarding")) {
          next();
        } else {
          next({ name: "login" });
        }
      },
    },
    {
      path: "/home",
      name: "home",
      component: () => import("@/views/HomeView.vue"),
      beforeEnter: (to, from, next) => {
        if (!useAuthStore().loggedIn) {
          next({ name: "login" });
        } else {
          next();
        }
      },
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/LoginView.vue"),
      beforeEnter: (to, from, next) => {
        if (useAuthStore().loggedIn) {
          next({ name: "home" });
        } else {
          next();
        }
      },
    },
    {
      path: "/register",
      name: "register",
      component: () => import("@/views/RegisterView.vue"),
      beforeEnter: (to, from, next) => {
        if (useAuthStore().loggedIn) {
          next({ name: "home" });
        } else {
          next();
        }
      },
    },
    {
      path: "/orders",
      name: "orders",
      component: () => import("@/views/OrdersView.vue"),
      beforeEnter: (to, from, next) => {
        if (!useAuthStore().loggedIn) {
          next({ name: "login" });
        } else {
          next();
        }
      },
    },
    {
      path: "/order/:id" ,
      name: "single-order",
      component: () => import("@/views/SingleOrder.vue"),
      props: true,
    },
  ],
});

export default router;
