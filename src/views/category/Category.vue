<template>
  <div class="wrapper">
    <ul>
      <li>商品列表1</li>
      <li>商品列表2</li>
      <li>商品列表3</li>
      <li>商品列表4</li>
      <li>商品列表5</li>
      <li>商品列表6</li>
      <li>商品列表7</li>
      <li>商品列表8</li>
      <li>商品列表9</li>
      <li>商品列表10</li>
      <li>商品列表11</li>
      <li>商品列表12</li>
      <li>商品列表13</li>
      <li>商品列表14</li>
      <li>商品列表15</li>
      <li>商品列表16</li>
      <li>商品列表17</li>
      <li>商品列表18</li>
      <li>商品列表19</li>
      <li>商品列表20</li>
      <li>商品列表21</li>
      <li>商品列表22</li>
      <li>商品列表23</li>
      <li>商品列表24</li>
      <li>商品列表25</li>
      <li>商品列表26</li>
      <li>商品列表27</li>
      <li>商品列表28</li>
      <li>商品列表29</li>
      <li>商品列表30</li>
      <li>商品列表31</li>
      <li>商品列表32</li>
      <li>商品列表33</li>
      <li>商品列表34</li>
      <li>商品列表35</li>
      <li>商品列表36</li>
      <li>商品列表37</li>
      <li>商品列表38</li>
      <li>商品列表39</li>
      <li>商品列表40</li>
      <li>商品列表41</li>
      <li>商品列表42</li>
      <li>商品列表43</li>
      <li>商品列表44</li>
      <li>商品列表45</li>
      <li>商品列表46</li>
      <li>商品列表47</li>
      <li>商品列表48</li>
      <li>商品列表49</li>
      <li>商品列表50</li>
    </ul>
  </div>
</template>

<script>
import BScroll from "@better-scroll/core";
import Pullup from "@better-scroll/pull-up";

BScroll.use(Pullup);

export default {
  name: "Category",
  data() {
    return {
      scroll: null,
    };
  },
  mounted() {
    this.scroll = new BScroll(".wrapper", {
      probeType: 3,
      pullUpLoad: true,

    });
    // this.scroll.on("scroll", (position) => {
    //   console.log(position);
    // });
    this.scroll.on('pullingUp',() => {
      console.log('上拉加载更多')
    })
  },
  methods:{
    // btnClick(){
    //   console.log('---------')
    // }
  }
};
</script>

<style>
.wrapper {
  height: 150px;
  background-color: red;
  overflow: hidden;
}
</style>
