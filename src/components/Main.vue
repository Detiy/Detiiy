<template>
  <div>
    <el-container>
      <el-main>
        <div>
          <el-container class="login_container">
            <el-header>
              <i class="el-icon-arrow-left" @click="back"></i>
              <h3>伟哥外卖</h3>
              <span>游客</span>
            </el-header>
          </el-container>
          <el-row>
            <el-col :span="6" v-for="(item1,id) in foods" :key="id">
              <div class="foods">{{item1.name}}</div>
            </el-col>
          </el-row>
          <div class="take_out">
            <el-form>
              <el-form-item class="inputText">
                <el-input
                  type="text"
                  placeholder="请输入内容"
                  prefix-icon="el-icon-search"
                  v-model="input"
                ></el-input>
              </el-form-item>
            </el-form>
            <el-carousel height="5rem">
              <el-carousel-item v-for="item in imgs" :key="item.id">
                <img style="width:100%" :src="item.view" />
              </el-carousel-item>
            </el-carousel>
          </div>
          <div class="sort">
            <el-row>
              <el-col :span="8" v-for="(o,index) in storesFilter" :key="index">
                <el-card>
                  <img :src="o.view" @click="chooseStore(index)" />
                  <div class="fonts" @click="chooseStore(index)" >{{o.title}}</div>
                </el-card>
              </el-col>
            </el-row>
          </div>
          <el-card>
            <el-row>
              <h2>附近美食</h2>
              <hr />
            </el-row>
            <el-row class="delicacy_cols" v-for="(item4,index) in foodsFilter" :key="index">
              <el-col :span="9">
                <img :src="item4.view" />
              </el-col>
              <el-col :span="10">
                <h3>{{item4.title}}</h3>
                <p>
                  <i class="el-icon-star-on">{{item4.number}}</i>
                  <span>月售{{item4.count}}</span>
                </p>
                <div class="info">
                  <div>
                    <span>起送</span>
                    <span>￥{{item4.Fprice}}</span>
                  </div>
                  <div>
                    <span>配送</span>
                    <span>￥{{item4.Pprice}}</span>
                  </div>
                  <div>
                    <span>人均</span>
                    <span>￥{{item4.eval}}</span>
                  </div>
                </div>
              </el-col>
              <el-col :span="3">
                <el-button size="mini" type="danger" :plain="true" @click="add(index)">
                  <i class="el-icon-shopping-cart-2"></i>
                </el-button>
              </el-col>
            </el-row>
          </el-card>
        </div>
      </el-main>
      <el-footer>
        <el-menu
          :default-active="this.$router.path"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
          background-color="#fff"
          text-color="#333"
          active-text-color="#ffd04b"
          router
        >
          <el-menu-item :index="item2.nav" v-for="(item2,id) in menulist" :key="id">{{item2.name}}</el-menu-item>
        </el-menu>
      </el-footer>
    </el-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      input: "",
      imgs: [
        { view: require("../assets/image/img1.jpg") },
        { view: require("../assets/image/img2.jpg") },
        { view: require("../assets/image/img3.jpg") },
        { view: require("../assets/image/img4.jpg") }
      ],
      foods: [
        { id: 0, name: "快餐外卖" },
        { id: 1, name: "大食堂" },
        { id: 2, name: "炸鸡" },
        { id: 3, name: "炸酱面" },
        { id: 4, name: "沙县小吃" },
        { id: 5, name: "伟哥网红饭" },
        { id: 6, name: "火锅" },
        { id: 7, name: "夜宵" }
      ],
      stores: [
        { view: require("../assets/image/timg1.jpg"), title: "夜宵" },
        { view: require("../assets/image/timg2.jpg"), title: "炸酱面" },
        { view: require("../assets/image/timg3.jpg"), title: "好吃的汉堡" },
        { view: require("../assets/image/timg4.jpg"), title: "情侣套餐" },
        { view: require("../assets/image/timg5.jpg"), title: "北京烤鸭" },
        { view: require("../assets/image/timg6.jpg"), title: "儿童食品" },
        { view: require("../assets/image/timg7.jpg"), title: "满汉全席" },
        { view: require("../assets/image/timg8.jpg"), title: "我饿了" },
        { view: require("../assets/image/timg9.jpg"), title: "水果" }
      ],
      delicacy: [
        {
          view: require("../assets/image/yidiandian.jpg"),
          title: "一点点奶茶",
          number: 4.5,
          count: 770,
          Fprice: 15,
          Pprice: 3,
          eval: 20
        },
        {
          view: require("../assets/image/kendeji.jpg"),
          title: "肯德基宅急送",
          number: 4.3,
          count: 502,
          Fprice: 30,
          Pprice: 9,
          eval: 55
        },
        {
          view: require("../assets/image/xinshiqi.jpg"),
          title: "新时器烤肉",
          number: 4.6,
          count: 850,
          Fprice: 60,
          Pprice: 5,
          eval: 80
        },
        {
          view: require("../assets/image/hualaishi.jpg"),
          title: "华莱士",
          number: 4.5,
          count: 800,
          Fprice: 20,
          Pprice: 2.5,
          eval: 25
        },
        {
          view: require("../assets/image/haidilao.jpg"),
          title: "海底捞",
          number: 4.7,
          count: 900,
          Fprice: 80,
          Pprice: 6,
          eval: 100
        }
      ],
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
      ],
      addDialogVisible: false,
      Collection: [],
      list: []
    };
  },
  computed: {
    foodsFilter() {
      let { delicacy, input, stores } = this;
      let arr = [...delicacy];
      if (input.trim()) {
        arr = delicacy.filter(item4 => item4.title.indexOf(input) !== -1);
      }
      return arr;
    },
    storesFilter() {
      let { input, stores } = this;
      let arr1 = [...stores];
      if (input.trim()) {
        arr1 = stores.filter(o => o.title.indexOf(input) !== -1);
      }
      return arr1;
    }
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    handleSelect(index) {
      console.log(index);
    },
    add(index) {
      this.Collection.unshift(this.delicacy[index]);
      console.log(this.Collection);
      this.$message({ message: "收藏成功", type: "success" });
      this.$store.commit("saveDbSource", this.Collection);
      // localStorage.setItem("token", JSON.stringify(this.Collection));
    },
    chooseStore(index) {
      switch (index) {
        case 0:
          this.$router.push("/yexiao");
          break;
          case 1:
          this.$router.push("/zhajiangmian");
          break;
          case 2:
          this.$router.push("/hanbao");
          break;
          case 3:
          this.$router.push("/qinglvtaocan");
          break;
          case 4:
          this.$router.push("/beijingkaoya");
          break;
          case 5:
          this.$router.push("/ertongshiping");
          break;
          case 6:
          this.$router.push("/manhanquanxi");
          break;
          case 7:
          this.$router.push("/woel");
          break;
          case 8:
          this.$router.push("/shuiguo");
          break;
      }
    }
  }
};
</script>
<style lang="less" scoped>
.el-col {
  padding-left: 0px !important;
  padding-right: 0px !important;
}
.el-main {
  padding: 0px !important;
}
.foods {
  background: red;
  border-radius: 4px;
  text-align: center;
  margin-top: 0.2rem;
}
.take_out {
  height: 100%;
  width: 100%;
  border-radius: 15px 15px 0 0;
}
.el-carousel__item {
  opacity: 0.75;
}

.inputText {
  width: 90%;
  margin: 0.2rem auto;
}
.el-card {
  img {
    height: 1.5rem;
    width: 2rem;
  }
}
.sort {
  .fonts {
    text-align: center;
    margin-top: 0.5rem;
  }
}
.delicacy_cols {
  margin-top: 10px;
  background: #fffff0;
  font-size: 0.3rem;
  .el-col {
    padding-top: 20px;
  }
  h3 {
    margin: 0;
  }
  img {
    width: 2.5rem;
  }
  p i {
    font-size: 0.3rem;
  }
  p span {
    margin-left: 1rem;
  }
  .info {
    display: flex;
    justify-content: space-between;
  }
  .el-button {
    margin-top: 1.5rem;
  }
}
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
  height: 0px !important;
}
</style>