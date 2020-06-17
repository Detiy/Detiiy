<template>
  <el-container>
    <el-main>
      <router-view></router-view>
    </el-main>
    <el-footer>
      <el-menu
        :default-active="this.$router.path"
        class="el-menu-demo"
        mode="horizontal"
        background-color="#fff"
        text-color="#333"
        active-text-color="#ffd04b"
        router
      >
        <el-menu-item :index="item2.nav" v-for="(item2,id) in menulist" :key="id">{{item2.name}}</el-menu-item>
      </el-menu>
    </el-footer>
  </el-container>
</template>
<script>
export default {
  data() {
    return {
      menulist: [
        {
          id: 1,
          name: "主页",
          nav: "/home"
        },
        {
          id: 2,
          name: "会员",
          nav: "/member"
        },
        {
          id: 3,
          name: "订单",
          nav: "/order"
        },
        {
          id: 4,
          name: "我的",
          nav: "/ours"
        }
      ]
    };
  },
  methods: {
    back() {
      this.$router.go(-1);
    }
  }
};
</script>
<style lang="less" scoped>
.el-menu {
  position: fixed;
  height: 1rem;
  width: 100%;
  bottom: 0;
  z-index: 999;
}

.el-menu-item {
  width: 25%;
  text-align: center;
  line-height: 1rem;
  font-size: 0.2rem;
}
.el-footer {
  width: 100%;
  padding:0 !important;
}
</style>