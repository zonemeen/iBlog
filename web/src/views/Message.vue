<template>
  <div class="page-link d-flex flex-column ai-center pt-10">
    <div class="page p-6">
      <div class="text-green fs-xxxxl">Message</div>
      <div class="text-grey-2 fs-sm mt-5">Published on March 11th 2020</div>
      <div class="mt-5 mb-5"></div>
      <div class="py-4">
        <span class="fs-xxl text-green">#</span>
        &nbsp;
        <span class="fs-xxl text-grey-1">留言前需知</span>
      </div>
      <div class="pl-6 text-green-1">
        <p>• 烦请各位留言时务必填写自己真实的邮箱。</p>
        <p>• 留言博主基本都会回复，并会邮件通知留言者。</p>
        <p>• 请不要发广告和带有商业推广链接的无用留言。</p>
      </div>
      <p class="my-8 text-grey-2">希望彼此之间有好的交流。 ^_^</p>
      <div class="mb-9">
        <div class="mb-7">
          <span class="fs-xxxl text-grey-1 text-center ml-5">留言板</span>
        </div>
        <div :class="{ 'message-box': parentComments.length > 0 }">
          <div class="textarea-box bg-white">
            <comment-textarea
              model="messages"
              @toResponse="getMessagesList"
              type="parent"
              placeholder="大家请坐下，陈独秀同志，要发言了。。。"
            ></comment-textarea>
          </div>
          <div :class="{ 'message-box': parentComments.length > 0 }">
            <comment-list
              model="messages"
              @getCommentList="getMessagesList"
              :commentsList="parentComments"
              v-if="parentComments"
            ></comment-list>
          </div>
        </div>
      </div>
    </div>
    <div class="w-100 h-100">
      <el-backtop :bottom="50"></el-backtop>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      parentComments: [],
    };
  },
  created() {
    this.getMessagesList();
  },
  methods: {
    async getMessagesList() {
      let res = await this.$http.get("messages");
      let blogsComments = res.data;
      this.parentComments = blogsComments.filter(
        (v) => v.parent == "5e52a80981bf76430fd982f0"
      );
      this.parentComments.forEach((c) => {
        return (c.children = blogsComments.filter((v) => v.parent == c._id));
      });
      console.log(this.parentComments, blogsComments, res.data);
    },
  },
};
</script>

<style lang="scss" scoped>
.slot-box {
  height: 100%;
  padding-bottom: 20px;
  .textarea-box {
    width: 100%;
    max-width: 500px;
    padding: 5px 15px 15px;
  }
}
// .dialog {
//   position: relative;
//   background-color: rgba(21, 21, 21, 0.5);
// }
@media screen and (max-width: 768px) {
  .slot-box {
    padding-bottom: 0px;
  }
}
</style>
<style>
.emoji-picker-icon {
  top: 95px;
}
</style>
