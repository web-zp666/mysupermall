<template>
  <div>
    <tab-bar>
      <tab-bar-item path="home">
        <img src="~assets/img/tabbar/home.svg" alt="" slot="img">
        <img src="~assets/img/tabbar/home_active.svg" alt="" slot="img-active">
        <p slot="text">首页</p>
      </tab-bar-item>
      <tab-bar-item path="category">
        <img src="~assets/img/tabbar/category.svg" alt="" slot="img">
        <img src="~assets/img/tabbar/category_active.svg" alt="" slot="img-active">
        <p slot="text">分类</p>
      </tab-bar-item>
      <tab-bar-item path="shopcart">
        <img src="~assets/img/tabbar/shopcart.svg" alt="" slot="img">
        <img src="~assets/img/tabbar/shopcart_active.svg" alt="" slot="img-active">
        <p slot="text">购物车</p>
      </tab-bar-item>
      <tab-bar-item path="profile">
        <img src="~assets/img/tabbar/profile.svg" alt="" slot="img">
        <img src="~assets/img/tabbar/profile_active.svg" alt="" slot="img-active">
        <p slot="text">我的</p>
      </tab-bar-item>
    </tab-bar>
  </div>
</template>

<script>
import TabBar from "../../common/tabbar/TabBar.vue";
import TabBarItem from "../../common/tabbar/TabBarItem.vue";
export default {
  components: { TabBar, TabBarItem },
  name: "MainTabBar",
};
</script>

<style scoped>
</style>
