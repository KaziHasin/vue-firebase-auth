import { createRouter, createWebHistory } from "vue-router";
import LoginForm from "../components/LoginForm.vue";
import RegisterForm from "../components/RegisterForm.vue";
import Dashboard from "../components/Dashboard.vue";
import Profile from "../components/Profile.vue";
import { auth } from "../firebase/init.js";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: LoginForm,
      meta: {
        requiresGuest: true,
      },
    },
    {
      path: "/register",
      component: RegisterForm,
      meta: {
        requiresGuest: true,
      },
    },

    {
      path: "/dashboard",
      component: Dashboard,
      meta: {
        requiresAuth: true,
      },

      children: [
        {
          path: "profile",
          component: Profile,
          meta: {
            requiresAuth: true,
          },
        },
      ],
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  await new Promise((resolve) => auth.onAuthStateChanged(resolve));
  const currentUser = auth.currentUser;
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const requiresGuest = to.matched.some((record) => record.meta.requiresGuest);

  if (requiresAuth && !currentUser) {
    next("/");
  } else if (requiresAuth && currentUser) {
    next();
  } else if (requiresGuest && currentUser) {
    next("/dashboard");
  } else {
    next();
  }
});

export default router;
