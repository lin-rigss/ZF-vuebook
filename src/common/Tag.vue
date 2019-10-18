<template>
  <div class="tag">
      <router-link to='/home'>
        <i class="iconfont icon-shouye"></i>
        <span>首页</span>
      </router-link>
      <router-link to='/list'>
        <i class="iconfont icon-liebiao"></i>
        <span>列表</span>
      </router-link>
      <router-link to='/collect'>
        <i class="iconfont icon-shoucang"></i>
        <span>购物车</span>
      </router-link>
      <router-link to='/add'>
        <i class="iconfont icon-tianjia"></i>
        <span>添加</span>
      </router-link>
  </div>
</template>


<script>
  export default {
     data () {
       return {}
     },
     methods: {}

  }
</script>


<style scoped lang='less'>
   .tag{
       position: fixed;
       left: 0;
       bottom: 0;
       width: 100%;
       height: 53px;
       background-color: cornflowerblue;
       display: flex;
       a{  
           display: flex;
           flex: 1;
           color: rgba(255, 255, 255, 0.788);
           justify-content: center;
           align-items: center;
           flex-direction:column; 
       }
       a.active{
           color:rgb(3, 35, 95);
       }
      
   }

</style>