<template>
  <div id="shop-item">
    <div class="item-selector">
      <check-button @selectItem="selectItem" :is-checked="product.isChecked"/>
    </div>
    <div class="item-img">
      <img :src="product.imgUrl" alt="商品图片">
    </div>
    <div class="item-info">
      <div class="item-title">{{product.title}}</div>
      <div class="item-desc">
        商品描述：{{product.desc}}
      </div>
      <div class="item-bottom">
        <div class="item-price">￥{{product.price}}</div>
        <div class="item-count">x{{product.count}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import CheckButton from './CheckButton.vue';
export default {
  components: { CheckButton },
  name: 'CartListItem',
  props:{
    product:{
      type:Object,
      default(){
        return{}
      }
    },
  },
  methods:{
    selectItem(){
      this.product.isChecked = !this.product.isChecked
    }
  }
};
</script>

<style scoped>
#shop-item{
  display: flex;
  width: 100%;
  padding: 5px;
  border-bottom: 1px solid #ccc;
  font-size: 15px;
}
.item-selector{
  display: flex;
  justify-content: center;
  align-items: center;
}
.item-img{
  padding: 5px;
}
.item-img img{
  width: 80px;
  height: 100px;
  border-radius: 5px;
  display: block;
}
.item-info{
  font-size: 17px;
  color: #333;
  padding: 5px 10px;
  overflow: hidden;
  position: relative;
}
.item-title,.item-desc{
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.item-info .item-desc {
  font-size: 14px;
  color: #666;
  margin-top: 15px;
}
.item-bottom {
  margin-top: 10px;
  position: absolute;
  bottom: 10px;
  left: 10px;
  right: 10px;
}
.item-bottom .item-price {
  color: orangered;
  float: left;
}
.item-bottom .item-count {
  float: right;
}
</style>
