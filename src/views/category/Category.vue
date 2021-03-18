<template>
  <div id="category">
    <nav-bar class="nav-bar">
      <div slot="nav-c">商品分类</div>
    </nav-bar>
    <div class="content">
      <tab-menu :categories="categories" @selectItem="selectItem"/>
      <scroll id="tab-content"
      :data="[categoryData]"
      :probeType="3" :pullUpLoad="true"
      ref="scroll">
        <subcategory :subcategories="showSubcategory"/>
        <tab-control class="tab-control" :titles="['综合','新品','销量']" @tabClick="tabClick"/>
        <category-recommend :recommend="showCategoryDetail"

        />
      </scroll>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/common/navbar/NavBar.vue';
import TabMenu from './childComps/TabMenu.vue';

import {getCategory,getSubCategory,getCategoryDetail,} from '@/network/category'
import Subcategory from './childComps/Subcategory.vue';
import Scroll from '@/components/common/scroll/Scroll.vue';
import TabControl from '@/components/content/tabcontrol/TabControl.vue';
import CategoryRecommend from './childComps/CategoryRecommend.vue';
import {debounce} from '@/common/utility.js'



export default {
  components: { NavBar, TabMenu, Subcategory, Scroll, TabControl, CategoryRecommend },

  name: "Category",
  data() {
    return {
      categories:[], //保存左侧一级菜单的数据
      categoryData:{}, ////保存右侧二级菜单的数据，包括类别和底下的更多商品
      currentIndex: -1,
      currentType:'pop',
    };
  },
  computed:{
    showSubcategory(){
      if(this.currentIndex === -1) return []
      return this.categoryData[this.currentIndex].subcategories.list
    },
    showCategoryDetail(){
      if(this.currentIndex === -1) return []
      return this.categoryData[this.currentIndex].categoryDetail[this.currentType]
    }
  },
  created(){
    //1.请求分类数据
    this._getCategory()
  },
  methods:{
    _getCategory(){
      getCategory().then((res) => {
        console.log(res)
        //1.保存每个分类的对应的数组数据
        this.categories = res.data.category.list
        //2.初始化每个类别中的子数据
        for(let i = 0;i < this.categories.length;i++) {
          this.categoryData[i] = {
            subcategories:{},
            categoryDetail:{
              'pop':[],
              'new':[],
              'sell':[]
            }
          }
        }
        //3.请求第一个分类的数据
        this._getSubcategories(0)
      })
    },
    _getSubcategories(index){
      this.currentIndex = index;
      const maitKey = this.categories[index].maitKey;
      getSubCategory(maitKey).then((res) => {
        console.log(res)
        this.categoryData[index].subcategories = res.data;
        this.categoryData = {...this.categoryData};
        this._getCategoryDetail('pop')
        this._getCategoryDetail('sell')
        this._getCategoryDetail('new')
      })
    },
    _getCategoryDetail(type){
      //1.获取请求的miniWallkey
      const miniWallkey = this.categories[this.currentIndex].miniWallkey;
      //2.发送请求，传入miniWallkey和type参数
      getCategoryDetail(miniWallkey,type).then(res => {
        console.log(res);
        this.categoryData[this.currentIndex].categoryDetail[type] = res;
        this.categoryData = {...this.categoryData}
      })
    },
    selectItem(index){
      //console.log(index)
      this._getSubcategories(index)
    },
    tabClick(index){
      switch (index) {
        case 0:
          this.currentType = 'pop'
          break;
        case 1:
          this.currentType = 'new'
          break;
        case 0:
          this.currentType = 'sell'
          break;
      }
    }
  },
  mounted(){
    const refresh = debounce(this.$refs.scroll.refresh,50);
    this.$bus.$on('categoryImageLoad',() => {
      refresh()
    })
  }


};
</script>

<style scoped>
#category{
  height: 100vh;
}
.nav-bar{
  background-color: var(--color-tint);
  color: #fff;
  font-weight: 700;
}
.content{
  height: 100%;
  display: flex;
}
#tab-content{
  height: calc(100% - 44px - 49px);
  overflow: hidden;
  flex: 1;
  margin-top: 1px;
}
.tab-control{
  margin-bottom: 10px;
}
</style>
