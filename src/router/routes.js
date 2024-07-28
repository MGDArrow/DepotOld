export const routes = [
  {
    name: "Auth",
    path: "/auth",
    component: () => import("@/layouts/LayoutAuth.vue"),
    children: [
      {
        name: "Login",
        path: "login",
        component: () => import("@/views/AuthLogin.vue"),
      },
      {
        name: "Registration",
        path: "registration",
        component: () => import("@/views/AuthRegistration.vue"),
      },
    ],
  },
  {
    name: "Basic",
    path: "/",
    component: () => import("@/layouts/LayoutBasic.vue"),
    meta: { requriesAuth: true },
    children: [
      {
        name: "Home",
        path: "",
        component: () => import("@/views/HomeView.vue"),
        meta: { requriesAuth: true },
      },
      {
        name: "Storage",
        path: "/storage",
        component: () => import("@/views/StorageView.vue"),
        meta: { requriesAuth: true },
      },
      {
        name: "Accept",
        path: "/accept",
        component: () => import("@/views/AcceptView.vue"),
        meta: { requriesAuth: true },
      },
      {
        name: "Give",
        path: "/give",
        component: () => import("@/views/GiveView.vue"),
        meta: { requriesAuth: true },
      },
      {
        name: "Categories",
        path: "/categories",
        component: () => import("@/views/СategoriesView.vue"),
        meta: { requriesAuth: true },
      },
      {
        name: "Givers",
        path: "/givers",
        component: () => import("@/views/GiversView.vue"),
        meta: { requriesAuth: true },
      },
      {
        name: "Organizarions",
        path: "/organizarions",
        component: () => import("@/views/OrganizationsView.vue"),
        meta: { requriesAuth: true },
      },
      {
        name: "History",
        path: "/history",
        component: () => import("@/views/HistoryView.vue"),
        meta: { requriesAuth: true },
      },
    ],
  },
];
