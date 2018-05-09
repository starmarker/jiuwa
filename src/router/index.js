import Vue from "vue";
import Router from "vue-router";
import HelloWorld from "@/components/HelloWorld";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "HelloWorld",
      component: HelloWorld
    },
    {
      path: "/rank",
      name: "rank",
      component: resolve => require(["@/components/rank"], resolve)
    },
    {
      path: "/sign",
      name: "sign",
      component: resolve => require(["@/components/sign"], resolve)
    },
    {
      path: "/my",
      name: "myinfo",
      component: resolve => require(["@/components/myinfo"], resolve)
    }
  ]
});
