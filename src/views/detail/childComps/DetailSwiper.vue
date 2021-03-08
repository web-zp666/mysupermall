<template>
  <swiper class="D_swiper">
    <swiper-item v-for="(item,id) in topImages" :key="id">
      <img :src="item" alt="">
    </swiper-item>
  </swiper>
</template>

<script>
import {Swiper,SwiperItem} from '@/components/common/swiper/index'
export default {
  name: 'DetailSwiper',
  components:{
    Swiper,SwiperItem
  },
  data() {
    return {

    };
  },
  props:{
    topImages:{
      type:Array,
      default(){
        return []
      }
    }
  }
};
</script>

<style scoped>
.D_swiper{
  height: 300px;
  overflow: hidden;
  
}
</style>
