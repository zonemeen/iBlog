<template>
  <div class="fromInput">
    <el-form :model="userForm" :rules="userRules" ref="userForm">
      <el-form-item prop="nickName">
        <el-input
          size="medium"
          :maxlength="10"
          v-model="userForm.nickName"
          :placeholder="isUpload ? '网站名称' : '起个牛B点的昵称吧～'"
        ></el-input>
      </el-form-item>
      <el-form-item prop="email" v-if="isUpload">
        <el-input
          size="medium"
          v-model="userForm.email"
          placeholder="电子邮箱(@xx.com)"
        ></el-input>
      </el-form-item>
      <el-form-item prop="qqEmail" v-else>
        <el-input
          size="medium"
          v-model="userForm.qqEmail"
          placeholder="QQ邮箱(仅为了获取QQ头像)"
        ></el-input>
      </el-form-item>
      <el-form-item prop="url">
        <el-input
          size="medium"
          v-model="userForm.url"
          placeholder="博客/github地址(开头http://或https://)"
        ></el-input>
      </el-form-item>
      <el-form-item prop="description" v-if="isUpload">
        <el-input
          size="medium"
          type="textarea"
          :maxlength="30"
          v-model="userForm.description"
          placeholder="个人描述"
        ></el-input>
      </el-form-item>
      <el-form-item size="medium" prop="avatarImg" v-if="isUpload">
        <el-upload
          class="avatar-uploader"
          :action="$http.defaults.baseURL + '/upload'"
          :show-file-list="false"
          :limit="1"
          :on-success="(res) => $set(userForm, 'avatarImg', res.url)"
        >
          <img
            v-if="userForm.avatarImg"
            :src="userForm.avatarImg"
            class="logo-img"
            alt="miqilin头像缩略图"
          />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <span>*上传站点logo, jpg/png, 不大于200KB</span>
      </el-form-item>
      <!-- <el-form-item prop="isRead" v-if="isUpload">
        <el-checkbox size="medium" v-model="userForm.isRead">
          <span :class="userForm.isRead ? 'isRead' : 'read-text'" @click="readInfo">已阅读详细填写要求</span>
        </el-checkbox>
      </el-form-item>-->
    </el-form>
    <el-button type="primary" class="width-100" @click="saveForm('userForm')"
      >提交</el-button
    >
  </div>
</template>

<script>
import {
  // validateUrl,
  validateEmail,
  validateQQEmail,
} from "../plugins/validate";
export default {
  props: {
    isUpload: { type: Boolean, default: false },
    toForm: { type: Object, default: null },
  },
  data() {
    return {
      userForm: {
        nickName: "",
        email: "",
        qqEmail: "",
        url: "",
        description: "",
        avatarImg: "",
        isRead: false,
      },
      userRules: {
        nickName: {
          required: true,
          message: "必填，且不超过10个字符",
          trigger: "change",
        },
        email: { required: true, validator: validateEmail, trigger: "change" },
        qqEmail: {
          required: true,
          validator: validateQQEmail,
          trigger: "change",
        },
        url: { required: true, message: "必填", trigger: "change" },
        description: {
          required: true,
          message: "必填，且不超过30个字符",
          trigger: "change",
        },
        avatarImg: {
          required: true,
          message: "必填，且仅限jpg/png, 不大于200KB",
          trigger: "change",
        },
        // isRead: { required: false, message: "必填", trigger: "change" }
      },
    };
  },
  watch: {
    isUpload(newV) {
      if (newV) {
        this.userRules.description.required = true;
        this.userRules.avatarImg.required = true;
        this.userRules.email.required = true;
      } else {
        this.userRules.description.required = false;
        this.userRules.avatarImg.required = false;
        this.userRules.qqEmail.required = false;
        this.userRules.url.required = false;
      }
    },
  },
  created() {
    if (this.isUpload) {
      this.userRules.description.required = true;
      this.userRules.avatarImg.required = true;
      this.userRules.email.required = true;
    } else {
      this.userRules.description.required = false;
      this.userRules.avatarImg.required = false;
      this.userRules.qqEmail.required = false;
      this.userRules.url.required = false;
    }
    this.userForm = this.toForm ? this.toForm : this.userForm;
  },
  methods: {
    saveForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        this.userForm.email = this.userForm.qqEmail;
        if (valid) {
          this.$emit("toRequest", this.userForm);
        } else {
          return false;
        }
      });
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg" || file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 0.2;
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG/PNG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 200KB!");
      }
      return isJPG && isLt2M;
    },
    readInfo() {
      // console.log(this.$parent)
      // this.$parent.turnAnima = true
      // console.log(this.$parent.turnAnima)
    },
  },
};
</script>

<style lang="scss" scoped>
.read-text {
  border-bottom: 1px solid #000;
  &:hover {
    border-color: #8600ff;
    color: #8600ff;
  }
}
.isRead {
  border-bottom: 1px solid #ffb929;
}
.avatar-uploader {
  height: 62px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9 !important;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff !important;
}
.avatar-uploader-icon {
  font-size: 24px;
  color: #8c939d;
  width: 60px;
  height: 60px;
  line-height: 60px !important;
  text-align: center;
}
.logo-img {
  width: 60px;
  height: 60px;
  display: block;
}
.el-form-item {
  margin-bottom: 18px !important;
}
</style>
