import { defineStore } from "pinia"
import { ref } from "vue"

export const user = defineStore("user", () => {
  const localStorageUser = JSON.parse(localStorage.getItem("user") as string)

  const info = ref({
    uId: null,
    avatar: undefined,
    name: "",
    account: ""
  })

  if (localStorageUser) {
    info.value = {
      uId: localStorageUser.uId,
      avatar: localStorageUser.avatar,
      name: localStorageUser.name,
      account: localStorageUser.account
    }
  }

  return {
    info
  }
})
