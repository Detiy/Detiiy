<template>
  <div>
    <el-container class="login_container">
      <el-header>
        <i class="el-icon-arrow-left" @click="back"></i>
        <h3>伟哥外卖</h3>
        <span>游客</span>
      </el-header>
    </el-container>
    <el-container class="loginBox">
      <el-form
        :model="loginForm"
        status-icon
        :rules="rules"
        ref="loginFormRef"
        label-width="0px"
        class="loginForm"
      >
        <img src="../assets/image/backg.jpg" />
        <el-form-item prop="mobile">
          <el-input
            prefix-icon="el-icon-user"
            type="mobile"
            v-model="loginForm.mobile"
            placeholder="请输入手机号"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            prefix-icon="el-icon-goods"
            type="password"
            v-model="loginForm.password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item class="log_fs">
          <div class="forget">
            <i class="el-icon-question"></i>
            <span>忘记密码</span>
          </div>
          <div class="switch">
            <span>自动登录</span>
            <el-switch v-model="flag" active-color="#13ce66"></el-switch>
          </div>
        </el-form-item>
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="success" @click="register">注册</el-button>
        </el-form-item>
      </el-form>
    </el-container>
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
      loginForm: {
        mobile: "",
        password: ""
      },
      flag: false,
      rules: {
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
    login() {
      this.$refs.loginFormRef.validate(async valid => {
        if (!valid) return;
        const { data: res } = await this.$http.post("login", this.loginForm);
        // console.log(res)
        if (res.status !== 200) return this.$message.error("登录失败");
        this.$message.success("登录成功");
        this.$router.push("/home"); 
        this.$store.commit('handleUserMobile' ,this.mobile)
        // console.log(this.mobile);
      });
    },

    register() {
      this.$router.push("/register");
    }
  }
};
</script>

<style lang="less"  scoped>
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
.loginBox {
  height: 100%;
  width: 100%;
  // background: rgb(240, 240, 171);
  border-radius: 3px;
  position: relative;
  img {
    height: 8.5rem;
    width: 100%;
  }
}
.loginForm {
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  position: relative;
}
.el-form-item {
  padding: 5px;
}
.forget {
  float: left;
  margin-left: 1rem;
  i {
    font-size: 0.35rem;
  }
}
.switch {
  float: right;
  margin-right: 1rem;
}
.btns {
  display: flex;
  justify-content: space-between;
  .el-button {
    // height: 2.5rem;
    // width: 6rem;
    margin: 0 1rem;
  }
}
</style>