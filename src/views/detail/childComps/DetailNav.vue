<template>
  <div>
    <nav-bar>
      <div class="back" @click="backClick" slot="nav-l">
        <img src="~assets/img/common/back.svg" alt="">
      </div>
      <div slot="nav-c" class="titles">
        <div class="titles-item"
        v-for="(item,index) in titles"
        :class="{active:currentIndex === index}"
        @click="titleClick(index)"
        >{{item}}</div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from '@/components/common/navbar/NavBar.vue';

export default {
  components: { NavBar },
  name: 'DetailNav',
  data() {
    return {
      titles:['商品','参数','评论','推荐'],
      currentIndex:0
    };
  },
  methods:{
    titleClick(index){
      this.currentIndex = index
    },
    backClick(){
      this.$router.back()
    }
  }
};
</script>

<style scoped>
.titles{
  display: flex;
  font-size: 13px;
}
.titles-item{
  flex: 1;
}
.active{
  color: var(--color-high-text);
}
.back{
  margin-top: 7px;
}
</style>
