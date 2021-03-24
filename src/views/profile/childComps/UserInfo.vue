<template>
  <div id="user-info">
    <a href="#" class="clear-fix">
      <slot name="user-icon">
        <svg class="icon avater left" aria-hidden="true">
          <use xlink:href="#icon-avater"></use>
        </svg>
      </slot>
      <div class="login-info left">
        <slot name="user-nickname">
          <div>登录/注册</div>
        </slot>
        <div class="phone">
          <span>
            <svg class="icon mobile" aria-hidden="true">
              <use xlink:href="#icon-phone"></use>
            </svg>
          </span>
          <slot name="user-phone">暂无绑定手机号</slot>
        </div>
      </div>
      <svg class="icon arrow-right right" aria-hidden="true">
        <use
          xlink:href="#icon-arrow-right"
        ></use>
      </svg>
    </a>
  </div>
</template>

<script>
export default {
  name: "UserInfo",
};
</script>

<style scoped>
#user-info{
  background-color: var(--color-tint);
  padding: 15px;
  margin-top: -5px;
}
#user-info .avater{
  width: 60px;
  height: 60px;
  background-color: #fff;
  border-radius: 50%;
}
.login-info{
  color: #fff;
  margin: 10px 0 0 10px;
}
.login-info .phone{
  font-size: 14px;
  margin-top: 6px;
}
.login-info .phone .mobile{
  font-size: 20px;
}
.arrow-right{
  position: relative;
  top: 20px;
  color: #fff;
  font-size: 20px;
}
</style>
