// 创建rotateCard插件
const rotateCard = {
  install(Vue) {
    // 判断Vue的版本
    const isVue2 = Vue.version.startsWith("2.");

    // 注册插件
    if (isVue2) {
      Vue.directive("rotate-card", {
        inserted(el, binding) {
          // 验证目标元素是否有效
          if (!(el instanceof HTMLElement)) {
            throw new Error("Invalid target element provided.");
          }

          // 默认配置
          const defaultOptions = {
            sensitivity: 45,
            borderRadius: "10px",
            position: "relative",
            fontSize: "20px",
            padding: "10px",
            color: "#fff",
            whitespace: "pre-wrap",
            cursor: "default",
          };

          // 合并默认配置和用户自定义配置
          const mergedOptions = { ...defaultOptions, ...binding.value };

          // 设置卡片的宽高和样式
          Object.entries(mergedOptions).forEach(([key, value]) => {
            el.style[key] = value;
          });

          /**
           * 处理鼠标移动事件
           * @param {MouseEvent} e - 鼠标移动事件对象
           */
          function handleMouseMove(e) {
            const x = e.clientX;
            const y = e.clientY;

            // 获取卡片位置和尺寸信息
            const rect = el.getBoundingClientRect();
            const offsetX = x - (rect.left + rect.width / 2);
            const offsetY = y - (rect.top + rect.height / 2);

            // 根据鼠标偏移量计算旋转角度
            const rotateX = offsetY / mergedOptions.sensitivity;
            const rotateY = -offsetX / mergedOptions.sensitivity;

            // 应用3D透视旋转效果
            el.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
          }

          // 绑定鼠标移动事件监听器
          document.addEventListener("mousemove", handleMouseMove);

          /**
           * 解绑事件监听器
           */
          function unbindEvents() {
            document.removeEventListener("mousemove", handleMouseMove);
          }

          // 在Vue组件销毁之前解绑事件监听器
          el.__unbindEvents__ = unbindEvents;
        },
        unbind(el) {
          // 解绑事件监听器
          if (el.__unbindEvents__) {
            el.__unbindEvents__();
            delete el.__unbindEvents__;
          }
        },
      });
    } else {
      Vue.directive("rotate-card", {
        mounted(el, binding) {
          // 验证目标元素是否有效
          if (!(el instanceof HTMLElement)) {
            throw new Error("Invalid target element provided.");
          }

          // 默认配置
          const defaultOptions = {
            sensitivity: 45,
            borderRadius: "10px",
            position: "relative",
            fontSize: "20px",
            padding: "10px",
            color: "#fff",
            whitespace: "pre-wrap",
            transition: "all 0.1s",
            cursor: "default",
          };

          // 合并默认配置和用户自定义配置
          const mergedOptions = { ...defaultOptions, ...binding.value };

          // 设置卡片的宽高和样式
          Object.entries(mergedOptions).forEach(([key, value]) => {
            el.style[key] = value;
          });

          /**
           * 处理鼠标移动事件
           * @param {MouseEvent} e - 鼠标移动事件对象
           */
          function handleMouseMove(e) {
            // 获取鼠标的x坐标
            const x = e.clientX;
            // 获取鼠标的y坐标
            const y = e.clientY;

            // 获取卡片位置和尺寸信息
            const rect = el.getBoundingClientRect();
            const offsetX = x - (rect.left + rect.width / 2);
            const offsetY = y - (rect.top + rect.height / 2);

            // 根据鼠标偏移量计算旋转角度
            const rotateX = offsetY / mergedOptions.sensitivity;
            const rotateY = -offsetX / mergedOptions.sensitivity;

            // 应用3D透视旋转效果
            el.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
          }

          // 绑定鼠标移动事件监听器
          document.addEventListener("mousemove", handleMouseMove);

          /**
           * 解绑事件监听器
           */
          function unbindEvents() {
            document.removeEventListener("mousemove", handleMouseMove);
          }

          // 在Vue组件销毁之前解绑事件监听器
          el.__unbindEvents__ = unbindEvents;
        },
        unmounted(el) {
          // 解绑事件监听器
          if (el.__unbindEvents__) {
            el.__unbindEvents__();
            delete el.__unbindEvents__;
          }
        },
      });
    }
  },
};

// 导出旋转卡片函数
export default rotateCard;
