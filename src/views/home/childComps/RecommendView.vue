<template>
  <div class="recommend">
    <div class="recommend-item" v-for="item in recommends">
      <a :href="item.link">
        <img :src="item.image" alt="" />
        <p>{{ item.title }}</p>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "RecommendView",
  props: {
    recommends: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style>
.recommend{
  display: flex;
  text-align: center;
  padding: 10px 0 20px;
  font-size: 14px;
  border-bottom: 8px solid #eee;
  width: 100%;

}
.recommend-item{
  flex: 1;
}
.recommend-item img{
  width: 75px;
  height: 75px;
  margin-bottom: 10px;

}

</style>
