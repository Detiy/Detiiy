<template>
  <div>
    <el-container class="login_container">
      <el-header>
        <i class="el-icon-arrow-left" @click="back"></i>
        <h3>我的</h3>
        <i class="el-icon-arrow-right" @click="foward"></i>
      </el-header>
    </el-container>
    <el-card>
      <el-row>
        <el-col class="headBox">
          <i class="el-icon-s-check" style="font-size:1rem"></i>
          <div>
            <span>188****0672</span>
            <p>已开通伟哥会员</p>
          </div>
        </el-col>
        <el-col class="mainBox" :span="24">
          <el-row>
            <el-col>
              <span>
                <i class="el-icon-user-solid"></i>伟哥会员
              </span>
            </el-col>
            <el-col>
              <span>本月会员已用完</span>
              <span @click="PriceGoBuy">低价购买更多红包></span>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </el-card>
    <el-card class="myAsset">
      <el-row>
        <h4>我的资产</h4>
      </el-row>
      <el-row>
        <el-col :span="8">
          <span>
            <i class="el-icon-s-order"></i>红包
          </span>
          <p>0个未使用</p>
        </el-col>
        <el-col :span="8">
          <span>
            <i class="el-icon-s-order"></i>代金券
          </span>
          <p>15张未使用</p>
        </el-col>
        <el-col :span="8">
          <span>
            <i class="el-icon-s-order"></i>津贴
          </span>
          <p>50元可叠加满减</p>
        </el-col>
      </el-row>
    </el-card>
    <el-card class="myFunction">
      <el-row>
        <h4>我的功能</h4>
      </el-row>
      <el-row>
        <el-col :span="6">
          <span>
            <i class="el-icon-location"></i>
          </span>
          <p>我的地址</p>
        </el-col>
        <el-col :span="6">
          <span>
            <i class="el-icon-bicycle"></i>
          </span>
          <p>我的足迹</p>
        </el-col>
        <el-col :span="6">
          <span>
            <i class="el-icon-star-on" @click="look"></i>
          </span>
          <p @click="look">我的收藏</p>
        </el-col>
        <el-col :span="6">
          <span>
            <i class="el-icon-notebook-1"></i>
          </span>
          <p>评价记录</p>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <span>
            <i class="el-icon-notebook-2"></i>
          </span>
          <p>我的订单</p>
        </el-col>
        <el-col :span="6">
          <span>
            <i class="el-icon-place"></i>
          </span>
          <p>学生中心</p>
        </el-col>
      </el-row>
    </el-card>
    <el-card class="myAsset">
      <el-row>
        <h4>我的服务</h4>
      </el-row>
      <el-row>
        <el-col :span="6">
          <span>
            <i class="el-icon-question"></i>
          </span>
          <p>帮助反馈</p>
        </el-col>
        <el-col :span="6">
          <span>
            <i class="el-icon-service"></i>
          </span>
          <p>客服中心</p>
        </el-col>
        <el-col :span="6">
          <span>
            <i class="el-icon-delete-solid"></i>
          </span>
          <p>垃圾分类</p>
        </el-col>
      </el-row>
    </el-card>
    <el-dialog title="我的收藏" :visible.sync="lookDialogVisible" width="100%" close-on-press-escape>
      <span>
        <el-row>
          <el-col class="collectionList">
            <span>{{lists.title}}</span>
            <img :src="lists.img" />
          </el-col>
        </el-row>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="lookDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="lookDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      lookDialogVisible: false,
      lists: []
    };
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    foward() {
      this.$router.push("/home");
    },
    look() {
      const arr = this.lists;
      // arr.unshift(this.$store.state.DbSource);
      arr.push({
        title:this.$store.state.DbSource.title,
        img : this.$store.state.DbSource.img
      })
      // this.lists.title = this.$store.state.DbSource.title;
      // this.lists.img = this.$store.state.DbSource.img;
      this.$store.commit("readDbSource", arr);
      console.log(this.lists);

      this.lookDialogVisible = true;
    },
    PriceGoBuy() {
      this.$router.push("/member");
    }
  }
};
</script>
<style lang="less" scoped>
.headBox {
  background: #fffff0;
  display: flex;
  color: #333;
}
.mainBox {
  height: 2rem;
  width: 100%;
  background: #eed8ae;
  line-height: 1rem;

  .el-col:nth-child(2) {
    display: flex;
    justify-content: space-between;
  }
  .el-col:nth-child(2) > span:nth-child(2) {
    color: orangered;
  }
}
.myAsset {
  text-align: center;
  h4 {
    float: left;
  }
  i {
    color: orangered;
  }
}
.myFunction {
  text-align: center;
  h4 {
    float: left;
  }
  i {
    color: orangered;
  }
}
.collectionList {
  width: 100%;
  height: 2rem;
  font-size: 0.5rem;
  display: flex;
  align-items: center;
  img {
    width: 40%;
  }
  span {
    width: 50%;
  }
}
</style>