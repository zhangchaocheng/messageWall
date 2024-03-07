// 创建一个过滤日期的工具函数并导出
export const filterDate = function (date: string | any[]) {
  return date.slice(0, 10)
}
