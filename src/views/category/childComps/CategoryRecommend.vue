<template>
  <div class="recommend">
    <goods-list-item
    class="goods" 
    :goodsItem="item"
    v-for="(item,index) in recommend" :key="index"
    />
  </div>
</template>

<script>
import GoodsListItem from '@/components/content/goods/GoodsListItem.vue';
export default {
  components: { GoodsListItem },
  name: 'CategoryRecommend',
  props:{
    recommend:{
      type:Array,
      default(){
        return[]
      }
    }
  }
};
</script>

<style scoped>
.recommend{
  display: flex;
  flex-wrap: wrap;
  padding: 0 8px;
}
.goods{
  width: 35vw;
  margin-right: 2vw;
  
}
</style>
