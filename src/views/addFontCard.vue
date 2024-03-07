<template>
  <div>
    <div class="box">
      <!-- addBtn -->
      <img src="@/assets/image/add.svg" @click="drawer = Boolean(!drawer)" />
      <!-- Drawer -->
      <el-drawer class="drawer" v-model="drawer" title="新 建 留 言" append-to-body :with-header="true">
        <el-form class="form" ref="formRef" scroll-to-error="true" :model="formData" :rules="rules" label-position="top">
          <el-form-item label="标题" prop="title">
            <el-input v-model="formData.title" type="text" placeholder="请输入标题" />
          </el-form-item>

          <el-form-item label="留言内容" prop="content">
            <el-input
              maxlength="300"
              show-word-limit
              v-model="formData.content"
              autosize
              type="textarea"
              placeholder="请输入内容" />
          </el-form-item>

          <el-form-item label="卡片颜色">
            <el-color-picker v-model="formData.itemColor" />
          </el-form-item>

          <el-divider />

          <el-form-item class="showCard">
            <a-card class="card" hoverable :style="{ 'background-color': `${formData.itemColor}40` }">
              <template #cover>
                <div class="text">{{ formData.content }}</div>
              </template>
              <a-card-meta :title="formData.title">
                <template #description>
                  <el-row class="content" justify="start">
                    <el-col :span="5"><el-image class="el-img" :src="userInfo.info.avatar" /></el-col>
                    <el-col :span="8" :offset="1">
                      <p>{{ userInfo.info.name }}</p>
                    </el-col>
                    <el-col :span="4" :offset="6"><img class="like" src="@/assets/image/like.svg" alt="喜欢" /></el-col>
                    <el-col :span="24">
                      <p style="font-size: 1vw; text-align: right">{{ formData.createdAt }}</p>
                    </el-col>
                  </el-row>
                </template>
              </a-card-meta>
            </a-card>
          </el-form-item>

          <el-divider />

          <el-form-item class="subimt">
            <el-button type="primary" @click="publish(formRef)">发布</el-button>
          </el-form-item>
        </el-form>
      </el-drawer>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref, defineEmits } from "vue";
  import { FormInstance, ElNotification } from "element-plus";
  import { FontCardRules } from "@/utils/structure/addCard";
  import { user } from "@/store/modules/user";
  import { useRouter } from "vue-router";
  import { addFontCard } from "@/utils/api/addCard";
  // 创建路由
  const route = useRouter();

  // 模态框
  const drawer = ref<boolean>(false);
  const formData = ref<FontCardRules>({
    title: "",
    type: "text",
    content: "",
    createdAt: "时间",
    itemColor: "#009DFF",
    uId: null,
  });
  // 模态框校验
  const formRef = ref<FormInstance>();
  const rules = ref({
    title: [{ required: true, message: "请输入标题", trigger: "blur" }],
    content: [{ required: true, message: "请输入内容", trigger: "blur" }],
  });

  // pinia user
  const userInfo = user();

  // sunmit
  const emit = defineEmits();
  function publish(formEl: FormInstance | undefined) {
    if (!formEl) return;
    formEl.validate((valid) => {
      if (valid) {
        if (userInfo.info.uId !== null) {
          formData.value.uId = userInfo.info.uId;
          formData.value.createdAt = new Date().toLocaleString(); // 设置创建时间
          request(formData.value);
          drawer.value = false; // 发布成功后关闭抽屉
          // 通过emit通知父组件更新列表
          emit("updateList", formData);
          return;
        }
        route.push("/login");
      } else {
        console.log("error submit!");
        return false;
      }
    });
  }

  // 请求
  function request(data: object) {
    const d = addFontCard(data) as any;
    d.then(() => {
      ElNotification({
        title: "发布成功",
        message: "您已发布一条留言至留言墙",
        type: "success",
      });
    });
  }
</script>

<style lang="scss" scoped>
  div {
    .box {
      display: flex;
      height: inherit;
      opacity: 0.8;
      img {
        margin: auto;
        width: 50%;
        transition: all 0.2s;
      }

      &:hover {
        opacity: 1;
        img {
          width: 80%;
        }
      }
    }
  }
</style>
