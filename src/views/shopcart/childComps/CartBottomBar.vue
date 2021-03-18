<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button class="check-button"
      :is-checked="isSelectAll"
      @click.native="checkClick"/>
      <span class="text">全选</span>
    </div>
    <div class="total-price">
      合计：￥{{totalPrice}}
    </div>
    <div class="calculate" @click="calcClick">
      结算({{checkedLength}})
    </div>
  </div>
</template>

<script>
import CheckButton from './CheckButton.vue';
export default {
  components: { CheckButton },
  name: 'CartBottomBar',
  computed:{
    totalPrice(){
      const cartList = this.$store.state.cartList;
      return cartList.filter((item) => {
        return item.isChecked
      }).reduce((preValue,item) => {
        return preValue + item.count * item.price
      },0).toFixed(2)
    },
    checkedLength(){
      const cartList = this.$store.state.cartList;
      return cartList.filter((item) => {
        return item.isChecked
      }).length
    },
    isSelectAll(){
      const cartList = this.$store.state.cartList;
      //第一种方法：使用filter过滤器，但是使用过滤器会遍历完数组，性能不太高
      /* if(cartList.length === 0){
        return false
      } else{
        return !(cartList.filter(item => !item.isChecked).length)
      } */

      //第二种方法：使用find方法，只要找到第一个符合条件的就会停止，性能比第一种要高
      if(cartList.length === 0){
        return false
      } else{
        return !cartList.find(item => !item.isChecked)
      }

    }
  },
  methods:{
    checkClick(){
      const cartList = this.$store.state.cartList;
      if(this.isSelectAll){
        cartList.forEach(item => item.isChecked = false)
      } else{
        cartList.forEach(item => item.isChecked = true)
      }
    },
    calcClick(){
      if(!this.isSelectAll){
        this.$toast.show('请选择需要购买的商品')
      }
    }
  }
};
</script>

<style scoped>
.bottom-bar{
  height: 40px;
  background-color: #eee;
  display: flex;
  /* padding: 5px 10px; */

}
.check-content{
  display: flex;
  margin-right: 20px;
  align-items: center;
  width: 60px;
  margin-left: 10px;

}
.check-button{
  position: relative;
  margin-right: 5px;
}
.total-price{
  line-height: 40px;
  color: orangered;
  font-weight: 700;
  flex: 1;
}
.calculate{
  height: 100%;
  background-color: orangered;
  width: 120px;
  color: #fff;
  line-height: 40px;
  text-align: center;
}
</style>
