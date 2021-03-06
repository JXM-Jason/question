import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Labels from "../views/Labels.vue";
import Money from "../views/Money.vue";
import Statistics from "../views/Statistics.vue";
import NotFound from "../views/NotFound.vue";
import EditLabel from "../views/EditLabel.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    redirect: "Money",
  },
  {
    path: "/Money",
    component: Money,
  },
  {
    path: "/Labels",
    component: Labels,
  },
  {
    path: "/Labels/EditLabel/:id",
    component: EditLabel,
  },
  {
    path: "/Statistics",
    component: Statistics,
  },
  {
    path: "*",
    component: NotFound,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
