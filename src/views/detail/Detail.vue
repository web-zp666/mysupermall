<template>
  <div id="detail">
    <detail-nav @titleClick="titleClick" ref="nav"/>
    <scroll :probeType="3" :pullUpLoad="true"
    class="content" ref="scroll" @scroll="contentScroll">
      <detail-swiper :topImages="topImages" ref="swiper"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
      <detail-params-info ref="params" :params-info="paramsInfo"/>
      <detail-comment-info ref="comments" :comment-info="commentInfo"/>
      <goods-list ref="recommends" :goods="recommends"/>
    </scroll>
    <detail-bottom-bar @addCart="addCart"/>
    <back-top @click.native="btClick" v-show="isShowBackTop"/>
    <!-- <toast :message="message" :isShow="isShow"/> -->
  </div>
</template>

<script>
import DetailNav from './childComps/DetailNav.vue';
import {getDetail,Goods,Shop,GoodsParams,getRecommend} from '@/network/detail.js'
import DetailSwiper from './childComps/DetailSwiper.vue';
import DetailBaseInfo from './childComps/DetailBaseInfo.vue';
import DetailShopInfo from './childComps/DetailShopInfo.vue';
import Scroll from '@/components/common/scroll/Scroll.vue';
import DetailGoodsInfo from './childComps/DetailGoodsInfo.vue';
import DetailParamsInfo from './childComps/DetailParamsInfo.vue';
import DetailCommentInfo from './childComps/DetailCommentInfo.vue';
import GoodsList from '@/components/content/goods/GoodsList.vue';
import {debounce} from '@/common/utility'
import DetailBottomBar from './childComps/DetailBottomBar.vue';
import BackTop from '@/components/content/backTop/BackTop.vue';
import {mapActions} from 'vuex'
import Toast from '@/components/common/toast/Toast.vue';


export default {
  name: 'Detail',
  components:{
    DetailNav,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamsInfo,
    DetailCommentInfo,
    DetailBottomBar,
    Scroll,
    GoodsList,
    BackTop,
    Toast,
  },
  data() {
    return {
      iid:'',
      topImages:[],
      goods:{},
      shop:{},
      detailInfo:{},
      paramsInfo:{},
      commentInfo:{},
      recommends:[],
      themeTopY:null,
      getThemeTopY:null,
      currentIndex:0,
      isShowBackTop:false,
    };
  },
  created(){
    //1.保存商品的数据
    this.iid = this.$route.query.iid
    //console.log(this.$route.query.iid)
    //2.请求数据，独立封装一个detail.js用于网络请求
    getDetail(this.iid).then((res) => {
      //1.获取详情页数据
      const data = res.result
      //console.log(data)
      //2.保存轮播图的数据
      this.topImages = data.itemInfo.topImages
      //3.保存商品的基本信息
      this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)
      //4.保存店铺的基本信息
      this.shop = new Shop(data.shopInfo)
      //5.保存商品的大图
      this.detailInfo = data.detailInfo
      //6.保存参数相关信息
      this.paramsInfo = new GoodsParams(data.itemParams.info,data.itemParams.rule)
      //7.保存评论信息,有些没有评论列表，则不存在list，那么就没有必要保留该商品的评论信息了
      if (data.rate.list){
        this.commentInfo = data.rate.list[0];
      }
      //根据最新的数据，对应的dom是已经被渲染出来了
      //但是图片依然是没有加载完的（目前获取的offset是不包含图片的）
      //offset值不对的时候，一般都是因为图片的原因
      /* this.$nextTick(() => {
        this.themeTopY = [];
        this.themeTopY.push(0);
        this.themeTopY.push(this.$refs.params.$el.offsetTop - 44);
        this.themeTopY.push(this.$refs.comments.$el.offsetTop - 44);
        this.themeTopY.push(this.$refs.recommends.$el.offsetTop - 44);
        console.log(this.themeTopY)
      }) */

      //使用防抖函数处理图片不能完全刷新才算top值的问题
      this.getThemeTopY = debounce(() => {
        this.themeTopY = [];
        this.themeTopY.push(this.$refs.swiper.$el.offsetTop - 44);
        this.themeTopY.push(this.$refs.params.$el.offsetTop - 44);
        this.themeTopY.push(this.$refs.comments.$el.offsetTop - 44);
        this.themeTopY.push(this.$refs.recommends.$el.offsetTop - 44);
        this.themeTopY.push(Number.MAX_VALUE)
        //console.log(this.themeTopY)
      },100)
    })
    getRecommend().then((res) => {
      this.recommends = res.data.list
    })
  },
  methods:{
    ...mapActions(['addToCart']),
    addCart(){
      //1.创建对象
      const product = {};
      //2.添加对象需要到的属性
      product.iid = this.iid;
      product.price = this.goods.newPrice;
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.imgUrl = this.topImages[0]
      //3.添加到Store中
      /* this.$store.dispatch('addToCart',product).then((res) => {
        console.log(res);
      }) */
      this.addToCart(product).then((res) => {
        //下面这种方法太麻烦了
        /* this.isShow = true
        this.message = res
        setTimeout(() => {
          this.isShow = false
          this.message = ''
        },2000) */
        this.$toast.show(res);
      })

    },
    btClick(){
      this.$refs.scroll.scrollTo(0,0)
    },
    imageLoad(){
      this.$refs.scroll.refresh()
      this.getThemeTopY()
    },
    //
    titleClick(index){
      //console.log(index)
      //设置点击标题跳转至指定位置
      this.$refs.scroll.scrollTo(0,-this.themeTopY[index],300)
    },
    contentScroll(position){
      //1.获取Y值
      const y = -position.y
      //判断是否显示backTop按钮
      this.isShowBackTop = y > 1000;
      let length = this.themeTopY.length;
      //普通做法
      /* for (let i = 0; i < length; i++) {
        if (this.currentIndex !== i &&((i < length - 1 && y >= this.themeTopY[i] && y < this.themeTopY[i+1]) || (i === length-1 && y>=this.themeTopY[i]))){
          this.currentIndex = i;
          console.log(i)
          this.$refs.nav.currentIndex = this.currentIndex
        }
      } */
      //hack做法
      for (let i = 0; i < length - 1; i++) {
        if (this.currentIndex !== i && (y >= this.themeTopY[i] && y < this.themeTopY[i+1])){
          this.currentIndex = i;
          this.$refs.nav.currentIndex = this.currentIndex;
        }
      }
    }
  }
};
</script>

<style scoped>
#detail{
  /* tabbar挡住是因为它脱离了文本流，覆盖在detail的上方，所以我们需要搞层级 */
  position: relative;
  z-index: 9;
  background-color: #fff;
  /* 为了使用BScroll，需要设置一个高度 */
  height: 100vh;
}
.content{
  height: calc(100% - 44px - 49px);
  overflow: hidden;
}
</style>
