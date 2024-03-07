<template>
  <div>
    <Header class="header" v-scroll-header />
    <div class="graphicWall">
      <el-row :gutter="60" justify="start">
        <transition-group enter-active-class="animate__animated animate__bounceInUp">
          <el-col :span="6" class="col" v-for="item in data" key="item.id">
            <a-card class="card" hoverable @click="toDetail($event, item)">
              <template #cover>
                <img class="cover" :src="item.images[0]" />
              </template>
              <a-card-meta :title="item.title">

                <template #description>
                  <el-row class="content" justify="start">
                    <el-col :span="5"><el-image class="el-img" :src="item.userInfo.avatar" /></el-col>
                    <el-col :span="8" :offset="1">
                      <p>{{ item.userInfo.name }}</p>
                    </el-col>
                    <el-col :span="4" :offset="6">
                      <img v-if="!item.collection" class="like" src="@/assets/image/dontlike.svg" alt="喜欢"
                        @click.stop="Collection(item.id)" />
                      <img v-else class="like" src="@/assets/image/like.svg" alt="喜欢"
                        @click.stop="CancelCollection(item.id)" />
                    </el-col>
                  </el-row>
                </template>
              </a-card-meta>
            </a-card>
          </el-col>
        </transition-group>
        <el-col :span="24" class="loading">
          <p v-if="noMessage">没有留言咯 ~</p>
          <div v-loading="!noMessage" element-loading-background="#ffffff00"></div>
        </el-col>
      </el-row>
      <el-empty class="description" v-if="showCard" description="暂无数据" />
    </div>
    <addCard class="addCard animate__animated animate__fadeInRight" />
    <router-view class="detail" />
  </div>
</template>

<script lang="ts" setup>
import Header from "@/views/common/header.vue";
import addCard from "@/views/addGraphicCard.vue";
import { getWallsCard, collection, cancelCollection } from "@/utils/api/container";
import { content } from "@/store/modules/content";
import { ref, onMounted, onUnmounted } from "vue";
import { detail } from "@/store/modules/detail";
import { useRouter } from "vue-router";
import { user } from "@/store/modules/user";
import { ElNotification } from "element-plus";

const data = ref<any>([]);
const cont = content();
const userStore = ref(user().info);

const index = ref<number>(0);
const showCard = ref<boolean>(false);
const noMessage = ref<boolean>(false);
const item = detail();
const router = useRouter();

onMounted(() => {
  window.addEventListener("scroll", handleScroll, true);
  const res = getWallsCard(index.value, "image", userStore.value.uId as any) as any;
  res.then((r: any) => {
    if (cont.state !== false) {
      if (r.content !== true) return (showCard.value = true);
      index.value = r.startIndex;
      cont.state = r.content;
      handleImg(r.data);
      return;
    }
  });
});

// 处理图片
const handleImg = (res: any) => {
  const newData = res;
  res.forEach((item: any, index: number) => {
    newData[index].images = item.images ? (item || "").images.split("\\").filter((item: any) => item != "") : [];
  });
  data.value = [...data.value, ...newData];
};

// 收藏
function Collection(id: number) {
  data.value.find((item: any) => {
    if (item.id === id) {
      if (!userStore.value.uId) return router.push("/login");
      const res = collection(id, userStore.value.uId as number, "image");
      res.then((r: any) => {
        r.status ? (item.collection = !item.collection) : null;
        ElNotification({
          type: "success",
          message: r.message,
          title: item.title,
        });
      });
    }
  });
}

// 取消收藏
function CancelCollection(id: number) {
  data.value.find((item: any) => {
    if (item.id === id) {
      if (!userStore.value.uId) return router.push("/login");
      const res = cancelCollection(id, userStore.value.uId as number, "image");
      res.then((r: any) => {
        r.status ? (item.collection = !item.collection) : null;
        ElNotification({
          type: "success",
          message: r.message,
          title: item.title,
        });
      });
    }
  });
}

// 加载more
const handleScroll = () => {
  if (showCard.value) return;
  // 获取滚动距离
  const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  // 获取文档高度
  const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
  // 获取客户端高度
  const clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
  if (scrollTop + 1 + clientHeight >= scrollHeight && cont.state) {
    const res = getWallsCard(index.value, "image", userStore.value.uId as any) as any;
    res.then((r: any) => {
      if (r.content !== true) return (noMessage.value = true);
      handleImg(r.data);
      index.value = r.startIndex;
      cont.state = r.content;
    });
  }
};

// 组件卸载时清除监听
onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll, true);
});

// 打开详情页
function toDetail(event: Event, itemInfo: any) {
  const x = (event.currentTarget as HTMLElement).getBoundingClientRect().x + 2;
  const y = (event.currentTarget as HTMLElement).getBoundingClientRect().y;
  const w = (event.currentTarget as HTMLElement).getBoundingClientRect().width;
  const h = (event.currentTarget as HTMLElement).getBoundingClientRect().height;

  item.item = { ...itemInfo, x, y, w, h };
  localStorage.setItem("graphicDetail", JSON.stringify({ ...itemInfo, x, y, w, h }));
  router.push("/detailImage");
}
</script>

<style lang="scss" scoped>
div {
  .header {
    position: fixed;
    width: 100vw;
    height: $_header_height;
    line-height: $_header_height;
    background-color: #fff;
    box-shadow: 0 0 1rem rgba(163, 163, 163, 0.747);
    opacity: 0.8;
    transition: all 0.2s;

    &:hover {
      opacity: 1;
    }
  }

  .graphicWall {
    width: 100vw;
    height: 100vh;
    padding: 8vw 10vw;

    .col {
      margin-bottom: 2vw;

      .card {
        border-radius: 2vw;
        overflow: hidden;
        transition: opacity 0.2s, transform 0.2s;

        .cover {
          width: 100%;
          height: 17vw;
          object-fit: cover;
        }

        .content {
          align-items: center;

          .el-img {
            display: block;
            width: 3vw;
            height: 3vw;
            object-fit: cover;
            border-radius: 10vw;
          }

          .like {
            width: 2vw;
            height: 2vw;
            object-fit: cover;
            border-radius: 10vw;
          }
        }
      }
    }

    .loading {
      p {
        text-align: center;
        padding: 2vw;
      }

      div {
        padding: 4vw;
      }
    }
  }

  .detail {
    position: fixed;
    inset: 0;
    width: 100vw;
    z-index: 100;
  }

  .addCard {
    position: fixed;
    bottom: 10vw;
    right: 2vw;
    width: 4vw;
    height: 4vw;
    background-color: rgb(255, 255, 255);
    border-radius: 50%;
    box-shadow: 0 0 1rem rgba(163, 163, 163, 0.747);
    opacity: 0.8;
    transition: all 0.2s;

    &:hover {
      opacity: 1;
      transform: scale(1.1);
    }
  }
}
</style>
