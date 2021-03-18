<template>
  <div class="check-button"
  @click="selectItem"
  :class="{'selector-active':isChecked}">
    <img src="~assets/img/cart/tick.svg" alt="">
  </div>
</template>

<script>
export default {
  name: 'CheckButton',
  props:{
    isChecked:{
      type:Boolean,
      default:false
    }
  },
  methods:{
    selectItem(){
      this.$emit('selectItem')
    }
  }
};
</script>

<style scoped>
.check-button{
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 2px solid #ccc;
  cursor: pointer;
  position: relative;
  margin: 0;
}
.selector-active{
  background-color: #ff8198;
  border-color: #ff8198;
}
</style>
