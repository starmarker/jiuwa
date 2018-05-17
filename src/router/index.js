import Vue from "vue";
import Router from "vue-router";
import Index from "@/components/Index";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/login/:m_type",
      name: "login",
      meta: {
        title: "登录"
      },
      component: resolve => require(["@/components/login"], resolve)
    },
    {
      path: "/login",
      name: "login2",
      meta: {
        title: "登录"
      },
      component: resolve => require(["@/components/login"], resolve)
    },
    {
      path: "/",
      name: "index",
      meta: {
        title: "活动首页"
      },
      component: Index
    },
    {
      path: "/rank",
      name: "rank",
      meta: {
        title: "排行榜"
      },
      component: resolve => require(["@/components/rank"], resolve)
    },
    {
      path: "/sign/:token",
      name: "updateSign",
      meta: {
        title: "活动报名"
      },
      component: resolve => require(["@/components/sign"], resolve)
    },
    {
      path: "/sign",
      name: "sign",
      meta: {
        title: "活动报名"
      },
      component: resolve => require(["@/components/sign"], resolve)
    },
    {
      path: "/my/:token",
      name: "myinfo",
      meta: {
        title: "个人信息"
      },
      component: resolve => require(["@/components/myinfo"], resolve)
    },
    {
      path: "/my/",
      name: "myinfo1",
      meta: {
        title: "个人信息"
      },
      component: resolve => require(["@/components/myinfo"], resolve)
    },
    {
      path: "/jiuwa",
      name: "jiuwa",
      meta: {
        title: "灸娃信息"
      },
      component: resolve => require(["@/components/jiuwa"], resolve)
    },
    {
      path: "/result/:type",
      name: "result",
      meta: {
        title: "提交结果"
      },
      component: resolve => require(["@/components/result"], resolve),
      props: true
    }
  ]
});
