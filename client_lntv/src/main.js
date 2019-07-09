import Vue from "vue";
import "./plugins/vuetify";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import addons from "./addons"

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  addons,
  render: h => h(App)
}).$mount("#app");
