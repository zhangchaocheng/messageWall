<template>
  <div>
    <div class="graphicWall">
      <el-row :gutter="60" justify="start">
        <el-col :span="6" class="col" v-for="item in data" key="item.id">
          <a-card class="card" hoverable @click="toDetail($event, item)">
            <a-card-meta :title="item.wall_info.title">
              <template #description>
                <el-row class="content" justify="start">
                  <el-col :span="5"><el-image class="el-img" :src="item.wall_info.user.avatar" /></el-col>
                  <el-col :span="8" :offset="1">
                    <p>{{ item.wall_info.user.name }}</p>
                  </el-col>
                  <el-col :span="4" :offset="6">
                    <img
                      class="like"
                      src="@/assets/image/like.svg"
                      alt="喜欢"
                      @click.stop="CancelCollection(item.mId, item.wall_info.type)" />
                  </el-col>
                </el-row>
              </template>
            </a-card-meta>
          </a-card>
        </el-col>
        <el-col :span="24" class="loading">
          <el-empty class="description" v-if="showCard" description="暂无数据" />
          <p v-if="noMessage">没有留言咯~</p>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref, onMounted } from "vue";
  import { user } from "@/store/modules/user";
  import { cancelCollection } from "@/utils/api/container";
  import { detail } from "@/store/modules/detail";
  import { useRouter } from "vue-router";
  import { getCollection } from "@/utils/api/PersonalCenter";

  const userStore = ref(user());
  const data = ref();
  const showCard = ref<boolean>(false);
  const noMessage = ref<boolean>(false);
  const item = detail();
  const router = useRouter();

  onMounted(() => {
    const res = getCollection(userStore.value.info.uId as any);
    res.then((r: any) => {
      if (r.content === false) {
        noMessage.value = true;
        showCard.value = true;
      }
      data.value = r.data;
    });
  });

  // 取消收藏
  function CancelCollection(id: number, type: string) {
    data.value.find((item: any, index: number) => {
      if (item.mId === id) {
        if (!userStore.value.info.uId) return router.push("/login");
        const res = cancelCollection(id, userStore.value.info.uId as number, type);
        res.then((r: any) => {
          r.status ? (item.collection = !item.collection) : null;
          data.value.splice(index, 1);
        });
      }
    });
  }

  // 打开详情页
  function toDetail(event: Event, itemInfo: any) {
    const x = (event.currentTarget as HTMLElement).getBoundingClientRect().x + 2;
    const y = (event.currentTarget as HTMLElement).getBoundingClientRect().y;
    const w = (event.currentTarget as HTMLElement).getBoundingClientRect().width;
    const h = (event.currentTarget as HTMLElement).getBoundingClientRect().height;

    item.item = { ...itemInfo, x, y, w, h };
    router.push("/detailImage");
  }
</script>

<style lang="scss" scoped>
  .graphicWall {
    width: 100vw;
    height: 100vh;
    padding: 8vw 10vw;
    .col {
      margin-bottom: 2vw;
      .card {
        border-radius: 2vw;
        overflow: hidden;
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
</style>
