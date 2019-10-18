<template>
  <div class="detailBox">
    <Title :ishow='true'>详情页</Title>
    <ul>
      <li>
        <label for="name">书的名称</label>
        <input type="text" id="name" v-model="book.bookName">
      </li>
      <li>
        <label for="info">书的详情</label>
        <input type="text" id="name" v-model="book.bookInfo">
      </li>
      <li>
        <label for="price">书的价格</label>
        <input type="text" id="name" v-model.number="book.bookPrice">
      </li>
     
         <button class="btn" @click="submit">提交</button>     
    </ul>
  </div>
</template>

<script>
  import Title from '../common/Title'
  import { oneBook,updataBook } from '../api'

  export default {
     data () {
       return { book:{} }
     },
    computed: {
       did(){
         return this.$route.params.id
       }
     },
     created() {
         this.getData();
     },
     // 监听路由变化了， 就重新获取数据
     watch:{
       $route(){
         this.getData();
       }
     },    
     methods: {         
        async getData(){
           // 通过id 找到对应的数据，赋值给 book
           this.book = await oneBook(this.did);
           // 如果是没有找到id 则后台返回的是一个空{} ,如果this.book是一个{}对象，就跳转到列表页。
           // void 0 代表不做任何处理。
           Object.keys(this.book).length > 0 ? void 0 : this.$router.push('/list');
        },

        // 修改此id 的数据，把当前id和修改后的数据 提交给后台。
        async submit(){ 
           await updataBook(this.did,this.book);
           // 修改完成后 跳转到列表页。
           this.$router.push('/list')
        }
     },
     components: {
       Title
     },

  }
</script>


<style scoped lang='less'>
   .detailBox{
     position: absolute;
     top: 40px;
     left: 0;
     right: 0;
     bottom: 0;
     background-color: #fff;
     z-index: 10;
   }
   
   ul{
     margin: 30px 30px 0 30px;
      li{
        margin-bottom: 10px;        
        label{
          display: block;
          font-size: 20px;
          margin-bottom: 10px;
          font-weight: 600;
        } 
        input{
          width: 100%;
          height: 30px;
          outline: none;
          border: 1px solid #ccc;
          // padding-left: 5px;
          font-size: 18px;
        }
        
         
      }
      button{
          display:block;
          width: 100px;
          height: 40px;
          background-color: cornflowerblue;
          color: #fff;
          border: none;
          border-radius: 6px;
          outline: none;
          font-size: 18px;
          margin: auto;
          margin-top: 30px;
   }      
   }
  

</style>