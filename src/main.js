import Vue from "vue";
import App from "./App.vue";
import router from "./router";

/** include styles */
require("./assets/scss/main.scss");

/** switch off the production tip */
Vue.config.productionTip = false;

/** setup the vue object */
new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
