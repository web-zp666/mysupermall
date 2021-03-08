<template>
  <div id="detail">
    <detail-nav/>
    <scroll :probeType="3" :pullUpLoad="true" class="content" ref="scroll">
      <detail-swiper :topImages="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
      <detail-params-info :params-info="paramsInfo"/>
      <detail-comment-info :comment-info="commentInfo"/>
      <goods-list :goods="recommends"/>
    </scroll>
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

export default {
  name: 'Detail',
  components:{
    DetailNav,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamsInfo,
    DetailCommentInfo,
    GoodsList

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
      console.log(data)
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
    })
    getRecommend().then((res) => {
      this.recommends = res.data.list
    })
  },
  methods:{
    imageLoad(){
      this.$refs.scroll.refresh()

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
  height: calc(100% - 44px);
  overflow: hidden;
}
</style>
