<template>
  <div class="box">
    <div class="graphicWall">
      <el-row :gutter="60" justify="start">
        <transition-group enter-active-class="animate__animated animate__bounceInUp">
          <el-col :span="6" class="col" v-for="item in data" :key="item.id">
            <a-card class="card" hoverable :style="{ 'background-color': `${item.itemColor}` }"
              @click="toDetail($event, item)">
              <template #cover>
                <div class="text">{{ item.content }}</div>
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
                    <el-col :span="24">
                      <p style="font-size: 1vw; text-align: right">{{ filterDate(item.createdAt) }}</p>
                    </el-col>
                  </el-row>
                </template>
              </a-card-meta>
            </a-card>
          </el-col>
        </transition-group>
        <el-col :span="24" class="loading">
          <p v-if="noMessage">没有留言咯~</p>
          <div v-loading="!noMessage" element-loading-background="#ffffff00" />
        </el-col>
      </el-row>
      <el-empty class="description" v-if="showCard" description="暂无数据" />
    </div>
    <router-view class="detail" />
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted, defineProps, watch } from "vue";
import { filterDate } from "@/utils/filter/index";
import { getWallsCard, collection, cancelCollection } from "@/utils/api/container";
import { content } from "@/store/modules/content";
import { detail } from "@/store/modules/detail";
import { useRouter } from "vue-router";
import { user } from "@/store/modules/user";
import { ElNotification } from "element-plus";

const props = defineProps({
  formdata: {
    type: Object,
    default: () => ({}),
  },
});

// 监听formdata
watch(
  () => props.formdata,
  (newVal) => {
    data.value = [newVal, ...data.value];
  }
);

// 页面数据
const data = ref<any>();
const cont = content();
const userStore = ref(user().info);
const item = detail();
const router = useRouter();

// message 状态
const noMessage = ref<boolean>(false);

// 创建一个类型为number的index响应式变量
const index = ref<number>(0);
const showCard = ref<boolean>(false);

onMounted(() => {
  window.addEventListener("scroll", handleScroll, true);
  const res = getWallsCard(index.value, "text", userStore.value.uId as any) as any;
  res.then((r: any) => {
    if (cont.state !== false) {
      if (r.content === true) {
        data.value = r.data;
        index.value = r.startIndex;
        cont.state = r.content;
        return;
      }
      showCard.value = true;
    }
  }).catch((err: any) => {
    console.log(err);
    ElNotification({
      type: "error",
      title: "获取失败",
      message: "服务器未响应:404",
    })
  });
});

// 收藏
function Collection(id: number) {
  data.value.find((item: any) => {
    if (item.id === id) {
      if (!userStore.value.uId) return router.push("/login");
      const res = collection(id, userStore.value.uId as any, "text");
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
      const res = cancelCollection(id, userStore.value.uId as number, "text");
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

// 加载
const handleScroll = () => {
  if (showCard.value) return;
  // 获取滚动距离
  const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  // 获取文档高度
  const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
  // 获取客户端高度
  const clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
  if (scrollTop + 1 + clientHeight >= scrollHeight && cont.state) {
    const res = getWallsCard(index.value, "text", userStore.value.uId as any);
    res.then((r: any) => {
      if (r.content !== true) return (noMessage.value = true);
      data.value.push(...r.data);
      index.value = r.startIndex;
      cont.state = r.content;
    });
    return;
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
  localStorage.setItem("fontDetail", JSON.stringify({ ...itemInfo, x, y, w, h }));
  router.push("/detailFont");
}
</script>

<style lang="scss" scoped>
.box {
  width: inherit;
  display: flex;
  justify-content: space-between;
  position: relative;
  --br: 1.8vw;
  --bg: #f1f1f162;
  --grey: #d9d9d98c;

  .graphicWall {
    width: 100vw;
    height: 100vh;
    padding-top: 2vw;

    .col {
      margin-bottom: 2vw;

      .card {
        border-radius: 2vw;
        overflow: hidden;
        background: repeating-linear-gradient(45deg, var(--bg), var(--grey) 15px);
        transition: 0.15s all ease-in-out;
        box-shadow: rgba(172, 172, 172, 0.15) 1.95px 1.95px 2.6px;

        &:hover {
          transform: translateY(-2px);
          box-shadow: #00000050 2px 2px 10px;
        }

        .text {
          width: 100%;
          height: 13vw;
          padding: 1vw;
          overflow: hidden;
          font-size: 1.25vw;
          white-space: wrap;
          word-break: break-all;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 6;
          background-image: linear-gradient(#ffffff57 2.3vw, #c3c3c3b1 2.3vw);
          background-size: 20% 2.4vw;
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
            margin-top: 0.5vw;
            width: 2vw;
            height: 2vw;
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

  :deep(.ant-card-body) {
    padding: 1vw;
  }

  .detail {
    position: fixed;
    inset: 0;
    width: 100vw;
    z-index: 100;
  }
}
</style>
