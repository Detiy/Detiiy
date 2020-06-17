// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './plugins/element.js'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/global.css'
import 'lib-flexible'
import axios from 'axios'
import store from './store/index.js'
axios.defaults.baseURL = "http://localhost:8090"
Vue.prototype.$http = axios
Vue.config.productionTip = false
import Router from 'vue-router'
const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error)
}
/* eslint-disable no-new */
Vue.filter('formatDate', function (value) {
  let time = new Date(value);
  function timeAdd0(str) {
    if (str < 10) {
      str = '0' + str;
    }
    return str
  }
  var y = time.getFullYear();
  var m = time.getMonth() + 1;
  var d = time.getDate();
  // var h = time.getHours();
  // var mm = time.getMinutes();
  // var s = time.getSeconds();
  return y + '-' + timeAdd0(m + 1) + '-' + timeAdd0(d);
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')