import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import BooksView from "../views/BooksView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "books",
    component: BooksView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
