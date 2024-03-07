<template>
  <Header />
  <div class="love-wall">
    <div v-for="love in loveList" :key="love.id" class="love-card">
      <div class="love-image-container">
        <img :src="love.user.avatar" :alt="love.user.name" class="love-image" />
      </div>
      <div class="love-details">
        <div class="love-message">{{ love.message }}</div>
        <div class="love-date">{{ love.date }}</div>
        <button @click="toggleCommentForm(love)" class="comment-button">
          {{ love.showCommentForm ? "Hide" : "Show" }} Comment Form
        </button>
        <div v-if="love.showCommentForm" class="comment-form">
          <input type="text" v-model="love.commentText" placeholder="Write a comment..." class="comment-input" />
          <button @click="submitComment(love)" class="submit-comment-button">Submit</button>
        </div>
        <div class="comments">
          <div v-for="comment in love.comments" :key="comment.id" class="comment">
            <img :src="comment.user.avatar" :alt="comment.user.name" class="comment-avatar" />
            <div class="comment-text">{{ comment.user.name }}: {{ comment.text }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Header from "@/views/common/header.vue";
const loveList = ref([
  {
    id: 1,
    user: { name: "小明", avatar: "https://img.tukuppt.com/ad_preview/00/14/50/5c998d57ac141.jpg!/fw/980" },
    image: "love1.jpg",
    message: "我爱你，就像风走了八千里，不问归期。",
    date: "2022-05-15",
    showCommentForm: ref(false),
    commentText: ref(""),
    comments: [
      {
        id: 1,
        user: { name: "小红", avatar: "https://img.tukuppt.com/ad_preview/00/14/50/5c998d57ac141.jpg!/fw/980" },
        text: "加油！",
      },
      {
        id: 2,
        user: { name: "小刚", avatar: "https://img.tukuppt.com/ad_preview/00/14/50/5c998d57ac141.jpg!/fw/980" },
        text: "支持你！",
      },
    ],
  },
  {
    id: 1,
    user: { name: "小明", avatar: "https://img.tukuppt.com/ad_preview/00/14/50/5c998d57ac141.jpg!/fw/980" },
    image: "love1.jpg",
    message: "我爱你，就像风走了八千里，不问归期。",
    date: "2022-05-15",
    showCommentForm: ref(false),
    commentText: ref(""),
    comments: [
      {
        id: 1,
        user: { name: "小红", avatar: "https://img.tukuppt.com/ad_preview/00/14/50/5c998d57ac141.jpg!/fw/980" },
        text: "加油！",
      },
      {
        id: 2,
        user: { name: "小刚", avatar: "https://img.tukuppt.com/ad_preview/00/14/50/5c998d57ac141.jpg!/fw/980" },
        text: "支持你！",
      },
    ],
  },
  {
    id: 1,
    user: { name: "小明", avatar: "https://img.tukuppt.com/ad_preview/00/14/50/5c998d57ac141.jpg!/fw/980" },
    image: "love1.jpg",
    message: "我爱你，就像风走了八千里，不问归期。",
    date: "2022-05-15",
    showCommentForm: ref(false),
    commentText: ref(""),
    comments: [
      {
        id: 1,
        user: { name: "小红", avatar: "https://img.tukuppt.com/ad_preview/00/14/50/5c998d57ac141.jpg!/fw/980" },
        text: "加油！",
      },
      {
        id: 2,
        user: { name: "小刚", avatar: "https://img.tukuppt.com/ad_preview/00/14/50/5c998d57ac141.jpg!/fw/980" },
        text: "支持你！",
      },
    ],
  },
  {
    id: 1,
    user: { name: "小明", avatar: "https://img.tukuppt.com/ad_preview/00/14/50/5c998d57ac141.jpg!/fw/980" },
    image: "love1.jpg",
    message: "我爱你，就像风走了八千里，不问归期。",
    date: "2022-05-15",
    showCommentForm: ref(false),
    commentText: ref(""),
    comments: [
      {
        id: 1,
        user: { name: "小红", avatar: "https://img.tukuppt.com/ad_preview/00/14/50/5c998d57ac141.jpg!/fw/980" },
        text: "加油！",
      },
      {
        id: 2,
        user: { name: "小刚", avatar: "https://img.tukuppt.com/ad_preview/00/14/50/5c998d57ac141.jpg!/fw/980" },
        text: "支持你！",
      },
    ],
  },
]);

const toggleCommentForm = (love: any) => {
  love.showCommentForm = !love.showCommentForm;
};

const submitComment = (love: any) => {
  if (love.commentText.trim() !== "") {
    love.comments.push({
      id: love.comments.length + 1,
      user: { name: "Fengfeng", avatar: "https://img.tukuppt.com/ad_preview/00/14/50/5c998d57ac141.jpg!/fw/980" },
      text: love.commentText,
    });
    love.commentText = "";
  }
};
</script>

<style lang="scss" scoped>
.love-wall {
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  padding: 20px 10vw;
}

.love-card {
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  margin-bottom: 20px;
}

.love-image-container {
  height: 400px;
  overflow: hidden;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;

  .love-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.love-details {
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .love-message {
    font-size: 16px;
    margin-bottom: 10px;
  }

  .love-date {
    color: #888;
    margin-bottom: 10px;
  }

  .comment-button {
    padding: 5px 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #f5f5f5;
    cursor: pointer;
    margin-bottom: 10px;
  }

  .comment-form {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 10px;

    .comment-input {
      width: 100%;
      padding: 5px;
      border: 1px solid #ccc;
      border-radius: 5px;
      margin-bottom: 10px;
    }

    .submit-comment-button {
      padding: 5px 10px;
      border: 1px solid #ccc;
      border-radius: 5px;
      background-color: #f5f5f5;
      cursor: pointer;
    }
  }

  .comments {
    flex: 1;
    overflow-y: auto;
    padding: 10px;
    border-top: 1px solid #ccc;

    .comment {
      display: flex;
      align-items: center;
      margin-bottom: 5px;

      .comment-avatar {
        width: 30px;
        height: 30px;
        object-fit: cover;
        border-radius: 50%;
        margin-right: 10px;
      }

      .comment-text {
        font-size: 14px;
      }
    }
  }
}
</style>
