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
        title: "活动首页",
        keepAlive: true
      },
      redirect: "index",
      component: resolve => require(["@/components/main"], resolve),
      children: [
        {
          path: "index",
          name: "home",
          meta: {
            title: "活动首页",
            ck_bind_phone: true,
            keepAlive: true
          },
          component: Index
        },
        {
          path: "rank",
          name: "rank",
          meta: {
            title: "排行榜"
          },
          component: resolve => require(["@/components/rank"], resolve)
        },
        {
          path: "my/:token",
          name: "myinfo",
          meta: {
            title: "个人信息",
            ck_bind_phone: true
          },
          component: resolve => require(["@/components/moreInfo"], resolve)
        },
        {
          path: "my",
          name: "myinfo1",
          meta: {
            title: "个人信息",
            ck_bind_phone: true
          },
          component: resolve => require(["@/components/moreInfo"], resolve)
        },
        {
          path: "sign/:token",
          name: "updateSign",
          meta: {
            title: "活动报名",
            ck_bind_phone: true
          },
          component: resolve => require(["@/components/sign"], resolve)
        },
        {
          path: "sign",
          name: "sign",
          meta: {
            title: "活动报名",
            ck_bind_phone: true
          },
          component: resolve => require(["@/components/sign"], resolve)
        }
      ]
    },

    {
      path: "/pick/:token",
      name: "pick",
      meta: {
        title: "采摘页面",
        ck_bind_phone: true
      },
      component: resolve => require(["@/components/myinfo"], resolve)
    },
    {
      path: "/pick",
      name: "mypick",
      meta: {
        title: "采摘页面",
        ck_bind_phone: true
      },
      component: resolve => require(["@/components/myinfo"], resolve)
    },
    {
      path: "/jiuwa",
      name: "jiuwa",
      meta: {
        title: "小灸灸信息",
        ck_bind_phone: true
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
    },
    {
      path: "/detail",
      name: "detail",
      meta: {
        title: "活动介绍"
      },
      component: resolve => require(["@/components/detail"], resolve),
      props: true
    }
  ]
});
