<template>
  <div>
    <Title :ishow='true'>添加页</Title>
     <div class="content">
    <ul>
      <li>
        <label for="cover">书的封面</label>
        <input type="text" id="cover" v-model="book.bookCover">
      </li>
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
         <button class="btn" @click='add'>添加</button>     
    </ul>
     </div>
  </div>
</template>

<script>
  import Title from '../common/Title'
  import {addBook} from '../api'
  export default {
     data () {
       return { book:{}}
     },
     methods: {
       async add(){
         await addBook(this.book);
         this.$router.push('/list');
       }
     },
     components:{
       Title
     }

  }
</script>


<style scoped lang='less'>
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
          background-color: rgb(241, 168, 72);
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