<template>
  <div class="subcategory">
    <div class="sub-item"  v-for="(item,index) in subcategories" :key="index">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="subImageLoad">
        <p>{{item.title}}</p>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Subcategory',
  props:{
    subcategories:{
      type:Array,
      default(){
        return[]
      }
    }
  },
  methods:{
    subImageLoad(){
      this.$emit('subImageLoad')
    }
  }
};
</script>

<style scoped>
.subcategory{
  display: flex;
  flex-wrap: wrap;
  padding: 15px 8px;
  border-bottom: 3px solid #eee;
}
.sub-item{
  text-align: center;
  width: 25vw;
  padding: 1px;
  margin-bottom: 10px;
}
.sub-item img{
  width: 18vw;
  height: 18vw;
}
.sub-item p{
  font-size: 12px;
  margin-top: 10px;
}
</style>
