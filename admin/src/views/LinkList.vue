<template>
  <div>
    <m-top-handle
      title="站名"
      content="新建友链"
      path="/links/create"
    ></m-top-handle>
    <h1>友链列表</h1>
    <el-table :data="items">
      <el-table-column prop="_id" label="ID" width="250"></el-table-column>
      <el-table-column prop="name" label="名称"></el-table-column>
      <el-table-column prop="site" label="地址"></el-table-column>
      <el-table-column prop="description" label="描述"></el-table-column>
      <el-table-column fixed="right" label="操作" width="180">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            icon="el-icon-edit"
            @click="$router.push(`/links/edit/${scope.row._id}`)"
            >编辑</el-button
          >
          <el-button
            type="text"
            size="small"
            icon="el-icon-delete"
            @click="remove(scope.row._id)"
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
      items: [],
    };
  },
  methods: {
    async fetch() {
      const res = await this.$http.get("rest/links");
      this.items = res.data;
    },
    remove(id) {
      this.$confirm("是否确定要删除该友链?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          await this.$http.delete(`rest/links/${id}`);
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          this.fetch();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
  created() {
    this.fetch();
  },
};
</script>
