<template>
  <div>
    <el-container class="login_container">
      <el-header>
        <i class="el-icon-arrow-left" @click="back"></i>
        <h3>伟哥外卖</h3>
        <span>游客</span>
      </el-header>
    </el-container>
    <el-form
      :model="registerForm"
      status-icon
      :rules="registerRules"
      ref="registerFormRef"
      label-width="70px"
      class="demo-ruleForm"
    >
      <img src="../assets/image/register.jpg" />
      <el-form-item label="用户名" prop="username">
        <el-input type="username" v-model="registerForm.username"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="mobile">
        <el-input type="mobile" v-model="registerForm.mobile"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="registerForm.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm()">注册</el-button>
        <el-button @click="resetForm()">重置</el-button>
      </el-form-item>
    </el-form>
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
    return {
      registerForm: {
        username: "",
        mobile: "",
        password: ""
      },
      registerRules: {
        username: [
          { required: true, message: "请输入正确的用户名", triggle: "blur" },
          { min: 3, max: 6, message: "长度在3到6个字符之间", trigger: "blur" }
        ],
        mobile: [
          { required: true, message: "请输入正确的手机号", triggle: "blur" },
          { validator: checkMobile, trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 5, max: 12, message: "长度在5到12个字符之间", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    submitForm() {
      this.$refs.registerFormRef.validate(async valid => {
        if (!valid) return;
        const { data: res } = await this.$http.post(
          "register",
          this.registerForm
        );
        if (res.status !== 200) return this.$message.error("注册失败");
        console.log(res)
        this.$message.success("注册成功");
        this.$router.push("/login");
        // console.log(res);
      });
    },
    resetForm(registerForm) {
      this.$refs.registerFormRef.resetFields();
    }
  }
};
</script>
<style lang="less" scoped>
.login_container {
  background-color: rgb(230, 230, 67);
  height: 100%;
}
.el-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
i {
  font-size: 0.5rem;
}
.el-form {
  height: 100%;
  width: 100%;
  position: relative;
}
.el-form-item{
  padding-top:2em;
}
.el-button {
  margin: 0.5rem 0.5rem;
}
.el-input{
 width:90%;
}
img {
  height: 6rem;
  width: 100%;
}
</style>