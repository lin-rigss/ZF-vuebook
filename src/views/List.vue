<template>
  <div>
    <Title :ishow="true">列表页</Title>
    <div class="content" ref="node" @scroll="loadMore" >
      <ul>
        <router-link
          class="warp"
          :to="{name:'detail',params:{id:item.bookId}}"
          tag="li"
          v-for="(item, index) in books"
          :key="index"
        >
          <img v-lazy="item.bookCover" alt>
          <div class="box">
            <h4>{{item.bookName}}</h4>
            <p class="info">{{item.bookInfo}}</p>
            <b class="price">￥{{item.bookPrice}}</b>
            <div class="btn-list">              
              <button class="btnadd" @click.stop="goCar(item)">添加</button>
              <button class="btnremove" @click.stop="remove(item.bookId)">删除</button>
            </div>            
          </div>
        </router-link>
      </ul>
      <button class="MoreBtn" @click="more">点击加载更多数据</button>
    </div>
  </div>
</template>

<script>
import Title from "../common/Title";
import {removeBook , pageBook } from "../api";
import {pullRefresh} from '../utils'
import * as types from '../store/mutations-type'
export default {
  data() {
    return {
      books: [],
      offset: 0, // 代表偏移量
      hasMore: true, //  是否有更多数据
      isLoading: false // 是否正在加载中，默认为false
    };
  },
  created() {
    this.getData();
  },

  mounted() { 
    this.$nextTick(()=>{
       //  pullRefresh(this.$refs.node,this.getData)
      let node = this.$refs.node;
      let top = node.offsetTop;
      let distance = 0;
      let isMove = false;
      node.addEventListener('touchstart',(ev)=>{
        // 判断 滚动条在最顶端，并且当前盒子也在最项端时，才执行下面代码  取反，不做任何处理。
        if(node.scrollTop != 0 || node.offsetTop != top ) return
        let start = ev.touches[0].pageY; // 手指点击的开始位置

        let move = (ev)=>{
          // console.log('move')
          isMove = true;
          let current= ev.touches[0].pageY;
          distance= current-start; // 求的拉动距离，负的就不要了，
          if(distance > 0){
            if(distance <= 50){
              node.style.top =  distance + top+'px';            
            }else {
              // 设定 最大拉动距离为 50px
              distance = 50;
              node.style.top = top + 50+'px';
            }           
          }else{
            // 如果距离为负 就移除move和end事件
            node.removeEventListener('touchmove',move);
            node.removeEventListener('touchend',end);
          }
        };

        let end = (ev)=>{
          // console.log('end')
          if(!isMove) return
          isMove = false;
          clearInterval(this.timer1);
          this.timer1 = setInterval(()=>{
              if(distance <=0){
                  clearInterval(this.timer1);
                  distance = 0;
                  node.style.top = top+'px';
                  node.removeEventListener('touchmove',move);
                  node.removeEventListener('touchend',end);
                  
                  this.books = [];
                  //  this.offset= this.books.length;
                  this.hasMore = true;                 
                  this.getData();
                  return
              }
            distance -= 1;
            node.style.top = top + distance + 'px';
          },10);
        };
        node.addEventListener('touchmove',move);
        node.addEventListener('touchend',end);
      },false);     
    })   
  },

  methods: {
     goCar(book){
       this.$store.commit(types.ADD_CART,book);
       this.$router.push('/car')
     },


    // 分页获取图书
    async getData() {
      // 如果有更多数据，并且 不是正在加载中  条件成立
      if (this.hasMore && !this.isLoading) { 
        // 正在加载
        this.isLoading = true ;       
        let { hasMore, books } = await pageBook(this.offset)
        // 合并上一次和当前加载的数据
        this.books = [...this.books, ...books];        
        this.hasMore = hasMore;
        // 将offset 重新赋值为 总数据的长度
        this.offset = this.books.length;
        // 加载完成
        this.isLoading = false ;
      }
    },

    // 滑动滚动条 加载更多数据  
    loadMore() {
      // DOM 防抖操作: 当触发scroll事件时，可能会触发多次，所以使用定时器包裹，下次触发时将上一次定时器清除掉
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        // 获取出 卷去的高度， 可视区域高度，  总高
        let { scrollTop, clientHeight, scrollHeight } = this.$refs.node;
        if (scrollTop + clientHeight + 20 > scrollHeight) {
          // 执行获取数据的方法
          this.getData();
        }
      }, 30);
    }, 
    
    // 点击按钮 加载更多数据
    more(){
       this.getData();
    },   
   

    // 删除某一个图书
    async remove(id) {
      // 发送请求给后台  removeBook(id)，删除此id的数据。
      await removeBook(id);
      // 再操作一下删除前端的数据
      this.books = this.books.filter(item => item.bookId !== id);
    }
  },

  components: {
    Title
  }
};
</script>


<style scoped lang='less'>
.warp {
  width: 100%;
  height: 150px;
  margin-bottom: 2px;
  background-color: #fff;
  padding: 10px 9px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  img {
    height: 100%;
    margin-right: 10px;
  }
  .box {
    // height: 100%;
    display: flex;
    flex-direction: column;
    // padding-top: 5px;
    // justify-content: space-between;
    h4 {
      margin-bottom: 5px;
    }
    .info {
      margin-bottom: 5px;
    }
    .price {
      color: red;
      font-weight: 400;
      margin-bottom: 5px;
    }
    .btn-list{
      width: 130px;
      display: flex;
      justify-content: space-around;
      .btnremove {
      width: 50px;
      height: 25px;
      background-color: red;
      color: #fff;
      border: none;
      border-radius: 6px;
      outline: none;
    }
    .btnadd {
      width: 50px;
      height: 25px;
      background-color: cornflowerblue;
      color: #fff;
      border: none;
      border-radius: 6px;
      outline: none;
    }
    }
    
  }
}
.MoreBtn{
  width: 100%;
  height: 35px;
  background-color: rgb(184, 221, 247);
  color: #333;
  border: none;
}

</style>