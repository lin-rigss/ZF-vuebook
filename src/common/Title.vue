<template>
  <div>
    <div class="title">
        <slot></slot>
        <i class="iconfont icon-icon-" @click="back" v-if="ishow"></i>        
    </div>
  </div>
</template>

<script>
  export default {
     data () {
       return {}
     },
     props:{
        ishow:{
            type:[Boolean],
            default:false
        }
     },
     components: {},
     methods: {
         back(){
             this.$router.go(-1)
         }
     },

  }
</script>


<style scoped lang='less'>
   .title{
       position: fixed;
       top: 0;
       left: 0;
       width: 100%;
       height: 40px;
       line-height: 40px;
       background-color: cornflowerblue;
       color:#fff;
       text-align: center;
       font-size: 19px;
       i{
           position: fixed;
           left: 10px;
       }
   }

</style>