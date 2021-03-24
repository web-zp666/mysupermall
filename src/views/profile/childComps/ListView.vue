<template>
  <div id="list">
    <div v-for="(item, index) in dataList" :key="index" class="list-item">
      <span class="s-icon">
        <svg class="icon" aria-hidden="true">
          <use :xlink:href="item.icon"></use>
        </svg>
      </span>
      <div class="info">{{ item.info }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ListView",
  props: {
    dataList: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style scoped>
#list {
  /* padding: 15px; */
  color: #333;
}
#list .list-item{
  display: flex;
  height: 44px;
  line-height: 44px;
  position: relative;
  font-size: 15px;
}
#list .list-item .s-icon{
  width: 30px;
  margin-top: 4px;
  position: relative;
  left: 10px;
}
.s-icon svg{
  font-size: 24px;  
}
.list-item .info{
  flex: 1;
  margin-left: 20px;
  padding-left: 3px;
  border-bottom: 1px solid #eee;
}
.list-item:last-of-type .info{
  border-bottom: none;
}
</style>
