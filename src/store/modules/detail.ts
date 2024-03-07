import { defineStore } from "pinia"
import { ref } from "vue"

export const detail = defineStore("detail", () => {
  const item = ref()
  return {
    item
  }
})