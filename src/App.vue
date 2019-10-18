<template>
  <div id="app">

    <transition name="fadeIn">
      <keep-alive>
        <!-- 需要缓存的页面  （路由映射表中有 meta:{KeepAlive:true} 属性的） -->
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>     
    </transition>

    <transition name='fadeIn'>
       <!-- 不需要缓存的页面  -->
       <router-view v-if="!$route.meta.keepAlive"></router-view>
    </transition>    
        
   <Tag></Tag>
   
  </div>
</template>


<script>
  import Tag from './common/Tag'
  export default {     
     components:{
       Tag,
     },     

  }
</script>



<style lang="less">
  *{ margin: 0;padding: 0;}
  ul,li{list-style: none;}
  a{text-decoration: none;}
  input,button{-webkit-appearance:none;} 
  .content{
    width: 100%;
    position: fixed;
    top:40px;
    bottom:53px;
    overflow: scroll;
  }

.fadeIn-enter{
  opacity: 0;
}
.fadeIn-enter-active{
  transition: all 0.4s linear;
}
.fadeIn-leave-active{
  transition: all 0.4s linear;
  opacity: 0;
}

</style>
