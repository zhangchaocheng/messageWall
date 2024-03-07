import { defineStore } from "pinia"
import { ref } from "vue"

export const content = defineStore("content", () => {
  const state = ref<boolean>(true)
  return {
    state,
  }
})