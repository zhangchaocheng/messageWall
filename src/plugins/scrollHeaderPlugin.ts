export default {
  install(app: { directive: (arg0: string, arg1: { mounted(el: any): void; unmounted(el: any): void; }) => void; }) {
    let oldScrollTop = 0;
    const handleScroll = () => {
      const scrollTop = document.documentElement.scrollTop;
      const header = document.querySelector(".header") as HTMLElement;
      if (scrollTop - oldScrollTop < 0) {
        header.style.transform = "translateY(0%)";
        oldScrollTop = scrollTop
        return;
      }
      header.style.transform = "translateY(-100%)";
      oldScrollTop = scrollTop
    };

    app.directive("scroll-header", {
      mounted(_el) {
        window.addEventListener("scroll", handleScroll);
      },
      unmounted(_el) {
        window.removeEventListener("scroll", handleScroll);
      },
    });
  },
};
