<template>
  <div class="comment-list">
    <div v-if="commentsList.length === 0" class="text-center">
      <p class="fs-xxl text-grey-1">快来抢个沙发吧！</p>
    </div>
    <div
      v-else
      v-for="(item, index) in commentsList"
      :key="index"
      class="py-5"
      :class="index > 0 ? 'border-top' : ''"
    >
      <div class="d-flex">
        <div class="avatar-one text-left">
          <img :src="item.avatarImg" alt="miqilin头像" width="50" height="50" />
        </div>
        <div class="flex-1 fs-lg">
          <div class="d-flex ai-center">
            <strong class="mr-4 text-green">{{ item.nickName }}</strong>
            <span class="text-grey-2">
              <span class>{{ item.createdAt | formatDate }}</span>
              <strong
                class="reply pl-4"
                @click="replyHandle(item, index, false)"
                v-if="item.userId !== userInfo._id"
              >
                {{ showReply ? '回复' : '回复' }}
              </strong>
            </span>
          </div>
          <div class="py-4 text-grey-2">{{ item.content }}</div>
          <div
            class="bg-navcolor pl-5 bdr"
            :class="{ 'py-4': item.children.length > 0 }"
          >
            <div class v-for="(c, i) in item.children" :key="i">
              <div class="d-flex pt-2">
                <div class="mini-avatar text-left">
                  <img
                    :src="c.avatarImg"
                    alt="miqilin头像"
                    width="30"
                    height="30"
                  />
                </div>
                <div class="flex-1">
                  <div class="mt-0 fs-md">
                    <span>
                      <strong class="text-green mr-4">{{ c.nickName }}</strong>
                    </span>
                    <span class="text-grey-2">
                      <span>{{ c.createdAt | formatDate }}</span>
                      <strong
                        class="reply pl-4"
                        @click="replyHandle(item, index, c)"
                        v-if="c.userId !== userInfo._id"
                      >
                        {{
                          showReply && commentIndex === index ? '回复' : '回复'
                        }}
                      </strong>
                    </span>
                  </div>
                  <div class="py-4">
                    <!-- <i class="pl-3 pr-2">回复</i> -->
                    <span class="text-grey-2 fs-md">
                      <span>@{{ c.byAiteName }}：</span>
                      <span>{{ c.content }}</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <comment-textarea
            @blur="showReply = false"
            :model="model"
            @toResponse="hideReply"
            type="children"
            :blogsId="blogsId"
            v-if="showReply && commentIndex == index"
            :parentId="item._id"
            :nickName="byAiteName"
            :byAiteUserId="byAiteUserId"
            :placeholder="`@${placeholder}`"
          ></comment-textarea>
        </div>
      </div>
    </div>
    <el-drawer
      :title="`回复 ${byAiteName}`"
      :before-close="handleClose"
      :visible.sync="dialog"
      direction="ttb"
      custom-class="demo-drawer"
      ref="drawer"
      size="100%"
    >
      <div class="demo-drawer__content">
        <comment-textarea
          :model="model"
          @toResponse="hideReply"
          type="children"
          :blogsId="blogsId"
          :parentId="parentId"
          :nickName="byAiteName"
          :placeholder="`@${placeholder}`"
        ></comment-textarea>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import { mapState } from 'vuex'
export default {
  props: {
    blogsId: String,
    model: String,
    commentsList: Array,
  },
  data() {
    return {
      placeholder: '',
      userInfo: (localStorage.userInfo &&
        JSON.parse(localStorage.userInfo)) || { _id: '' },
      showReply: false,
      dialog: false,
      loading: false,
      parentId: '',
      byAiteName: '',
      byAiteUserId: '',
      commentIndex: -1,
      total: 31,
      pageNum: 1,
      pageSize: 10,
      clientWidth: 10000,
    }
  },
  created() {
    this.clientWidth = document.body.clientWidth
  },
  filters: {
    formatDate(val) {
      return dayjs(val).format('YYYY-MM-DD HH:MM:ss')
    },
  },
  computed: {
    ...mapState(['map_user_info']),
  },
  methods: {
    replyHandle(item, index, c) {
      this.userInfo = (localStorage.userInfo &&
        JSON.parse(localStorage.userInfo)) || { _id: '' }
      if (!this.userInfo._id) {
        return this.$message.warning('请先点击留言头像设置账号')
      }
      this.placeholder = c ? c.nickName : item.nickName
      this.commentIndex = index
      this.parentId = item._id
      this.byAiteName = c ? c.nickName : item.nickName
      this.byAiteUserId = c ? c.userId : item.userId
      // 如果设备屏幕宽度<=375, 回复框使用弹出el-drawer
      if (this.clientWidth <= 450) {
        this.dialog = true
        return
      }
      this.showReply = true
    },
    hideReply() {
      this.commentIndex = -1
      this.dialog = false
      this.$emit('getCommentList')
    },
    handleClose() {
      this.dialog = false
    },
  },
}
</script>

<style lang="scss" scoped>
.min-height {
  min-height: 300px;
}
.comment-list {
  .avatar-one {
    padding-right: 20px;
    img {
      border-radius: 20%;
    }
  }
  .mini-avatar {
    padding-right: 10px;
    img {
      border-radius: 20%;
    }
  }
}

.reply {
  cursor: pointer;
  &:hover {
    color: #34b686;
    text-decoration: underline;
  }
}
@media screen and (max-width: 768px) {
  .comment-list {
    .avatar-one {
      padding-right: 15px;
    }
  }
}
@media screen and (max-width: 400px) {
  .comment-list {
    .avatar-one {
      padding-right: 10px;
      img {
        width: 32px;
        height: 32px;
      }
    }
    .mini-avatar {
      padding-right: 5px;
      img {
        width: 22px;
        height: 22px;
      }
    }
  }
}
</style>
