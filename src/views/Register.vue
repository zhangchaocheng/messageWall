<template>
  <div class="box">
    <div class="shaow">
      <div>MESSAGE WALL</div>
      <el-form class="form" ref="formRef" :model="form" :rules="rules">
        <el-form-item class="item" label="账户:" prop="username" label-width="90px">
          <el-input v-model="form.username" type="text" placeholder="请输入账户" />
        </el-form-item>

        <el-form-item class="item" label="密码:" prop="password" label-width="90px">
          <el-input v-model="form.password" show-password type="password" placeholder="请输入密码" />
        </el-form-item>

        <el-form-item class="item" label="确认密码:" prop="confirmPwd" label-width="90px">
          <el-input v-model="form.confirmPwd" show-password type="password" placeholder="请确认密码" />
          <span v-if="form.password !== form.confirmPwd" style="color: red">密码输入不一致！</span>
        </el-form-item>

        <el-form-item class="item" label="手机号码:" prop="phone" label-width="90px">
          <el-input v-model="form.phone" type="phone" placeholder="请输入手机号码" />
        </el-form-item>

        <el-form-item class="item">
          <el-button type="primary" style="width: 30%; margin: auto" @click="submitForm(formRef)"> 注册 </el-button>
        </el-form-item>

        <el-form-item>
          <div><span @click="$router.push('/Login')">前往登录 -></span></div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import type { FormInstance } from "element-plus";
import { register } from "@/utils/api/register";
import { ElNotification } from "element-plus";

const formRef = ref<FormInstance>();
const router = useRouter();

// 登录的表单
const form = ref({
  username: "",
  password: "",
  confirmPwd: "",
  phone: "",
});

const pattern = {
  username: /^[a-zA-Z0-9_-]{3,16}$/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&*])[A-Za-z\d@#$%^&*]{8,20}$/,
  confirmPwd: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&*])[A-Za-z\d@#$%^&*]{8,20}$/,
  phone: /^1[3-9]\d{9}$/,
};

// 表单校验
const rules = ref({
  username: [
    { required: true, message: "请输入账户", trigger: "blur" },
    {
      pattern: pattern.username,
      message: "账户名必须为4-16个字符，包含字母、数字、下划线或短横线",
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
  confirmPwd: [
    { required: true, message: "请再次输入密码", trigger: "blur" },
    {
      pattern: pattern.confirmPwd,
      message: "密码必须包含至少一个大写字母、一个小写字母、一个数字、一个特殊字符",
      trigger: "blur",
    },
  ],
  phone: [
    { required: true, message: "请输入手机号", trigger: "blur" },
    { pattern: pattern.phone, message: "请输入正确的手机号", trigger: "blur" },
  ],
});

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      if (!form.value.phone || !form.value.username || !form.value.password) return;

      // 验证手机格式
      if (form.value.phone.length != 11) return;

      const res = register(form.value);
      res.then((r: any) => {
        ElNotification({
          type: "success",
          title: "成功",
          message: r.message,
        })
        router.push("/login");
      });
    } else {
      ElNotification({
        type: "error",
        title: "错误",
        message: "请填写正确信息",
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
