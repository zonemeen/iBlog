<template>
  <div>
    <m-top-handle title="昵称" content="评论"></m-top-handle>
    <el-table :data="tableData" border>
      <el-table-column type="index" label="序号" width="50"></el-table-column>
      <el-table-column prop="_id" label="id"></el-table-column>
      <el-table-column prop="avatarImg" label="头像">
        <template slot-scope="scope">
          <img :src="scope.row.avatarImg" alt height="50" />
        </template>
      </el-table-column>
      <el-table-column prop="nickName" label="昵称"></el-table-column>
      <el-table-column prop="byAiteName" label="艾特谁"></el-table-column>
      <el-table-column prop="content" label="留言"></el-table-column>
      <el-table-column label="操作" width="90">
        <template slot-scope="scope">
          <el-button type="text" size="small">回复</el-button>
          <el-button type="text" size="small" @click="deleteHandle(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: [],
      title: "",
    };
  },
  created() {
    this.getList();
  },
  methods: {
    async getList() {
      let res = await this.$http.get("/rest/comments");
      this.tableData = res.data;
    },
    deleteHandle(data) {
      this.$confirm(`是否确定要删除留言: ${data.content} ?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          await this.$http.delete(`/rest/comments/${data._id}`);
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
  },
};
</script>
