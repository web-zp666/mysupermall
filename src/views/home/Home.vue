<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="nav-c">购物街</div>
    </nav-bar>
    <scroll class="content" ref="scroll" :probe-type = '3' @scroll='contentScroll' :pull-up-load="true" @pullingUp="loadMore">
      <home-swiper :banners="banners" />
      <recommend-view :recommends="recommends" />
      <feature-view />
      <tab-control
        :titles="['流行', '新款', '精选']"
        class="tab-control"
        @tabClick="tabClick"
      />
      <goods-list :goods="showGoods" />
    </scroll>
    <back-top @click.native = 'btClick' v-show="isShowBackTop"/>
  </div>
</template>

<script>
//导入公共组件
import NavBar from "@/components/common/navbar/NavBar.vue";
import TabControl from "@/components/content/tabcontrol/TabControl.vue";
import GoodsList from "@/components/content/goods/GoodsList.vue";
import Scroll from "@/components/common/scroll/Scroll.vue";
import BackTop from '@/components/content/backTop/BackTop.vue';

//导入子组件
import HomeSwiper from "./childComps/HomeSwiper.vue";
import RecommendView from "./childComps/RecommendView.vue";
import FeatureView from "./childComps/FeatureView.vue";

//导入网络请求方法
import { getHomeMultiData, getHomeGoods } from "@/network/home";


export default {
  components: {
    NavBar,
    Scroll,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    BackTop,
  },
  name: "Home",
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop",
      isShowBackTop:false //决定是否显示返回顶部组件
    };
  },
  created() {
    //请求轮播图和推荐数据
    this.getHomeMultiData();

    //请求商品的数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },
  methods: {
    /**监听事件的相关方法 */
    /**通过点击tabcontrol来控制展示不同的内容 */
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
    },
    btClick(){
      this.$refs.scroll.scrollTo(0,0)
    },
    //通过position对象中的y值（负值）来决定isShowBackTop的布尔值
    contentScroll(position){
      this.isShowBackTop = (-position.y) > 1000
    },
    loadMore(){
      this.getHomeGoods(this.currentType)
      //因为BScroll插件在计算我们可滚动区域的时候是不包含图片高度的，因为加载图片是异步操作，所以请求来的时间可能是不固定的，这就导致插件已经计算好高度了，图片才刚好加载完的时候，到达计算好的高度的时候就不能往下滚动了，所以得通过refresh来刷新高度，减少bug。
      this.$refs.scroll.scroll.refresh()
    },

    /**网络请求的相关方法 */
    //把网络请求到的数据处理环节封装到methods中
    getHomeMultiData() {
      getHomeMultiData().then((res) => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;
        this.$refs.scroll.finishPullUp()
      });
    },
  },
};
</script>

<style scoped>
#home {
  height: 100vh; /**这里必须有高度 */
  position: relative;
}
.home-nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: var(--color-tint);
  color: #fff;
  z-index: 9;
}
.tab-control {
  position: sticky;
  top: 44px;
  z-index: 9;
}
.content{
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
  overflow: hidden; /* 这里需要使用，不使用的话，滑动的时候底下的图片会露出来 */
}
</style>
