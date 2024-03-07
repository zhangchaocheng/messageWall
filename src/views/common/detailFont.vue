<template>
  <div>
    <div class="outBox" ref="outBox" @click="closeOutBox($event)">
      <div class="box" ref="box">
        <div class="item">
          <div class="content" :style="{ 'background-color': `${detailPinia.itemColor}` }">
            <div class="text" :style="{ 'background-color': `#ffffff90` }">{{ detailPinia.content }}</div>
          </div>
        </div>
        <div class="message">
          <div class="userInfo" ref="userInfo">
            <div class="user">
              <img :src="detailPinia.userInfo.avatar" alt="用户头像" />
              <span>{{ detailPinia.userInfo.name }}</span>
            </div>
            <div class="time">
              {{ filterDate(detailPinia.createdAt) }}
            </div>
            <div class="title">
              {{ detailPinia.title }}
            </div>
          </div>
          <div v-if="isComments" class="content">
            <div class="ct_item" v-for="item in commentData" :key="item.id">
              <div v-if="item.reply">
                <div class="user">
                  <img :src="item.userInfo.avatar" alt="用户头像" />
                  <span>{{ item.userInfo.name }}</span>
                  <span class="replyBtn" @click="openReply(item.id)">{{ item.reply.isSelect ? "收起" : "展开" }}</span>
                </div>
                <div class="text">{{ item.content }}</div>
                <div class="reply text" v-show="item.reply.isSelect">
                  <div class="reply_item" v-for="list in item.reply">
                    <a-divider />
                    <img :src="list.userInfo.avatar" alt="用户头像" />
                    <span>
                      {{ list.userInfo.name }} &nbsp;>>>&nbsp; <a>@{{ list.callUser }}</a>
                    </span>
                    <span class="replyBtn" @click="incoming(item, list)">回复</span>
                    <span>{{ list.content }}</span>
                  </div>
                </div>
              </div>
              <div v-else>
                <div class="user">
                  <img :src="item.userInfo.avatar" alt="用户头像" />
                  <span>{{ item.userInfo.name }}</span>
                  <span class="replyBtn" @click="incoming(item, null)">回复</span>
                </div>
                <div class="text">{{ item.content }}</div>
              </div>
            </div>
          </div>

          <div v-else class="content">
            <img class="noCM" src="@/assets/image/noComments.svg" alt="暂无评论" />
          </div>

          <div v-if="userPinia.uId === null" class="footer">
            <input type="text" placeholder="登录后评论..." />
            <button @click="$router.push('/login')">登录</button>
          </div>

          <div v-else class="footer">
            <div v-if="who" class="who" @click="who = ''">@{{ who }}</div>
            <input type="text" placeholder="评论..." v-model="commentText.content" />
            <button @click="SubmitComment">评论</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { filterDate } from "@/utils/filter";
import { user } from "@/store/modules/user";
import { getComment, getReply, replyOrComment } from "@/utils/api/detail";
import { ElNotification } from "element-plus";

const userItem = user();
const detailPinia = ref(JSON.parse(localStorage.getItem("fontDetail") as string));
const userPinia = ref(userItem.info);

// 获取ref绑定的box
const box = ref();
const outBox = ref();
const router = useRouter();
const isComments = ref(false);
const commentState = ref<boolean>(true);
const replyItem = ref<any>({});
const who = ref("");

onMounted(() => {
  // 初始化异步动画
  setTimeout(() => {
    updateBoxStyle();
  });
  // 发起请求
  comment(detailPinia.value.id);

});

const commentData = ref<any>([]);
// 获取评论
function comment(id: number) {
  const res = getComment({ id: id, type: "font" } as any);
  res.then((r: any) => {
    if (r.length > 0) {
      commentData.value = r;
      isComments.value = true;
      reply(getCommentId(r), detailPinia.value.id);
    } else {
      isComments.value = false;
    }
  });
}

// 评论参数
const commentText = ref<any>({
  type: "comment",
  wallType: "font",
  content: "",
  uId: "",
  discussWho: "",
  commentId: "",
  callUser: "",
  id: "",
});

// 提交评论
function SubmitComment() {
  if (commentState.value) {
    commentText.value.type = "comment";
    commentText.value.uId = userPinia.value.uId;
    commentText.value.discussWho = detailPinia.value.id;
    replyOrComment(commentText.value).then(() => {
      ElNotification({
        title: "发布评论",
        message: "评论成功",
        type: "success",
      });
      let data = {
        content: commentText.value.content,
        createdAt: new Date(),
        discussWho: commentText.value.discussWho,
        uId: commentText.value.uId,
        userInfo: userPinia,
      };
      commentData.value.push(data);
      isComments.value = true;
    });
  } else if (!commentState.value) {
    commentText.value.type = "reply";
    commentText.value.id = detailPinia.value.id;
    commentText.value.uId = userPinia.value.uId;
    commentText.value.commentId = replyItem.value.id;
    commentText.value.callUser = who.value;
    replyOrComment(commentText.value).then(() => {
      ElNotification({
        title: "发布评论",
        message: "评论成功",
        type: "success",
      });
      let data = {
        content: commentText.value.content,
        discussWho: commentText.value.discussWho,
        uId: commentText.value.uId,
        userInfo: userPinia,
        callUser: who.value,
      };

      const commentItem = commentData.value.find((item: any) => item.id === incomingItem.value.c_id);
      if (commentItem && commentItem.reply.find((i: any) => i.id === incomingItem.value.id)) {
        commentItem.reply.push(data);
      }
    });
  }
}

// 信息传入
const incomingItem = ref({
  c_id: null,
  id: null,
});

function incoming(item: any, list: any) {
  replyItem.value = item;
  incomingItem.value.c_id = item.id;
  list ? (incomingItem.value.id = list.id) : (incomingItem.value.id = null);
  who.value = item.userInfo.name;
  commentState.value = false;
}

// 获取回复,接收一个id数组
function reply(ids: number[], index: number) {
  const data = { ids: ids, index: index, type: "font" };
  const res = getReply(data);
  res.then((r: any) => {
    for (let i = 0; i < r.length; i++) {
      const comment = commentData.value.find((c: any) => c.id === r[i].commentId);
      if (comment) {
        if (comment.reply) {
          comment.reply.push(r[i]);
        } else {
          comment.reply = [r[i]];
        }
        continue;
      }
    }
  });
}

// 获取评论数组的id
function getCommentId(data: any) {
  const id: number[] = [];
  data.forEach((item: any) => {
    id.push(item.id);
  });
  return id;
}

// 展示回复
function openReply(id: number) {
  commentData.value.forEach((item: any) => {
    if (item.id === id) {
      item.reply.isSelect = !item.reply.isSelect;
      return;
    }
  });
}

// 点击其他区域关闭detail页面
const closeOutBox = async (event: any) => {
  function back() {
    return new Promise<void>((resolve) => {
      const { w, x, y, h } = JSON.parse(localStorage.getItem("fontDetail") as string)
      const boxElement = box.value;
      const outBoxElement = outBox.value;
      outBoxElement.style.backgroundColor = "rgba(255, 255, 255, 0)";
      document.body.style.overflow = "scroll";
      boxElement.style.opacity = "0";
      boxElement.style.width = `${w}px`;
      boxElement.style.height = `${h}px`;
      boxElement.style.left = `${x}px`;
      boxElement.style.top = `${y}px`;
      boxElement.style.transform = "translate(0 ,0)";
      setTimeout(() => {
        resolve();
      }, 300);
    });
  }
  // 如果点击的是ref="outBox"，就路由回退
  if (event.target === outBox.value) {
    await back();
    router.back();
  }
};

// 更新box样式
function updateBoxStyle() {
  const boxElement = box.value;
  const outBoxElement = outBox.value;
  if (boxElement) {
    outBoxElement.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
    document.body.style.overflow = "hidden";
    boxElement.style.opacity = "1";
    boxElement.style.width = "70%";
    boxElement.style.height = "70vh";
    boxElement.style.top = "50%";
    boxElement.style.left = "50%";
    boxElement.style.transform = "translate(-50%, -50%)";
  }
}
</script>

<style lang="scss" scoped>
.outBox {
  width: 100%;
  height: 100%;
  transition: all 0.1s;

  .box {
    --br: 1.8vw;
    border-radius: var(--br);
    background-color: #ffffffe2;
    box-sizing: border-box;
    height: 100%;
    width: v-bind("detailPinia.w + 'px'");
    height: 70vh;
    margin: 0 auto;
    transition: all 0.3s;
    position: absolute;
    opacity: 0;
    top: v-bind("detailPinia.y + 'px'");
    left: v-bind("detailPinia.x + 'px'");
    display: flex;

    .item {
      --bg: #f1f1f162;
      --grey: #d9d9d98c;
      cursor: default;
      width: 50%;
      height: 100%;
      border-radius: var(--br);
      overflow: hidden;
      background: repeating-linear-gradient(45deg, var(--bg), var(--grey) 15px);
      transition: 0.15s all ease-in-out;
      box-shadow: rgba(172, 172, 172, 0.15) 1.95px 1.95px 2.6px;

      .content {
        padding: 0.5rem;
        height: 100%;
        position: relative;
        box-sizing: border-box;

        .text {
          overflow: hidden;
          overflow-y: auto;
          background-size: 60% 2.3rem;
          position: relative;
          padding: 0.5rem;
          height: 100%;
          box-sizing: border-box;
          border-radius: var(--br);
          margin-bottom: 0.8rem;
          font-size: 1.2vw;
          color: #000000bb;
          text-indent: 1.3rem;
          line-height: 2em;

          &::-webkit-scrollbar {
            width: 6px;
          }

          &::-webkit-scrollbar-thumb {
            border-radius: 10px;
            background-color: #ffffff46;
          }
        }
      }
    }

    .message {
      width: 50%;
      height: 100%;
      border-radius: var(--br);
      position: relative;
      overflow: hidden;
      overflow-y: scroll;

      &::-webkit-scrollbar {
        display: none;
      }

      .userInfo {
        padding: 0 1rem;
        margin-top: 0.5rem;
        box-sizing: border-box;
        min-height: 100px;
        position: relative;
        display: flex;
        flex-wrap: wrap;
        align-items: center;

        .user {
          width: 75%;

          img {
            width: 3vw;
            height: 3vw;
            border-radius: 100%;
            cursor: pointer;
            float: left;
          }

          span {
            padding-left: 8%;
            font-size: 150%;
            line-height: 3vw;
            display: block;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            text-align: left;
            cursor: pointer;
          }
        }

        .time {
          width: 25%;
          font-size: 0.5%;
          text-align: right;
        }

        .title {
          width: 100%;
          font-size: 150%;
          font-weight: 900;
          margin: 3% 0;
          word-break: break-all;
          height: auto;
        }
      }

      .content {
        overflow: hidden;
        overflow-y: scroll;

        &::-webkit-scrollbar {
          display: none;
        }

        .ct_item {
          margin: 0.5rem 1rem;
          padding: 0.5rem;
          border-radius: 0.5rem;
          word-wrap: break-word;
          background-color: rgb(255, 255, 255);
          position: relative;
          transition: all 0.2s;

          img {
            width: 2vw;
            height: 2vw;
            border-radius: 100%;
            float: left;
            cursor: pointer;
          }

          span {
            display: block;
            width: 30%;
            padding-left: 2%;
            font-size: 150%;
            line-height: 2vw;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            cursor: pointer;
          }

          .replyBtn {
            width: min-content;
            position: absolute;
            top: 0;
            right: 0;
            text-align: right;
            padding: 0.5rem;
            font-size: 10%;

            &:hover {
              color: #b3b3b3;
            }
          }

          .reply {
            width: 100%;

            .reply_item {
              position: relative;

              .replyBtn {
                width: min-content;
                position: absolute;
                top: 23%;
                right: 0;
                text-align: right;
                padding: 0.5rem;
                font-size: 10%;

                &:hover {
                  color: #b3b3b3;
                }
              }

              span {
                width: 50%;
                font-size: 80%;

                a {
                  color: v-bind("detailPinia.itemColor");
                }
              }
            }
          }

          &:last-child {
            margin-bottom: 12%;
          }

          &:hover {
            background-color: rgba(255, 255, 255, 0.587);
          }
        }

        .text {
          padding: 0 8%;
          color: #747474;
          font-weight: 100;
          font-size: 120%;
          margin-bottom: 1%;
        }

        .noCM {
          width: 50%;
          margin: 10% 25%;
        }
      }

      .footer {
        position: fixed;
        bottom: 0;
        background-color: #f7f7f7;
        width: inherit;
        border-radius: inherit;
        height: 50px;
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        padding: 0 5%;
        box-sizing: border-box;
        align-items: center;

        .who {
          background-color: v-bind("detailPinia.itemColor + '50'");
          border-radius: 50rem;
          height: 50%;
          padding: 0 1rem;
          line-height: 150%;
          cursor: pointer;
        }

        input {
          height: 50%;
          margin-right: 5%;
          border: none;
          background-color: v-bind("detailPinia.itemColor + '50'");
          border-radius: 50rem;
          outline: none;
          padding: 0 1rem;
          color: v-bind("detailPinia.itemColor");
          transition: all 0.1s;

          &:hover {
            background-color: v-bind("detailPinia.itemColor + '70'");
          }

          &:focus {
            background-color: v-bind("detailPinia.itemColor + '70'");
          }
        }

        button {
          height: 50%;
          border: none;
          background-color: v-bind("detailPinia.itemColor + '80'");
          border-radius: 50rem;
          outline: none;
          padding: 0 1rem;
          color: v-bind("detailPinia.itemColor");
          transition: all 0.1s;

          &:hover {
            background-color: v-bind("detailPinia.itemColor");
            color: #ffffffde;
          }
        }
      }
    }
  }
}
</style>
