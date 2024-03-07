<template>
  <div class="home">
    <Header class="header" v-scroll-header />
    <Container :formdata="data" class="container" />
    <addCard @updateList="updateList" class="addCard animate__animated animate__fadeInRight" />
  </div>
</template>

<script lang="ts" setup>
  import Header from "@/views/common/header.vue";
  import Container from "@/views/common/container.vue";
  import addCard from "./addFontCard.vue";
  import { ref } from "vue";
  import { user } from "@/store/modules/user";

  const userStore = ref(user().info);
  const data = ref({});

  function updateList(formData: any) {
    formData.value.collection = 0;
    formData.value.userInfo = userStore.value;
    data.value = formData.value;
  }
</script>

<style lang="scss" scoped>
  .home {
    width: 100vw;
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
    .container {
      box-sizing: border-box;
      padding: 0 10vw;
      padding-top: $_header_height;
      height: 100vh;
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
