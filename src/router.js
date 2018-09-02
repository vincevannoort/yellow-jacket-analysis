import Vue from "vue";
import Router from "vue-router";
import Parse from "./views/Parse.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "parse",
      component: Parse
    },
    {
      path: "/analysis",
      name: "analysis",
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/Analysis.vue")
    }
  ]
});
