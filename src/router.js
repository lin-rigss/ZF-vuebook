import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

let routes=[
   {
     path:'',
     redirect:'/home'
    },
   {
     path:'/home',
     component:()=>import('./views/Home.vue'),
     meta:{keepAlive:true,title:'书城'}
    },
   {
     path:'/list',
     component:()=>import('./views/List.vue'),
     meta:{title:'列表'}
     
    },
   {
     path:'/car',
     component:()=>import('./views/Car.vue'),
     meta:{title:'购物车'}
    },
   {
     path:'/add',
     component:()=>import('./views/Add.vue'),
     meta:{title:'增加'}
    },
   {
     path:'/detail/:id',
     name:'detail',
     component:()=>import('./views/Detail.vue'),
     meta:{title:'详情'}
    },
   {
     path:'*',
     redirect:'/home'
    }
]

export default new Router({
  routes,
  linkActiveClass:'active'
})
