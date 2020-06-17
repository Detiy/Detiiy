<template>
  <div>
    <el-header class="login_container">
      <i class="el-icon-arrow-left" @click="back"></i>
      <h3>伟大大儿童食品</h3>
      <span @click="add">
        <i class="el-icon-shopping-cart-2"></i>
      </span>
    </el-header>
    <el-main>
      <el-row class="delicacy_cols" v-for="(item,index) in delicacy" :key="index">
        <el-col :span="9">
          <img :src="item.view" />
        </el-col>
        <el-col :span="10">
          <h3>{{item.title}}</h3>
          <p>
            <i class="el-icon-star-on">{{item.number}}</i>
            <span>月售{{item.count}}</span>
          </p>
          <div class="info">
            <div>
              <span>起送</span>
              <span>￥{{item.Fprice}}</span>
            </div>
            <div>
              <span>配送</span>
              <span>￥{{item.Pprice}}</span>
            </div>
            <div>
              <span>人均</span>
              <span>￥{{item.eval}}</span>
            </div>
          </div>
        </el-col>
        <el-col :span="3">
          <el-button size="mini" type="danger" :plain="true" @click="pay(index)">购买</el-button>
        </el-col>
      </el-row>
    </el-main>
    <el-dialog
      title="购买商品"
      :visible.sync="GoDialogVisible"
      width="100%"
      @close="BuyDialogClosed"
      close-on-press-escape
    >
      <span>
        <el-form
          ref="BuyFormRef"
          :model="Buyform"
          :rules="BuyFormRules"
          label-width="80px"
          size="mini"
        >
          <el-form-item label="支付方式">
            <el-select v-model="value" placeholder="请选择" clearable>
              <el-option
                v-for="item in pays"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                clear
              >
                <span style="float: left">{{ item.label }}</span>
                <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="Buyform.password" type="password"></el-input>
          </el-form-item>
        </el-form>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="GoIn" :plain="true">取 消</el-button>
        <el-button type="primary" @click="GoUp" :plain="true">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    var checkMobile = (rule, value, cb) => {
      var reg = /^[1][3,4,5,7,8][0-9]{9}$/;
      if (reg.test(value)) {
        return cb();
      }
      cb(new Error("请输入正确的手机号"));
    };
    var checkName = (rule, value, cb) => {
      let reg = /^[\u2E80-\u9FFF]+$/;
      if (reg.test(value)) {
        return cb();
      }
      cb(new Error("请输入正确的姓名"));
    };
    return {
      delicacy: [
        {
          view: require("../../assets/image/ETSP1.jpg"),
          title: "儿童食品1",
          number: 4.5,
          count: 1314,
          Fprice: 35,
          Pprice: 5.5,
          eval: 50
        },
        {
          view: require("../../assets/image/ETSP2.jpg"),
          title: "儿童食品2",
          number: 4.3,
          count: 1314,
          Fprice: 30,
          Pprice: 6,
          eval: 40
        },
        {
          view: require("../../assets/image/ETSP3.jpg"),
          title: "儿童食品3",
          number: 4.6,
          count: 1314,
          Fprice: 60,
          Pprice: 5,
          eval: 52
        },
        {
          view: require("../../assets/image/ETSP4.jpg"),
          title: "儿童食品4",
          number: 4.5,
          count: 1314,
          Fprice: 100,
          Pprice: 10,
          eval: 100
        },
        {
          view: require("../../assets/image/ETSP5.jpg"),
          title: "儿童食品5",
          number: 4.7,
          count: 1314,
          Fprice: 80,
          Pprice: 6,
          eval: 100
        }
      ],
      Collection: [],
      GoDialogVisible: false,
      buyDialogVisible: false,
      Buyform: {
        useName: "",
        mobile: "",
        password: ""
      },
      BuyFormRules: {
        useName: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          { min: 3, max: 5, message: "长度在3到5个字符", trigger: "blur" },
          { validator: checkName, trigger: "blur" }
        ],
        mobile: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { validator: checkMobile, trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入正确的密码", trigger: "blur" },
          { min: 5, max: 12, message: "长度在5到12个字符之间", trigger: "blur" }
        ]
      },
      value: "",
      pays: [
        {
          value: "zhifubao",
          label: "支付宝"
        },
        {
          value: "weixin",
          label: "微信"
        },
        {
          value: "huabei",
          label: "花呗"
        },
        {
          value: "yinhangka",
          label: "银行卡"
        }
      ]
    };
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    add() {
      this.$message({ message: "收藏成功", type: "success" });
      this.$store.commit("saveDbSource", this.Collection);
      // localStorage.setItem("token", JSON.stringify(this.Collection));
    },
    pay(index) {
      this.GoDialogVisible = true;
    },
    buy() {
      this.buyDialogVisible = true;
    },
    BuyDialogClosed() {
      this.$refs.BuyFormRef.resetFields();
    },
    GoIn() {
      this.$message({
        message: "取消购买",
        type: "info"
      }),
        (this.GoDialogVisible = false);
    },
    GoUp() {
      this.$refs.BuyFormRef.validate(valid => {
        if (!valid) return;
        this.$message({
          message: "购买成功",
          type: "warning"
        }),
          (this.info = this.info1),
          (this.number = this.number1);
        this.GoDialogVisible = false;
      });
    }
  }
};
</script>
<style lang="less" scoped>
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
</style>