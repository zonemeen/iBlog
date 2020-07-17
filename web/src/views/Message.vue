<template>
  <div class="main-container page-message d-flex flex-column ai-center pt-9">
    <div class="page p-5">
      <div class="content">
        <div class="text-green fs-xxxxl">Message</div>
        <div class="text-grey-2 fs-sm mt-5">Published on March 11th 2020</div>
        <div class="mt-5 mb-5"></div>
        <div class="py-4">
          <span class="fs-xxl text-green">#</span>
          &nbsp;
          <span class="fs-xxl text-grey-1">留言前需知</span>
        </div>
        <div class="pl-5 text-green-1">
          <p>• 烦请各位留言时务必填写自己真实的邮箱</p>
          <p>• 留言博主基本都会回复，并会邮件通知留言者</p>
          <p>• 请不要发广告和带有商业推广链接的无用留言</p>
        </div>
        <p class="my-8 text-grey-2">希望彼此之间有好的交流。 ^_^</p>
      </div>
      <div>
        <div class="mb-7">
          <span class="fs-xxxl text-grey-1 text-center ml-5">留言板</span>
        </div>
        <div :class="{ 'message-box': parentComments.length > 0 }">
          <div class="textarea-box bg-postcolor bdr">
            <comment-textarea
              model="messages"
              @toResponse="getMessagesList"
              type="parent"
              placeholder="输入留言内容"
            ></comment-textarea>
          </div>
          <div :class="{ 'message-box': parentComments.length > 0 }" class="my-9">
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      parentComments: []
    };
  },
  mounted() {
    this.getMessagesList();
  },
  methods: {
    async getMessagesList() {
      let res = await this.$http.get("messages");
      let blogsComments = res.data;
      this.parentComments = blogsComments.filter(
        v => v.parent == "5ec884e3fe28d35475b43fb3"
      );
      this.parentComments.forEach(c => {
        return (c.children = blogsComments.filter(v => v.parent == c._id));
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.textarea-box {
  width: 100%;
  max-width: 650px;
  padding: 5px 15px 15px;
}
.content {
  line-height: 1.8 !important;
}
</style>
