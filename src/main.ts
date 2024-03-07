import { createApp } from 'vue';
import App from './App.vue';
import router from "./router";
import pinia from "./store";

// UI library
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import 'element-plus/theme-chalk/display.css'

import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';

// js库
//@ts-ignore
import scrollHeaderPlugin from "./plugins/scrollHeaderPlugin";

// global style
import "@/App.css";
import "@/assets/css/reset.css";
import "@/assets/scss/card.scss";
import "animate.css";

// 组件

const app = createApp(App);

app.use(router)
  .use(ElementPlus)
  .use(scrollHeaderPlugin)
  .use(Antd)
  .use(pinia)
  .mount('#app');
