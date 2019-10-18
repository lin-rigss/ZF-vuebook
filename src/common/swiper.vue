<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(slide, index) in swiperSlides" :key="index">
        <img class="img" :src="slide" alt>
      </div>
    </div>
    <div class="swiper-pagination"></div>
  </div>
</template>

<script>
    import swiper from 'swiper'   
    export default {
         props:['swiperSlides'], 
         updated(){ 
             new swiper('.swiper-container',{
                speed: 500,
                loop: true,
                autoplay: {
                   disableOnInteraction: false,
                   delay: 2500,
                },
                pagination: {  
                    el: '.swiper-pagination',
                },
             })
         }       
    }
</script>

<style lang='less'>  
  .img{
    width: 100%;
  }
</style>
 