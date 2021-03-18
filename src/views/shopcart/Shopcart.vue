<template>
  <div id="cart">
    <nav-bar class="nav-bar">
      <div slot="nav-c">购物车({{length}})</div>
    </nav-bar>
    <scroll class="content" :probeType="3" :pullUpLoad="true">
      <cart-list/>
    </scroll>
    <cart-bottom-bar/>
  </div>
</template>

<script>
import NavBar from '@/components/common/navbar/NavBar.vue'
import { mapGetters } from 'vuex'
import CartList from './childComps/CartList'
import Scroll from '@/components/common/scroll/Scroll.vue'
import CartBottomBar from './childComps/CartBottomBar.vue'




export default {
  name:'Shopcart',
  components: {
    NavBar,
    CartList,
    Scroll,
    CartBottomBar,


  },
  computed:{
    //两种写法：1.括号里是数组，那么数组里面放的是getters中定义的方法名，在插值表达式中使用的时候也必须名字保持一致
    //...mapGetters(['cartLength'])

    //2.使用的时候想改名字来使用的，那么括号里是一个对象,里面的键值对就代表是一种映射关系
    ...mapGetters({
      length:'cartLength'
    })
  }
}
</script>

<style scoped>
#cart{
  height: 100vh;

}
.nav-bar{
  background-color: var(--color-tint);
  color: #fff;
}
.content{
  height: calc(100% - 44px - 49px - 40px);
  overflow: hidden;
}
</style>
