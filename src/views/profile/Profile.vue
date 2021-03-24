<template>
  <div id="profile">
    <!-- 导航区块 -->
    <nav-bar class="nav-bar">
      <div slot="nav-c">渣女商城</div>
    </nav-bar>
    <!-- 用户头像，登录注册 -->
    <user-info></user-info>
    <!-- 余额区块 -->
    <section class="account">
      <div class="account-item">
        <div class="number">
          <span>0.00</span>元
        </div>
        <div class="account-info">我的余额</div>
      </div>
      <div class="account-item">
        <div class="number">
          <span>0</span>个
        </div>
        <div class="account-info">我的优惠</div>
      </div>
      <div class="account-item">
        <div class="number">
          <span>0</span>分
        </div>
        <div class="account-info">我的积分</div>
      </div>
    </section>
    <list-view class="order-list" :dataList="orderList"/>
    <list-view class="service-list" :dataList="serviceList"/>
  </div>
</template>

<script>
import NavBar from '@/components/common/navbar/NavBar.vue'
import UserInfo from './childComps/UserInfo.vue'
import ListView from './childComps/ListView.vue'
export default {
  components: { NavBar,UserInfo, ListView, },
  name:'Profile',
  data(){
    return{
      orderList:[
        {icon:'#icon-message',info:'我的消息'},
        {icon:'#icon-shop',info:'积分商城'},
        {icon:'#icon-vip',info:'会员卡'}
      ],
      serviceList:[
        {icon:'#icon-shopCart',info:'我的购物车'},
        {icon:'#icon-download',info:'下载购物APP'},
      ]
    }
  }

}
</script>

<style scoped>
/* #profile{
  background-color: #f2f2f2;
} */
.nav-bar{
  background-color: var(--color-tint);
  color: #fff;
  font-weight: 700;
}
.account{
  background-color: #fff;
  display: flex;
  text-align: center;
  border-bottom: 10px solid #f2f2f2;
}
.account .account-item{
  flex: 1;
  color: #333;
  padding: 18px;
  font-size: 13px;
  border-right: 1px solid #eee;
}
.account-item:last-of-type{
  border-right: none;
}
.account .account-item .number span{
  font-size: 25px;
  color: #ff5f3e;
  font-weight: 700;
}
.account .account-item .account-info{
  margin-top: 6px;
}
.order-list{
  border-bottom: 10px solid #f2f2f2;
}
</style>
