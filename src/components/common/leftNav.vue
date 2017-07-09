<template>
  <div class="left-nav">
    <ul>
      <li>
        <router-link to="/">
          <i class="icon iconfont icon-wodezichan"></i>
          <div>收银</div>
        </router-link>
      </li>
        <li>
          <router-link to="/dianPu">
            <i class="icon iconfont icon-dianpu"></i>
            <div>店铺</div>
          </router-link>
        </li>
      <li>
        <router-link to="/shangPing">
          <i class="icon iconfont icon-hanbao"></i>
          <div>商品</div>
        </router-link>
      </li>
      <li>
        <router-link to="/huiYuan">
          <i class="icon iconfont icon-huiyuanqia"></i>
          <div>会员</div>
        </router-link>
      </li>
      <li>
        <router-link to="/tongJi">
          <i class="icon iconfont icon-tongji"></i>
          <div>统计</div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
</script>

<style scoped>
.left-nav {
  color: #fff;
  background: #1D8ce0;
  font-size: 10px;
  height: 100%;
  width: 5%;
  float: left;
}
.left-nav ul {
  padding: 0px;
  margin: 0px;
}
.left-nav li {
  list-style: none;
  text-align: center;
  border-bottom: 1px solid #20a0ff;
  padding: 10px;
}
.left-nav li a {
  text-decoration: none;
  color: #fff;
}
.iconfont {
  font-size: 24px;
}
</style>
