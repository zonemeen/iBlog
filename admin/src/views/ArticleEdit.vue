<template>
  <div>
    <h1>{{ id ? "编辑" : "新建" }}文章</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="所属分类">
        <el-select v-model="model.categories" multiple>
          <el-option
            v-for="item in categories"
            :key="item._id"
            :label="item.name"
            :value="item._id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标题">
        <el-input v-model="model.title"></el-input>
      </el-form-item>
      <el-form-item label="缩略图">
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
      <el-form-item label="详情">
        <div>
          <mavon-editor
            code_style="monokai-sublime"
            :ishljs="true"
            ref="mavon"
            v-model="model.body"
            @imgAdd="$imgAdd"
          ></mavon-editor>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";
export default {
  name: "Create",
  components: {
    mavonEditor
  },
  props: {
    id: {}
  },
  data() {
    return {
      model: {},
      categories: [],
      body: ""
    };
  },
  methods: {
    async save() {
      if (this.id) {
        await this.$http.put(`rest/articles/${this.id}`, this.model);
      } else {
        await this.$http.post("rest/articles", this.model);
      }
      this.$router.push("/articles/list");
      this.$message({
        type: "success",
        message: "保存成功"
      });
    },
    async fetch() {
      const res = await this.$http.get(`rest/articles/${this.id}`);
      this.model = res.data;
    },
    async fetchCategories() {
      const res = await this.$http.get("rest/categories");
      this.categories = res.data;
    },
    // async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
    //   const formData = new FormData();
    //   formData.append("file", file);
    //   const res = await this.$http.post("upload", formData);
    //   Editor.insertEmbed(cursorLocation, "image", res.data.url);
    //   resetUploader();
    // }
    $imgAdd(pos, $file) {
      const formData = new FormData();
      formData.append("file", $file);
      this.$http.post("upload", formData).then(res => {
        console.log(res);
        this.$refs.mavon.$img2Url(pos, res.data.url);
      });
    }
  },
  created() {
    this.fetchCategories();
    this.id && this.fetch();
  }
};
</script>
