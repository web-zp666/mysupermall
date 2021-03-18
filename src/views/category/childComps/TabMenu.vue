<template>
  <scroll id="tab-menu" :probeType="3" :pullUpLoad="true">
    <div class="menu-list">
      <div class="menu-list-item"
      v-for="(item,index) in categories" :key="index"
      @click.prevent="itemClick(index)"
      :class="{'active-style':index === currentIndex}"
      >{{item.title}}</div>
    </div>
  </scroll>
</template>

<script>
import Scroll from '@/components/common/scroll/Scroll.vue';
export default {
  components: { Scroll },
  name: 'TabMenu',
  data(){
    return{
      currentIndex:0
    }
  },
  props:{
    categories:{
      type:Array,
      default:[]
    }
  },
  methods:{
    itemClick(index){
      this.currentIndex = index
      this.$emit('selectItem',index)
    }
  }
};
</script>

<style scoped>
#tab-menu{
  height: calc(100% - 44px - 49px);
  overflow: hidden;
  background-color: #f6f6f6;
  width: 20vw;
  margin-top: 1px;
}
.menu-list-item{
  height: 45px;
  line-height: 45px;
  text-align: center;
  font-size: 14px;
}
.active-style{
  background-color: #fff;
  font-weight: 700;
  color: var(--color-high-text);
  border-left: 3px solid var(--color-high-text);

}
</style>
