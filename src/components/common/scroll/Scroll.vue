<template>
  <!-- 使用BScroll必须外层一层包裹，而且被包括的内容外部技能有一个div -->
  <div class="wrapper" ref="wrapper">
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
//使用better-scroll需要导入，这里选择2.X版本，这样导入是包含全部插件的
import BScroll from "better-scroll";

export default {
  name: "Scroll",
  data() {
    return {
      //使用一个变量保存实例化之后的 new BScroll
      scroll: null,
    };
  },
  props: {
    probeType: {
      type: Number,
      default: 0,
    },
    pullUpLoad: {
      type: Boolean,
      default: false,
    },
  },
  created() {},
  mounted() {
    //1.创建BScroll对象
    this.scroll = new BScroll(this.$refs.wrapper, {
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad,
      click: true,
      observeDOM: true,
      mouseWheel: true,
    });
    //2.监听滚动的位置，需要外界传入值，自行决定是否监听，一味监听只会消耗性能
    this.scroll.on("scroll", (position) => {
      this.$emit("scroll", position);
    });
    //3.监听上拉加载更多，一样是由组件使用人决定是否进行该监听
    this.scroll.on("pullingUp", () => {
      this.$emit('pullingUp')
    });
  },
  methods: {
    //封装点击回到顶部，运用了封装思想，让代码的维护起来比较方便
    scrollTo(x, y, time = 1000) {
      this.scroll.scrollTo(x, y, time);
    },
    finishPullUp(){
      this.scroll.finishPullUp()
    }
  },
};
</script>

<style scoped>
</style>
