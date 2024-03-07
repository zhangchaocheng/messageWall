<template>
  <div>
    <Header class="header" v-scroll-header />
    <div class="outBox">
      <el-row :gutter="10">
        <el-col :span="16" class="item">
          <div class="grid-content ep-bg-purple userinfo">
            <img :src="userInfo.avatar" alt="头像" />
            <div class="info">
              <div>PERSONAL DETAILS</div>
              <h2>{{ userInfo.name }}</h2>
              <p>{{ userInfo.account }}</p>
            </div>
          </div>
        </el-col>

        <el-col :span="8" class="item">
          <div class="grid-content ep-bg-purple" @click="openList('/collection')">
            <div class="like">
              <img src="@/assets/image/like.svg" />
              <p>
                FAVORITE <br />
                MESSAGE
              </p>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="8" class="item">
          <div class="grid-content ep-bg-purple">
            <div class="follow">
              FOLLOW
              <hr />
              <div class="Followers">
                <div class="col">
                  <img src="@/assets/image/avatar.svg" alt="" />
                  <span>12312</span>
                </div>
                <div class="col">
                  <img src="@/assets/image/avatar.svg" alt="" />
                  <span>12311231231231231231231231232</span>
                </div>
                <div class="col">
                  <img src="@/assets/image/avatar.svg" alt="" />
                  <span>1231245234</span>
                </div>
                <div class="col">
                  <img src="@/assets/image/avatar.svg" alt="" />
                  <span>12312</span>
                </div>
                <div class="col">
                  <img src="@/assets/image/avatar.svg" alt="" />
                  <span>12311231231231231231231231232</span>
                </div>
                <div class="col">
                  <img src="@/assets/image/avatar.svg" alt="" />
                  <span>1231245234</span>
                </div>
                <div class="col">
                  <img src="@/assets/image/avatar.svg" alt="" />
                  <span>12312</span>
                </div>
                <div class="col">
                  <img src="@/assets/image/avatar.svg" alt="" />
                  <span>12311231231231231231231231232</span>
                </div>
                <div class="col">
                  <img src="@/assets/image/avatar.svg" alt="" />
                  <span>1231245234</span>
                </div>
              </div>
            </div>
          </div>
        </el-col>

        <el-col :span="8" class="item">
          <div class="grid-content ep-bg-purple">
            <div class="interactions">
              <div class="title">INTERACTIONS</div>
              <div class="container">
                <div>201 关注</div>
                <div>66 粉丝</div>
                <div>999 获赞</div>
              </div>
            </div>
          </div>
        </el-col>

        <el-col :span="8" class="item">
          <div class="grid-content ep-bg-purple">
            <div class="settings">
              <p>SETTINGS</p>
              <img src="@/assets/image/settings.png" alt="设置" />
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <router-view class="view" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { user } from "@/store/modules/user";
import Header from "@/views/common/header.vue";
import { useRouter } from "vue-router";

const router = useRouter();
const userStore = ref(user());
const userInfo = ref(userStore.value.info);

function openList(path: string) {
  router.push(path);
}
</script>

<style lang="scss" scoped>
div {
  .header {
    position: fixed;
    width: 100vw;
    height: $_header_height;
    line-height: $_header_height;
    background-color: rgb(255, 255, 255);
    box-shadow: 0 0 1rem rgba(163, 163, 163, 0.747);
    opacity: 0.8;
    transition: all 0.2s;

    &:hover {
      opacity: 1;
    }
  }

  .outBox {
    margin: 0 10vw;
    padding-top: 7vw;
    $_height: 27.5vw;

    .userinfo {
      background-color: rgb(141, 52, 243);
      color: #fff;
      text-align: left;
      display: flex;

      img {
        width: 50%;
        height: $_height;
        object-fit: cover;
      }

      .info {
        padding: 2%;

        div {
          width: 100%;
          font-size: 3vw;
          font-weight: 900;
          margin-bottom: 14vw;
        }

        h2 {
          font-size: 1.5vw;
          margin-bottom: 1vw;
        }

        p {
          font-size: 1.5vw;
        }
      }
    }

    .like {
      background-color: rgb(244, 52, 129);
      color: #fff;
      font-size: 1.5vw;
      font-weight: 600;
      padding: 2vw;
      position: relative;
      transition: all 0.3s;

      img {
        width: 15vw;
        position: absolute;
        animation: bounce 0.8s infinite;
      }

      p {
        padding-top: 20vw;
      }
    }

    .follow {
      background-color: rgb(244, 129, 52);
      height: $_height;
      color: #fff;
      font-size: 1.5vw;
      font-weight: 600;
      padding: 2vw;
      overflow: hidden;
      box-sizing: border-box;

      hr {
        border: 1px solid #fff;
        margin: 2% 0;
        animation: rhythm 5s infinite;
      }

      .Followers {
        width: 100%;
        height: 90%;
        overflow: hidden;
        overflow-y: scroll;

        &::-webkit-scrollbar {
          display: none;
        }

        display: flex;
        flex-direction: column;

        .col {
          display: flex;
          align-items: center;
          margin: 3% 0;
          padding: 4%;
          background-color: rgba(255, 255, 255, 0.481);
          border-radius: 100vw;

          img {
            border-radius: 100vw;
            width: 3vw;
            height: 3vw; /* Corrected 'height' property */
          }

          span {
            font-size: 2vw;
            font-weight: 600;
            margin-left: 2%;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
      }
    }

    .interactions {
      height: 30vw;
      padding: 2vw;
      height: $_height;
      color: #1d1d1d;
      font-size: 3.5vw;
      font-weight: 900;
      padding: 2vw;
      overflow: hidden;
      box-sizing: border-box;
      position: relative;
      background-color: #f9c818;
      background-image: radial-gradient(rgba(255, 255, 255, 0.315) 3px, transparent 50px);
      background-size: 100px 100px;

      .title {
        position: absolute;
        top: 0;
        transform-origin: left;
        transform: rotate(90deg);
      }

      .container {
        padding: 2vw;
        padding-left: 4vw;
        height: 85%;
        font-size: 1.3vw;
        display: flex;
        flex-direction: column;
        align-items: self-end;
        justify-content: space-around;
      }
    }

    .settings {
      background-color: #2658ce;
      padding: 2vw;
      height: $_height;
      box-sizing: border-box;
      overflow: hidden;
      position: relative;
      font-size: 3vw;

      img {
        position: absolute;
        bottom: -3vw;
        right: -4vw;
        width: 15vw;
        animation: rotate 10s linear infinite;
      }
    }

    .item {
      transition: all 0.3s;
      margin-bottom: 0.5rem;

      &:hover {
        filter: drop-shadow(0 0 3vw #ffffff);
      }
    }
  }

  .view {
    position: fixed;
    top: 0;
    z-index: 80;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    overflow-y: scroll;
    background-color: #ffffff00;
    backdrop-filter: blur(12vw);
  }

  @keyframes bounce {
    0% {
      transform: translateY(0) scale(1);
      filter: drop-shadow(0 0 3vw #ffffff);
    }

    50% {
      transform: translateY(-0.5vw) scale(1.05);
      filter: drop-shadow(0 0 5vw #ffffff);
    }

    100% {
      transform: translateY(0) scale(1);
      filter: drop-shadow(0 0 3vw #ffffff);
    }
  }

  @keyframes rhythm {
    0% {
      margin-left: 40%;
      margin-right: 40%;
    }

    50% {
      margin-left: 0%;
      margin-right: 0%;
    }

    60% {
      margin-left: 0%;
      margin-right: 0%;
    }

    100% {
      margin-left: 40%;
      margin-right: 40%;
    }
  }

  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }
}
</style>
