<template>
  <div class="pt-5">
    <div class="d-flex">
      <div class="avatar-box text-center">
        <img
          @click="lookUserInfo"
          v-if="userInfo.avatarImg"
          :src="userInfo.avatarImg"
          alt="miqilin头像"
        />
        <i v-else @click="lookUserInfo" class="iconfont icon-touxiang hand"></i>
        <p class="mt-2 avatar text-center fs-lg text-grey-2">
          {{ userInfo.nickName ? userInfo.nickName : "留言" }}
        </p>
      </div>
      <div class="flex-1">
        <el-input
          type="textarea"
          rows="4"
          v-model="messageObj.content"
          :placeholder="placeholder"
        ></el-input>
        <div class="mt-3 d-flex jc-between position-emoji">
          <button @blur="showEmoji = false" class="bg-postcolor btn-none">
            <i
              class="iconfont icon-Smile hand"
              @click="
                showBtn = true;
                showEmoji = !showEmoji;
              "
            ></i>
            <VEmojiPicker
              @focus="showEmoji = true"
              :showSearch="false"
              :emojisByRow="10"
              :emojiSize="30"
              class="emoji-picker"
              v-show="showEmoji"
              :pack="packData"
              @select="selectEmoji"
            />
          </button>
          <el-button
            type="primary"
            size="small"
            :loading="btnLoading"
            @click="fabuHandle"
            >发布</el-button
          >
        </div>
      </div>
    </div>
    <el-dialog
      :append-to-body="true"
      :visible.sync="dialogVisible"
      width="300px"
      center
    >
      <div :class="{ turnAnima: false }">
        <form-input
          @toRequest="submit"
          :isUpload="false"
          :toForm="userForm"
        ></form-input>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import VEmojiPicker from "v-emoji-picker";
import formInput from "./formInput";
export default {
  props: {
    model: String,
    type: String,
    blogsId: String,
    parentId: String,
    nickName: String,
    byAiteUserId: String,
    placeholder: String,
  },
  components: {
    // EmojiPicker,
    VEmojiPicker,
    formInput,
  },
  data() {
    return {
      showBtn: false,
      showEmoji: false,
      btnLoading: false,
      input: "",
      search: "",
      packData: "",
      userInfo: {
        nickName: "",
        email: "",
        url: "",
        avatarImg: "",
        id: "",
      },
      dialogVisible: false,
      userForm: {
        nickName: "",
        email: "",
        url: "",
        avatarImg: "",
      },
      qqUrl: "https://q1.qlogo.cn/g?b=qq&nk=QQ号码&s=100",
      userRules: {
        nickName: { required: true, message: "必填", trigger: "change" },
        email: { required: true, message: "必填", trigger: "change" },
        url: { required: true, message: "必填", trigger: "change" },
      },
      messageObj: {
        nickName: "",
        avatarImg: "",
        content: "",
        relateBlogId: this.blogsId,
        parent: "",
        byAiteName: "",
      },
    };
  },
  created() {
    this.userInfo = localStorage.userInfo
      ? JSON.parse(localStorage.userInfo)
      : this.userInfo;
  },
  computed: {
    ...mapState(["map_user_info"]),
  },
  methods: {
    ...mapMutations(["map_set_user_info"]),
    lookUserInfo() {
      this.userForm = this.userInfo;
      this.dialogVisible = true;
    },
    async fabuHandle() {
      if (!localStorage.userInfo) {
        return (this.dialogVisible = true);
      }
      if (!this.messageObj.content) {
        return this.$message.warning("你好，请发言");
      }
      this.btnLoading = true;
      this.messageObj.nickName = this.userInfo.nickName;
      this.messageObj.avatarImg = this.userInfo.avatarImg;
      this.messageObj.userId = this.userInfo._id;
      this.messageObj.parent =
        this.type == "children" ? this.parentId : "5ec884e3fe28d35475b43fb3";
      this.messageObj.byAiteName =
        this.type == "children" ? this.nickName : "miqilin";
      let url = this.model == "comments" ? "/comments" : "/messages";
      await this.$http.post(url, this.messageObj);
      this.$emit("toResponse");
      this.$message.success("发布成功");

      this.btnLoading = false;
      if (this.userInfo.nickName == "miqilin博主") {
        let byAiteObj = await this.$http.get(`users/${this.byAiteUserId}`);
        let replyObj = {
          recipient: byAiteObj.data.email,
          subject: this.messageObj.byAiteName,
          html: this.messageObj.content,
        };
        await this.$http.post("email", replyObj);
      }
      this.messageObj.content = "";
    },
    async submit(userForm) {
      userForm.avatarImg = this.qqUrl.replace(
        "QQ号码",
        userForm.email.replace("@qq.com", "")
      );
      console.log(userForm.email.replace("@qq.com", ""));
      console.log(
        this.qqUrl.replace("QQ号码", userForm.email.replace("@qq.com", ""))
      );
      console.log(userForm.avatarImg);
      let res;
      if (this.userInfo._id) {
        res = await this.$http.put(`users/${this.userInfo._id}`, userForm);
      } else {
        res = await this.$http.post("users", userForm);
      }
      this.map_set_user_info(res.data);
      this.userInfo = res.data;
      localStorage.userInfo = JSON.stringify(res.data);
      this.dialogVisible = false;
    },
    selectEmoji(emoji) {
      this.messageObj.content += emoji.data;
    },
    insert(emoji) {
      this.input += emoji;
    },
  },
};
</script>

<style lang="scss" scoped>
.emoji-picker {
  z-index: 1000;
}
.avatar-box {
  width: 70px;
  padding-right: 20px;
  padding-top: 14px;
  img {
    cursor: pointer;
    width: 100%;
    height: auto;
    border-radius: 20%;
  }
  .icon-touxiang {
    font-size: 44px;
    color: #c4c4c4;
  }
}
.btn-none {
  border: 1px solid transparent;
  outline: none;
}
.position-emoji {
  transition: all 0.6s ease-in-out;
  position: relative;
  .emoji-picker {
    position: absolute;
    top: 40px;
    left: 0;
  }
}
.icon-Smile {
  font-size: 22px;
  color: #707275;
  &:hover {
    color: #ffb929;
  }
}

@media screen and (max-width: 768px) {
  .avatar-box {
    width: 65px;
    padding-right: 15px;
  }
}
@media screen and (max-width: 400px) {
  .avatar-box {
    width: 42px;
    padding-right: 10px;
    .icon-touxiang {
      font-size: 32px;
    }
  }
}
@media screen and (max-width: 375px) {
  .avatar-box {
    padding-right: 10px;
    .icon-xingzhuangkaobei {
      font-size: 32px;
    }
  }
}
</style>

<style>
.el-textarea__inner {
  background-color: #363938;
  font-size: 16px;
  color: #707275;
  border: 1px solid #707275;
}
</style>
