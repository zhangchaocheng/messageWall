<template>
  <div class="box">
    <div class="shaow">
      <div>MESSAGE WALL</div>
      <el-form class="form" ref="formRef" :model="form" :rules="rules">
        <el-form-item class="item" label="账户:" prop="phone">
          <el-input v-model="form.phone" type="text" />
        </el-form-item>

        <el-form-item class="item" label="密码:" prop="password">
          <el-input v-model="form.password" show-password type="password" />
        </el-form-item>

        <el-form-item class="item">
          <el-button type="primary" style="width: 30%; margin: auto" @click="submitForm(formRef)"> 登录 </el-button>
        </el-form-item>

        <el-form-item>
          <div><span>忘记密码</span>|<span @click="$router.push('/Register')">注册</span></div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import type { FormInstance } from "element-plus";
import { login } from "@/utils/api/login";
import { useRouter } from "vue-router";
import { user } from "@/store/modules/user";
import { ElNotification } from "element-plus";

const userInfo = ref(user().info);
const router = useRouter();
const formRef = ref<FormInstance>();

// 登录的表单
const form = ref({
  phone: "18611111111",
  password: "Zcc1111@",
});

const pattern = {
  phone: /^1[3-9]\d{9}$/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&*])[A-Za-z\d@#$%^&*]{8,20}$/,
};

// 表单校验
const rules = ref({
  phone: [
    { required: true, message: "请输入手机号", trigger: "blur" },
    {
      pattern: pattern.phone,
      message: "手机号格式不正确",
      trigger: "blur",
    },
  ],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    {
      pattern: pattern.password,
      message: "密码必须包含至少一个大写字母、一个小写字母、一个数字、一个特殊字符",
      trigger: "blur",
    },
  ],
});

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      const res = login(form.value) as any;
      res.then((re: any) => {
        localStorage.setItem("user", JSON.stringify(re.results));
        userInfo.value.uId = re.results.uId;
        userInfo.value.avatar = re.results.avatar;
        userInfo.value.name = re.results.name;
        userInfo.value.account = re.results.phone;
        ElNotification({
          title: "登录成功",
          message: "欢迎回来:" + re.results.name,
          type: "success"
        })
        router.push("/");
      })
    } else {
      ElNotification({
        title: "登录失败",
        message: "请检查输入信息",
        type: "error"
      })
      return false;
    }
  });
};
</script>

<style lang="scss" scoped>
.box {
  width: 100vw;
  height: 100vh;
  display: flex;

  .shaow {
    margin: auto;
    padding: 2rem;
    box-sizing: border-box;
    width: 35vw;
    border-radius: 50px;
    background: inherit;
    box-shadow: -20px -20px 60px #bebebe, 20px 20px 60px #ffffff;

    div {
      width: 100%;
      text-align: center;
      font-size: 2.5vw;
      color: #7d7d7d;
      font-weight: 900;
    }

    .form {
      margin-top: 3rem;

      .item {
        align-items: center;
        margin-bottom: 3rem;

        .input {
          height: 50px;
          border-radius: 2rem;
        }
      }

      div {
        width: 100%;
        font-size: 1rem;
        cursor: default;

        span {
          margin: 0 1rem;
          cursor: pointer;
          transition: all 0.2s;

          &:hover {
            color: #474747;
          }
        }
      }
    }
  }
}
</style>
