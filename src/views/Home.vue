<template>
  <div>
    <Title :ishow="false">首页</Title>
    <div class="content">
      <Swiper :swiperSlides="sliders"></Swiper>
      <loading v-if="loading"></loading>
      <template v-else>
        <h3 class="title">热门图书</h3>
        <div class="container">
          <ul>
            <router-link
              :to="{name:'detail',params:{id:item.bookId}}"
              tag="li"
              v-for="(item, index) in books"
              :key="index"
            >
              <img :src="item.bookCover">
              <p>{{item.bookName}}</p>
            </router-link>
          </ul>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import Title from "../common/Title";
import Swiper from "../common/swiper";
import loading from "../common/Loading";
import { getAllData } from "../api";
export default {
  data() {
    return {
      sliders: [],
      books: [],
      loading: true
    };
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      let [sliders, books] = await getAllData(); // 方法执行后返回结果是一个数组，然后将数组解构
      this.sliders = sliders;
      this.books = books;
      // 当 轮播图数据和热门图书数据 已经同时获取成功后将loading = false
      this.loading = false;
    }

    // 使用 async await 语法糖 代替.then方法。
    // async getSlidersList(){
    //   this.sliders = await getSliders();
    // },
    // async getBookList(){
    //   this.books = await getBooks();
    // }
  },
  components: {
    Title,
    Swiper,
    loading
  }
};
</script>


<style scoped lang='less'>
.title {
  margin-left: 20px;
  font-size: 20px;
  line-height: 45px;
}
.container {
  width: 90%;
  margin: 0 auto;
  ul {
    display: flex;
    flex-wrap: wrap;
    text-align: center;
    li {
      width: 50%;
      margin-bottom: 10px;
      img {
        width: 100%;
      }
    }
  }
}
</style>