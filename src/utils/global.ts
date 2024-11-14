import type { App } from "vue";

const test = function (name: string) {
  console.log(name);
}

export default {
  install (app: App) {
    app.config.globalProperties.$test = test
  }
}
