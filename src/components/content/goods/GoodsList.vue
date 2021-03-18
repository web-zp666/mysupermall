<template>
  <div class="goods-list">
    <goods-list-item v-for="(item,id) in goods" :goodsItem="item" :key="id"/>
  </div>
</template>

<script>
import GoodsListItem from './GoodsListItem.vue'
export default {
  components: { GoodsListItem },
  name:'GoodsList',
  props:{
    goods:Array,
    default(){
      return []
    }
  }
}
</script>

<style scoped>
.goods-list{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 2px;
}
</style>
