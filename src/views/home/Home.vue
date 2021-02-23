<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="nav-c">购物街</div>
    </nav-bar>
    <home-swiper :banners="banners"/>
    <recommend-view :recommends="recommends"/>
    <feature-view/>
    <tab-control :titles = "['流行','新款','精选']"/>
    <ul>
      <li>商品1</li>
      <li>商品2</li>
      <li>商品3</li>
      <li>商品4</li>
      <li>商品5</li>
      <li>商品6</li>
      <li>商品7</li>
      <li>商品8</li>
      <li>商品9</li>
      <li>商品10</li>
      <li>商品11</li>
      <li>商品12</li>
      <li>商品13</li>
      <li>商品14</li>
      <li>商品15</li>
      <li>商品16</li>
      <li>商品17</li>
      <li>商品18</li>
      <li>商品19</li>
      <li>商品20</li>
    </ul>
  </div>
</template>

<script>
//导入公共组件
import NavBar from '@/components/common/navbar/NavBar.vue'
import TabControl from '@/components/content/tabcontrol/TabControl.vue'

//导入子组件
import HomeSwiper from './childComps/HomeSwiper.vue'
import RecommendView from './childComps/RecommendView.vue'
import FeatureView from './childComps/FeatureView.vue'

//导入网络请求方法
import {getHomeMultiData} from '@/network/home'





export default {
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
  },
  name:'Home',
  data(){
    return{
      banners:[],
      recommends:[],
    }
  },
  created(){
    getHomeMultiData().then(res => {
      this.banners = res.data.banner.list;
      this.recommends = res.data.recommend.list
    })
  }
}
</script>

<style>
#home{
  height: 100vh;
  position: relative;
  padding-top: 44px;
}
.home-nav{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: var(--color-tint);
  color: #fff;
  z-index: 9;

}
</style>
