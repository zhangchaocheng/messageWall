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
            <el-input maxlength="300" show-word-limit v-model="formData.content" autosize type="textarea"
              placeholder="请输入内容" />
          </el-form-item>

          <el-divider />

          <el-upload name="file" :on-success="Suc" action="http://79d678c6.r21.cpolar.top/api/upload" list-type="picture-card"
            :auto-upload="true">
            <el-icon>
              <Plus />
            </el-icon>
          </el-upload>

          <el-divider />

          <el-form-item class="showCard">
            <a-card class="card" hoverable>
              <template #cover>
                <img v-if="formData.images === ''" class="cover" src="@/assets/image/bg.svg" />
                <img v-else class="cover" :src="getBefore(formData.images)" />
              </template>
              <a-card-meta title="123">
                <template #description>
                  <el-row class="content" justify="start">
                    <el-col :span="5"><el-image class="el-img" src="@/assets/image/avatar.svg" /></el-col>
                    <el-col :span="8" :offset="1">
                      <p>zcc</p>
                    </el-col>
                    <el-col :span="4" :offset="6">
                      <img class="like" src="@/assets/image/like.svg" alt="喜欢" />
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
import { ref } from "vue";
import { FormInstance, ElNotification } from "element-plus";
import { GraphicCard } from "@/utils/structure/addCard";
import { user } from "@/store/modules/user";
import { useRouter } from "vue-router";
import { addGraphicCard } from "@/utils/api/addCard";
import { Plus } from "@element-plus/icons-vue";
// 创建路由
const route = useRouter();

// 模态框
const drawer = ref<boolean>(false);
const formData = ref<GraphicCard>({
  title: "",
  type: "image",
  content: "",
  createdAt: "时间",
  uId: null,
  images: "",
});
// 模态框校验
const formRef = ref<FormInstance>();
const rules = ref({
  title: [{ required: true, message: "请输入标题", trigger: "blur" }],
  content: [{ required: true, message: "请输入内容", trigger: "blur" }],
});

// pinia user
const userInfo = user();

// 工具函数，将字符串以第一个\\分割取其前部分
function getBefore(str: string) {
  return str.split("\\")[0];
}

// sunmit
function publish(formEl: FormInstance | undefined) {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      if (userInfo.info.uId !== null) {
        formData.value.uId = userInfo.info.uId;
        formData.value.createdAt = new Date().toLocaleString(); // 设置创建时间
        request(formData.value);
        drawer.value = false; // 发布成功后关闭抽屉
        return;
      }
      route.push("/login");
    } else {
      console.log("error submit!");
      return false;
    }
  });
}

function Suc(res: any) {
  if (formData.value.images === "") {
    formData.value.images = res.url;
  } else {
    formData.value.images += "\\\\" + res.url;
  }
}

// 请求
function request(data: object) {
  const d = addGraphicCard(data) as any;
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

    .card {
      background-color: #fff;
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
