<template>
  <div>
    <el-container class="login_container">
      <el-header>
        <i class="el-icon-arrow-left" @click="back"></i>
        <h3>订单</h3>
        <i class="el-icon-arrow-right" @click="foward"></i>
      </el-header>
    </el-container>
    <el-tabs type="border-card" stretch>
      <el-tab-pane label="全部订单">
        <el-card v-for="(item,index) in imgs" :key="index">
          <el-row>
            <el-col :span="4">
              <img :src="item.view" />
            </el-col>
            <el-col :span="14">
              <span>{{item.name}}</span>
              <p>备注:{{item.type}}</p>
            </el-col>
            <el-col :span="4">
              <span>￥{{item.number}}</span>
              <el-button type="warning" size="mini" @click="again(index)">再来一单</el-button>
            </el-col>
          </el-row>
        </el-card>
      </el-tab-pane>
      <el-tab-pane label="待评价">
        <el-card v-for="(item,index) in imgs" :key="index">
          <el-row>
            <el-col :span="4">
              <img :src="item.view" />
            </el-col>
            <el-col :span="14">
              <span>{{item.name}}</span>
              <p>备注:{{item.type}}</p>
            </el-col>
            <el-col :span="6">
              <span>￥{{item.number}}</span>
              <el-button type="primary" size="mini" @click="assess(index)">{{item.assessName}}</el-button>
            </el-col>
          </el-row>
        </el-card>
      </el-tab-pane>
      <el-tab-pane label="退款">暂无退款</el-tab-pane>
    </el-tabs>
    <el-dialog title="再来一单" :visible.sync="againDialogVisible" width="100%" close-on-press-escape>
      <span>
        <el-card>
          <el-row>
            <el-col :span="4">
              <img :src="againForm.view" />
            </el-col>
            <el-col :span="14">
              <span>{{againForm.name}}</span>
              <p>备注:{{againForm.type}}</p>
            </el-col>
            <el-col :span="6">
              <span>￥{{againForm.number}}</span>
            </el-col>
          </el-row>
        </el-card>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="againDialogVisible = false" size="mini">取 消</el-button>
        <el-button type="primary" @click="payYes" size="mini">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="付费"
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
    <el-dialog title="用户评价" :visible.sync="assessDialogVisible" width="100%" close-on-press-escape>
      <span>
        <el-input :autosize="{ minRows: 1, maxRows:8}" placeholder="请输入内容" v-model="text" clearable></el-input>
      </span>
      <span slot="footer">
        <el-button type="primary" @click="assessX">评价</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      assessName1: "已评价",
      text: "",
      imgs: [
        {
          name: "波霸奶茶",
          view: require("../assets/image/yidiandian.jpg"),
          type: "加冰淇淋 红豆 椰果",
          number: 19.9,
          assessName: "待评价"
        },
        {
          name: "肯德基全家桶",
          view: require("../assets/image/kendeji.jpg"),
          type: "多放点番茄酱",
          number: 119.9,
          assessName: "待评价"
        },
        {
          name: "香辣鸡腿堡",
          view: require("../assets/image/hualaishi.jpg"),
          type: "买一送一",
          number: 15.0,
          assessName: "待评价"
        },
        {
          name: "芝士年糕",
          view: require("../assets/image/xinshiqi.jpg"),
          type: "多配点芝士",
          number: 30.5,
          assessName: "待评价"
        }
      ],
      againDialogVisible: false,
      againForm: {
        name: "",
        view: "",
        type: "",
        number: ""
      },
      GoDialogVisible: false,
      Buyform: { password: "" },
      BuyFormRules: {
        password: [
          { required: true, message: "请输入正确的密码", trigger: "blur" },
          { min: 5, max: 12, message: "长度在5到12个字符之间", trigger: "blur" }
        ]
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
      assessDialogVisible: false
    };
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    foward() {
      this.$router.push("/home");
    },
    again(index) {
      this.againForm.name = this.imgs[index].name;
      this.againForm.view = this.imgs[index].view;
      this.againForm.type = this.imgs[index].type;
      this.againForm.number = this.imgs[index].number;
      this.againDialogVisible = true;
    },
    payYes() {
      this.againDialogVisible = false;
      this.GoDialogVisible = true;
    },
    GoIn() {
      this.$message({
        message: "取消下单",
        type: "info"
      }),
        (this.GoDialogVisible = false);
    },
    GoUp() {
      this.$refs.BuyFormRef.validate(valid => {
        if (!valid) return;
        this.$message({
          message: "下单成功",
          type: "warning"
        }),
          (this.GoDialogVisible = false);
      });
    },
    BuyDialogClosed() {
      this.$refs.BuyFormRef.resetFields();
    },
    assess(index) {
      this.assessDialogVisible = true;
      this.imgs[index].assessName = this.assessName1;
    },
    assessX(index) {
      this.$message({
        message: "评价成功",
        type: "warning"
      }),
        (this.assessDialogVisible = false);
    }
  }
};
</script>
<style lang="less" scoped>
img {
  height: 100%;
  width: 100%;
}
.el-col {
  span,
  p {
    padding-left: 0.5rem;
  }
}
</style>