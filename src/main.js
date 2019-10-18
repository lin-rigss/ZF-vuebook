import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'

import 'swiper/dist/css/swiper.css'
import VueLazyload from 'vue-lazyload'

Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: 'http://img4.imgtn.bdimg.com/it/u=3138838895,2135980005&fm=26&gp=0.jpg',
  loading: 'http://img.lanrentuku.com/img/allimg/1212/5-121204193R0-50.gif',
  attempt: 1
})

router.beforeEach((to,from,next)=>{
  document.title = to.meta.title;
  next();
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
