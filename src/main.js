import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import Vuelidate from 'vuelidate'
import VueSweetalert2 from 'vue-sweetalert2'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import BounceLoader from 'vue-spinner/src/BounceLoader.vue'
import qrcodeVue from 'qrcode.vue'
import 'sweetalert2/dist/sweetalert2.min.css';
import './style/style.css'
import './plugins/Alpha-Icons-v5.5.4/style.css'

Vue.config.productionTip = false
Vue.use(Vuelidate)
Vue.use(VueSweetalert2)
Vue.component('qrcode-vue', qrcodeVue)
Vue.component('bounce-loader', BounceLoader)

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: false,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})
window.Toast = Toast

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
