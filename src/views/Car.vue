<template>
  <div>
    <Title :ishow="true">购物车</Title>
    <div class="content">
      <ul>
        <li class="warp" v-for="(item, index) in cartList" :key="index">
          <img v-lazy="item.bookCover" alt>
          <div class="box">
            <h4>{{item.bookName}}</h4>
            <p class="info">{{item.bookInfo}}</p>
            <b class="price">￥{{item.bookPrice}}</b>  
            <p> 数量：<button>-</button>{{item.bookCount}}<button>+</button> <button >删除</button></p>         
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Title from "../common/Title";
// 获取vuex中的state数据 的语法糖
import { mapState,mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState(["cartList"])
    // 将获取到的 vuex中的数据 起别名  ...mapState({cart:'cartList'})
  },
  methods: {},
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
  }
}
</style>