<template>
  <div class="content">
    <!-- Logo -->
    <div class="logo animate__animated animate__fadeIn">
      <a href="/">
        <div class="item img"><img src="@/assets/image/logo.svg" alt="表白墙" /></div>
      </a>
    </div>
    <!-- Menu -->
    <div class="menu animate__animated animate__fadeInDown" ref="menu">
      <div class="menu_scroll">
        <div class="menu_list">
          <div @click="selectMenu('/')">表白墙</div>
          <div @click="selectMenu('/graphicWall')">图文墙</div>
          <div @click="selectMenu('/lovePage')">表白百科</div>
        </div>
      </div>
    </div>
    <!-- User -->
    <div class="user animate__animated animate__fadeIn">
      <div class="user_avatar">
        <a-popover v-if="!name" title="未登录">

          <template #content>
            <a-button danger @click="$router.push('/login')">登录</a-button>
          </template>
          <img src="@/assets/image/avatar.svg" alt="头像" @click="$router.push('/Login')" />
        </a-popover>

        <a-popover v-else :title="'User : ' + name">

          <template #content>
            <a-button type="text" @click="$router.push('/PersonalCenter')">个人中心</a-button>
            <a-divider />
            <a-button danger @click="logOff">退出登录</a-button>
          </template>
          <img v-if="img === undefined || img === null" src="@/assets/image/avatar.svg" alt="头像" />
          <img v-else :src="img" alt="头像" />
        </a-popover>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from "vue";
import { user } from "@/store/modules/user";
import { useRouter } from "vue-router";

// pinia user
const userInfo = ref(user().info);
const router = useRouter();

// 用户数据
const img = ref();
const name = ref();

// 视窗大小
const screenWidth = ref(document.body.clientWidth);

// 获取menu_list的宽、高。
const menu = ref<HTMLElement | null>(null);
const scroll = {
  width: 0,
  height: 0,
};

onMounted(() => {
  img.value = userInfo.value.avatar;
  name.value = userInfo.value.name;
  resize();
  window.addEventListener("resize", handleResize);
});

function resize() {
  scroll.width = menu.value?.offsetWidth ?? 0;
  scroll.height = menu.value?.offsetHeight ?? 0;

  // 修改scss变量的值
  document.documentElement.style.setProperty("--scroll-width", scroll.width + "px");
  document.documentElement.style.setProperty("--scroll-height", scroll.height + "px");
}

function handleResize() {
  screenWidth.value = document.body.clientWidth;
  resize();
}

function selectMenu(path: string) {
  router.push(path);
}

// 退出登录
function logOff() {
  localStorage.removeItem("user");
  location.reload();
}

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
});
</script>


<style lang="scss" scoped>
$_header_item: 20%;
$_header_menu: 60%;
$_avatar_size: 4vw;

.content {
  z-index: 80;
  padding: 0 2rem;
  height: 5vw;
  line-height: $_header_height;
  display: flex;
  box-sizing: border-box;
  overflow: hidden;
  background-color: rgb(255, 255, 255);
  box-shadow: 0 0 1rem rgba(163, 163, 163, 0.747);

  .logo {
    width: $_header_item;

    a {
      display: flex;
      justify-content: space-around;

      .item {
        height: $_header_height;
      }

      .img {
        height: 100%;

        img {
          height: $_header_height;
          display: inline;
        }
      }
    }
  }

  .menu {
    width: $_header_menu;
    position: relative;

    .menu_scroll {
      height: var(--scroll-width);
      transform-origin: top left;
      overflow: auto;
      margin-top: var(--scroll-height);
      transform: rotate(-90deg);

      .menu_list {
        width: var(--scroll-width);
        transform-origin: top left;
        transform: rotate(90deg) translateY(-100%);
        display: flex;
        justify-content: space-around;

        div {
          cursor: pointer;
          font-size: 1vw;
          padding: 0 2vw;
          box-sizing: border-box;
        }
      }
    }

    .menu_scroll::-webkit-scrollbar {
      display: none;
    }
  }

  .user {
    width: $_header_item;
    height: inherit;

    .user_avatar {
      width: 100%;
      height: inherit;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;

      img {
        width: $_avatar_size;
        height: $_avatar_size;
        object-fit: cover;
        border-radius: 100%;
        cursor: pointer;
      }
    }
  }
}

.selectMenu {
  border-bottom: 2px solid rgb(255, 160, 160);
}
</style>
