import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";

// 创建路由
const routerHistory = createWebHistory();
const router = createRouter({
  history: routerHistory,
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home,
      children: [
        {
          path: "/detailFont",
          name: "detailFont",
          component: () => import("@/views/common/detailFont.vue")
        }
      ]
    },
    {
      path: "/Login",
      name: "login",
      component: () => import("@/views/Login.vue"),
    },
    {
      path: "/Register",
      name: "Register",
      component: () => import("@/views/Register.vue"),
    },
    {
      path: "/PersonalCenter",
      name: "PersonalCenter",
      component: () => import("@/views/PersonalCenter/PersonalCenter.vue"),
      children: [{
        path: "/collection",
        name: "collection",
        component: () => import("@/views/PersonalCenter/collection.vue")
      }]
    }
    ,
    {
      path: "/graphicWall",
      name: "graphicWall",
      component: () => import("@/views/common/graphicWall.vue"),
      children: [
        {
          path: "/detailImage",
          name: "detailImage",
          component: () => import("@/views/common/detailImage.vue")
        }
      ]
    },
    {
      path: "/lovePage",
      name: "lovePage",
      component: () => import("@/views/common/lovePage.vue"),
    }
  ],
})

export default router