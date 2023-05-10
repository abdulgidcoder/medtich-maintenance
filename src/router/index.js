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
      redirect: "/home/main",
      component: () => import("@/views/HomeView.vue"),
      beforeEnter: redirectToLoginOnLoggedOut,
      children: [
        {
          path: "main",
          name: "main",
          component: () => import("@/components/tab/Main.vue"),
        },
        {
          path: "add-order",
          name: "add-order",
          component: () => import("@/components/tab/AddOrder.vue"),
        },
        {
          path: "orders-tab",
          name: "orders-tab",
          component: () => import("@/components/tab/Orders.vue"),
        },
        {
          path: "reports-tab",
          name: "reports-tab",
          component: () => import("@/components/tab/Reports.vue"),
        },
        {
          path: "my-profile",
          name: "my-profile",
          component: () => import("@/components/tab/Profile.vue"),
        },
        {
          path: "chats",
          name: "chats",
          component: () => import("@/components/tab/Chats.vue"),
        },
      ],
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
      path: "/resetpassword",
      name: "resetpassword",
      component: () => import("@/views/PasswordView.vue"),
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
      path: "/my-orders",
      name: "my-orders",
      component: () => import("@/views/MyOrders.vue"),
      beforeEnter: redirectToLoginOnLoggedOut,
    },
    {
      path: "/my-reports",
      name: "my-reports",
      component: () => import("@/views/MyReports.vue"),
      beforeEnter: redirectToLoginOnLoggedOut,
    },
    {
      path: "/faq",
      name: "faq",
      component: () => import("@/views/FaqView.vue"),
      beforeEnter: redirectToLoginOnLoggedOut,
    },
    {
      path: "/contact",
      name: "contact",
      component: () => import("@/views/ContactView.vue"),
      beforeEnter: redirectToLoginOnLoggedOut,
    },
    {
      path: "/chat/:id",
      name: "single-chat",
      component: () => import("@/views/SingleChat.vue"),
      props: true,
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
