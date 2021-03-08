<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="nav-c">购物街</div>
    </nav-bar>
    <tab-control :titles="['流行', '新款', '精选']" @tabClick="tabClick"
        ref="tabControl_1" class="tab-control" v-show="isTabFixed"
    />
    <scroll class="content" ref="scroll" :probe-type = '3' @scroll='contentScroll' :pull-up-load="true" @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImgLoad="swiperImgLoad"/>
      <recommend-view :recommends="recommends" />
      <feature-view />
      <tab-control
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
        ref="tabControl_2"
        :class="{fixed:isTabFixed}"

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
import {debounce} from '@/common/utility.js'


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
      isShowBackTop:false, //决定是否显示返回顶部组件
      tabOffsetTop: 0, //获取tabControl在什么位置可以吸顶
      isTabFixed:false,//动态添加吸顶效果的状态变量
      saveY: 0  //用于保留离开组件时原来的位置y
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
  mounted(){
    //监听事件总线不应该放在created里面，因为可能获取到的this.$refs.scroll为空值，所以把他放到这里
     /* this.$bus.$on('itemImgLoad',() => {
      this.$refs.scroll.refresh()
    }) */
    //图片加载完成时的事件监听
    const refresh = debounce(this.$refs.scroll.refresh,50)
    this.$bus.$on('homeImageLoad',() => {
      refresh()
    })

    //获取tabControl的offsetTop值
    /* console.log(this.$refs.tabControl.offsetTop) */ //undefind
    //offsetTop是元素的属性，组件没有这个属性，
    //但是所有的组件都有一个属性：$el，他会拿到这个组件的元素

    //console.log(this.$refs.tabControl.$el.offsetTop)
    //上面拿到值是57，明显是不对的，因为我们代码写在mounted中，当页面的组件都在挂载完毕时，
    //可能其中的图片资源并没有完全加载出来，此时的高度仅仅是图片没有撑开时的高度。所以我们需要监听图片
    //加载完毕时在获取offsetTop值，但是老师说只要监听到轮播图加载完成那么测出来的高度大概率是正确的
  },
  destroyed(){
    //我们发现当我们从首页切换到其他页面的时候，Home的状态没有被保存，是因为一旦离开了首页，那么首页的
    //组件就被销毁了
    console.log('home is destroyed')
  },
  activated(){
    //console.log('----')
    this.$refs.scroll.refresh()  //再刷新回回来的位置前一定呀refresh！！！！
    this.$refs.scroll.scrollTo(0,this.saveY,0)

  },
  deactivated(){
    this.saveY = this.$refs.scroll.getScrollY()
    //console.log(this.saveY)
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
      this.$refs.tabControl_1.currentIndex = index;
      this.$refs.tabControl_2.currentIndex = index;
    },
    btClick(){
      this.$refs.scroll.scrollTo(0,0)
    },
    //通过position对象中的y值（负值）来决定isShowBackTop的布尔值
    contentScroll(position){
      //1.动态决定backtop按钮是否显示
      this.isShowBackTop = (-position.y) > 1000
      //2.动态决定tabcontrol是否吸顶（position:fixed）
      this.isTabFixed = (-position.y) > this.tabOffsetTop
    },
    loadMore(){
      this.getHomeGoods(this.currentType)
      //因为BScroll插件在计算我们可滚动区域的时候是不包含图片高度的，因为加载图片是异步操作，所以请求来的时间可能是不固定的，这就导致插件已经计算好高度了，图片才刚好加载完的时候，到达计算好的高度的时候就不能往下滚动了，所以得通过refresh来刷新高度，减少bug。
      this.$refs.scroll.scroll.refresh()
    },
    swiperImgLoad(){
      //console.log(this.$refs.tabControl.$el.offsetTop)
      this.tabOffsetTop = this.$refs.tabControl_2.$el.offsetTop - this.$refs.tabControl_2.$el.clientHeight
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
        //默认只能加载一次数据，所以我们需要调用finishPullUp()方法
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
  /* 这个定位属性是之前没有做BScroll时用的原生滚动使得导航不会随着原生滚动而滚动，但是现在我们用了BScroll，而且包括阿区域没有导航栏所以没必要。 */
  /* position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9; */
  background-color: var(--color-tint);
  color: #fff;



}
.content{
 /*  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
  overflow: hidden; /* 这里需要使用，不使用的话，滑动的时候底下的图片会露出来 */
  height: calc(100% - 93px);
  overflow: hidden;
}
.tab-control{
  position: relative;
  z-index: 9;

}
.fixed{
  position: fixed;
  left: 0;
  right: 0;
  top: 44px;
}

</style>
