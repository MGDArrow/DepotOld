import { createRouter, createWebHistory } from "vue-router";
import { routes } from "./routes";
import { useUsersStore } from "@/stores/users";

export const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  routes: routes,
});

router.beforeEach(async (to, from, next) => {
  if (to.meta.requriesAuth) {
    let localUser = await useUsersStore().getSession();
    if (localUser?.session == null) {
      next({ name: "Login" });
    } else {
      next();
    }
  } else {
    next();
  }
});
