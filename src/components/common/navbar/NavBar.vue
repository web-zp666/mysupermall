<template>
  <div class="nav-bar">
    <div class="nav-l"><slot name="nav-l"></slot></div>
    <div class="nav-c"><slot name="nav-c"></slot></div>
    <div class="nav-r"><slot name="nav-r"></slot></div>
  </div>
</template>

<script>
export default {
 name:'NavBar'
}
</script>

<style>
.nav-bar{
  display: flex;
  height: 44px;
  line-height: 44px;
  text-align: center;
  box-shadow: 0 1px 1px rgba(100, 100, 100, 0.2);
}
.nav-l,.nav-r{
  width: 60px;
}
.nav-c{
  flex: 1;
}
</style>
