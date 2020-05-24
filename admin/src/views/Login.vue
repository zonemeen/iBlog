<template>
  <div class="page-login">
    <div>
      <el-card class="card-view" :body-style="{ padding: '0px' }">
        <div slot="header">
          <span>请先登录</span>
        </div>
        <!-- card body -->
        <el-form class="card-body" ref="form" label-width="80px">
          <el-form-item label="用户名">
            <el-input v-model="model.username"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input type="password" v-model="model.password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="login">登录</el-button>
            <!-- <el-button type="danger" @click="register">注册</el-button> -->
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      model: {}
    };
  },
  methods: {
    async login() {
      const res = await this.$http.post("/login", this.model);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("username", res.data.username);
      this.$message({
        type: "success",
        message: "登录成功"
      });
      this.$router.push("/");
    }
    // async register() {
    //   const res = await this.$http.post("/register", this.model);
    //   localStorage.setItem("token", res.data.token);
    //   localStorage.setItem("username", res.data.username);
    //   this.$message({
    //     type: "success",
    //     message: "注册成功"
    //   });
    //   this.$router.push("/login");
    // }
  }
};
</script>

<style lang="scss" scoped>
.page-login {
  .card-view {
    width: 30%;
    padding: 2rem;
    margin: 8% auto;
    .card-body {
      margin-top: 2rem;
    }
  }
}
</style>
