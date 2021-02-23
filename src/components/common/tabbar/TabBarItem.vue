<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isActive"><slot name="img"></slot></div>
    <div v-else><slot name="img-active"></slot></div>
    <div :style="activeStyle"><slot name="text"></slot></div>
  </div>
</template>

<script>
export default {
  name:'TabBarItem',
  props:{
    path:String,
    activeColor:{
      type:String,
      default:'red'
    }
  },
  data(){
    return{
      //isActive:false
    }
  },
  methods:{
    itemClick(){
      this.$router.replace(this.path).catch(err => err)
    }
  },
  computed:{
    isActive(){
      return this.$route.path.indexOf(this.path) !== -1
    },
    activeStyle(){
      return this.isActive ? {color:this.activeColor} : {}
    }
  }
}
</script>

<style>
.tab-bar-item{
  flex: 1;
  height: 49px;
  text-align: center;
  font-size: 14px;

}
.tab-bar-item img{
  width: 24px;
  height: 24px;
  margin-top: 3px;
  margin-bottom: 2px;
  vertical-align: middle;
  
}
</style>