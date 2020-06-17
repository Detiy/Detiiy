<template>
  <div>
    <el-container class="login_container">
      <el-header>
        <i class="el-icon-arrow-left" @click="back"></i>
        <h3>伟哥会员</h3>
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
        <el-col class="mainBox">
          <div>
            <p style="font-size:0.4rem">
              可用红包{{number}}张
              <i class="el-icon-arrow-right" style="font-size:0.1rem"></i>
            </p>
            <p>{{time | formatDate}}到期</p>
          </div>
          <div>
            <p style="font-size:0.4rem">
              待发放红包{{number}}张
              <i class="el-icon-arrow-right" style="font-size:0.1rem"></i>
            </p>
            <p>{{info}}</p>
          </div>
        </el-col>
      </el-row>
      <el-row class="memberMoney">
        <el-col>
          <h1>伟哥会员·尊享版</h1>
          <span>最低￥4.38/月</span>
        </el-col>
        <el-col>
          <div class="use">
            <i class="el-icon-check">使用中</i>
          </div>
          <el-button type="warning" round size="small" @click="Go">续费</el-button>
        </el-col>
      </el-row>
    </el-card>
    <el-card>
      <el-row>
        <el-col>
          <h2>联合会员专区</h2>
        </el-col>
        <el-col>
          <el-row :gutter="24" class="prefectureContent">
            <el-col class="memberPrefecture" :span="14">
              <h3>
                伟哥豪华会员
                +伟哥spa美容院
              </h3>
            </el-col>
            <el-col :span="10" class="buyPrefecture">
              <span>￥52.00/月</span>
              <el-button type="warning" round size="small" @click="buy">购买联合会员</el-button>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </el-card>
    <el-card class="memberPrivilege">
      <el-row>
        <h1>豪华伟哥会员特权</h1>
      </el-row>
      <el-row>
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="低价购买伟哥会员红包" name="first" class="redBox">
            <el-card>
              <el-row>
                <el-col>
                  <el-row>尊享会员红包</el-row>
                  <el-row>5元×6张</el-row>
                  <el-row>无门槛</el-row>
                </el-col>
                <el-col>
                  <el-row>尊享会员红包</el-row>
                  <el-row>10元×6张</el-row>
                  <el-row>无门槛</el-row>
                </el-col>
                <el-col>
                  <el-row>尊享会员红包</el-row>
                  <el-row>15元×6张</el-row>
                  <el-row>无门槛</el-row>
                </el-col>
                <el-col>
                  <el-row>尊享会员红包</el-row>
                  <el-row>20元×6张</el-row>
                  <el-row>无门槛</el-row>
                </el-col>
              </el-row>
            </el-card>
          </el-tab-pane>
          <el-tab-pane label="额外减免外卖配送费" name="second">
            <h1>减减减，伟哥小电驴精神小伙在线配送</h1>
          </el-tab-pane>
        </el-tabs>
      </el-row>
    </el-card>
    <el-row class="more">
      <span>查看更多</span>
      <i class="el-icon-arrow-down"></i>
    </el-row>
    <el-dialog title="续费" :visible.sync="GoDialogVisible" width="100%" @close="BuyDialogClosed" close-on-press-escape>
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
    <el-dialog
      title="购买联合会员"
      :visible.sync="buyDialogVisible"
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
          <el-form-item label="用户名" prop="useName">
            <el-input v-model="Buyform.useName"></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="mobile">
            <el-input v-model="Buyform.mobile"></el-input>
          </el-form-item>
        </el-form>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="buyIn" :plain="true">取 消</el-button>
        <el-button type="primary" @click="buyUp" :plain="true">确 定</el-button>
      </span>
    </el-dialog>
    <!-- <el-dialog title="购买低价红包" :visible.sync="buyRedDialogVisible" width="100%">
      <span></span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="RedUp" :plain="true">确定支付</el-button>
      </span>
    </el-dialog>-->
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
      number: 0,
      number1: 4,
      time: Date(),
      info: "您暂未续费",
      info1: "您已成功续费",
      activeName: "first",
      GoDialogVisible: false,
      buyDialogVisible: false,
      buyRedDialogVisible: false,
      Buyform: {
        useName: "",
        mobile: "",
        password: ""
      },
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
      ],
      value: "",
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
      }
    };
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    foward() {
      this.$router.push("/home");
    },
    handleClick(tab, event) {},
    Go() {
      this.GoDialogVisible = true;
    },
    GoIn() {
      this.$message({
        message: "取消续费",
        type: "info"
      }),
        (this.GoDialogVisible = false);
    },
    GoUp() {
      this.$refs.BuyFormRef.validate(valid => {
        if (!valid) return;
        this.$message({
          message: "续费成功",
          type: "warning"
        }),
          (this.info = this.info1),
          (this.number = this.number1);
        this.GoDialogVisible = false;
      });
    },
    buy() {
      this.buyDialogVisible = true;
    },
    BuyDialogClosed() {
      this.$refs.BuyFormRef.resetFields();
    },
    buyIn() {
      this.$message({
        message: "您已取消购买",
        type: "info"
      }),
        (this.buyDialogVisible = false);
    },
    buyUp() {
      this.$refs.BuyFormRef.validate(valid => {
        if (!valid) return;
        this.$message({
          message: "您已购买成功",
          type: "warning"
        });
        this.buyDialogVisible = false;
      });
    }
  }
};
</script>
<style lang="less" scoped>
.headBox {
  background: #fffff0;
  display: flex;
  color: #333;
  p {
    font-size: 0.1rem;
  }
}
.mainBox {
  display: flex;
  margin-top: 0.2rem;
  div {
    width: 50%;
    border-radius: 10px;
    background: #fffff0;
  }
}
.memberMoney {
  .el-col {
    display: flex;
    justify-content: space-between;
    width: 100%;
    background: #ffe7ba;
    span {
      margin-top: 0.5rem;
      margin-right: 0.3rem;
    }
    .el-button {
      width: 2.5rem;
      text-align: center;
      margin-bottom: 0.2rem;
    }
  }
  .use {
    background: #ffd39b;
    height: 0.8rem;
    width: 1.5rem;
    margin-left: 0.5rem;
    text-align: center;
    line-height: 0.8rem;
    i {
      font-size: 0.3rem;
    }
  }
}
.prefectureContent {
  background: #eee9e9;
  h3 {
    margin-top: 0.5rem;
  }
  .buyPrefecture {
    text-align: center;
    span {
      color: red;
    }
    .el-button {
      font-size: 0.2rem;
    }
  }
}
.memberPrefecture {
  font-size: 0.3rem;
}
.memberPrivilege {
  .el-col {
    margin-top: 0.5rem;
    text-align: center;
  }
  span {
    font-size: 0.4rem;
    color: #f56c6c;
  }
}
.redBox {
  width: 200%;
  .el-col {
    height: 3rem;
    width: 2rem;
    background: #ff6347;
    margin-right: 0.3rem;
    .el-row {
      margin-top: 0.3rem;
      color: #fff;
    }
  }
}
.more {
  text-align: center;
  i {
    font-size: 0.1rem;
  }
}
</style>