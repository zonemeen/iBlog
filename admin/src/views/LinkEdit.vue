<template>
  <div>
    <h1>{{ id ? "编辑" : "新增" }}友链</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="网站名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="网站地址">
        <el-input v-model="model.site"></el-input>
      </el-form-item>
      <el-form-item label="网站描述">
        <el-input v-model="model.description"></el-input>
      </el-form-item>
      <el-form-item label="网站图标">
        <el-upload
          class="avatar-uploader"
          :action="uploadUrl"
          :headers="getAuthHeaders()"
          :show-file-list="false"
          :on-success="res => $set(model, 'icon', res.url)"
        >
          <img v-if="model.icon" :src="model.icon" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    id: {}
  },
  data() {
    return {
      model: {}
    };
  },
  methods: {
    async save() {
      if (this.id) {
        await this.$http.put(`rest/links/${this.id}`, this.model);
      } else {
        await this.$http.post("rest/links", this.model);
      }
      this.$router.push("/links/list");
      this.$message({
        type: "success",
        message: "保存成功"
      });
    },
    async fetch() {
      const res = await this.$http.get(`rest/links/${this.id}`);
      //this.model = res.data
      this.model = Object.assign({}, this.model, res.data);
    }
  },
  created() {
    this.id && this.fetch();
  }
};
</script>
