import Vue from 'vue'
import App from './App.vue'
import io from 'socket.io-client'
Vue.config.productionTip = false

import 'bulma'

new Vue({
  render: h => h(App),
  data: {
    socket: io("/light") 
  }
}).$mount('#app')
