import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/useAuth";

const redirectToLoginOnLoggedOut = (to, from, next) => {
   if (!useAuthStore().loggedIn) {
     next({ name: "login" });
   } else {
     next();
   }
};

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
      beforeEnter: redirectToLoginOnLoggedOut,
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
      beforeEnter: redirectToLoginOnLoggedOut,
    },
    {
      path: "/order/:id",
      name: "single-order",
      component: () => import("@/views/SingleOrder.vue"),
      props: true,
      beforeEnter: redirectToLoginOnLoggedOut,
    },
    {
      path: "/order/:orderId/add-report",
      name: "add-report",
      component: () => import("@/views/AddReport.vue"),
      props: true,
      beforeEnter: redirectToLoginOnLoggedOut,
    },
    {
      path: "/report/:id",
      name: "single-report",
      component: () => import("@/views/SingleReport.vue"),
      props: true,
      beforeEnter: redirectToLoginOnLoggedOut,
    },
    {
      path: "/profile/edit",
      name: "edit",
      component: () => import("@/views/ProfileEdit.vue"),
      beforeEnter: (to, from, next) => {
        if (
          useAuthStore().loggedIn ||
          useAuthStore().user_data?.acf["area"] == null
        ) {
          next();
        } else {
          next({ name: "login" });
        }
      },
    },
    {
      path: "/profile/password",
      name: "password",
      component: () => import("@/views/ProfilePassword.vue"),
      beforeEnter: redirectToLoginOnLoggedOut,
    },
    {
      path: "/logout",
      name: "logout", 
      component: () => import("@/views/LogoutPage.vue"),
      beforeEnter: (to, from, next) => {
        if (useAuthStore().loggedIn) {
          next();
        } else {
          next({ name: "login" });
        }
      },
    },
  ],
});

export default router;
