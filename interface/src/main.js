import Vue from 'vue'
import App from './App.vue'
import 'bulma/css/bulma.css'


Vue.config.productionTip = false

window.app = new Vue({
  render: h => h(App)
}).$mount('#app')
