<template>
  <div>
    <m-top-handle title="昵称" content="新建用户">
      <el-button class="fr" slot="email" type="primary" @click="sendEmail"
        >推送邮件</el-button
      >
    </m-top-handle>
    <el-table
      :data="tableData"
      border
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="index" label="序号" width="50"></el-table-column>
      <el-table-column prop="_id" label="id"></el-table-column>
      <el-table-column prop="avatarImg" label="头像">
        <template slot-scope="scope">
          <img :src="scope.row.avatarImg" alt height="50" />
        </template>
      </el-table-column>
      <el-table-column prop="nickName" label="昵称"></el-table-column>
      <el-table-column prop="email" label="邮箱"></el-table-column>
      <el-table-column prop="url" label="博客/github网址"></el-table-column>
      <el-table-column label="操作" width="90">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click="$router.push(`/users/editor/${scope.row._id}`)"
            >编辑</el-button
          >
          <el-button type="text" size="small" @click="deleteHandle(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
      <el-table-column type="selection" width="55"></el-table-column>
    </el-table>
    <el-dialog
      title="上传文件"
      :visible.sync="dialogVisible"
      width="320px"
      center
    >
      <el-form :model="form" :rules="formRules" ref="form">
        <el-form-item props="sendContent" label="发送内容">
          <el-input v-model="form.sendContent"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="sendhandle">提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: [],
      title: "",
      multipleSelection: [],
      emailArr: [],
      form: {
        sendContent: "",
      },
      formRules: {},
      dialogVisible: false,
    };
  },
  created() {
    this.getList();
  },
  methods: {
    async getList() {
      let res = await this.$http.get("/rest/users");
      this.tableData = res.data;
    },
    deleteHandle(data) {
      this.$confirm(`是否确定要删除留言: ${data.content} ?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          await this.$http.delete(`/rest/users/${data._id}`);
          this.getList();
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    handleSelectionChange(val) {
      console.log(val);
      this.multipleSelection = val.map((v) => {
        return { email: v.email, subject: v.nickName };
      });
      console.log(this.multipleSelection);
    },
    async sendEmail() {
      if (this.multipleSelection.length == 0) {
        return this.$message.warning("请选一个");
      }
      this.dialogVisible = true;
    },
    sendhandle() {
      let promiseArr = [];
      this.multipleSelection.forEach((e) => {
        let replyObj = {
          recipient: e.email,
          subject: e.subject,
          html: this.form.sendContent,
        };
        promiseArr.push(this.$http.post("/email", replyObj));
      });
      Promise.all(promiseArr).then((res) => {
        console.log(res);
        this.dialogVisible = false;
      });
      // .catch(err => {
      //   this.dialogVisible = false;
      // });
    },
  },
};
</script>

<style lang="scss" scoped></style>
