<template>
  <div class="main-container">
    <div class="main-content archive-page">
      <div class="post-title text-green fs-xxxxl">标签分类的博文--点击自动查找相应`Tags`</div>
      <div>
        <div class="post-tags">
          <a v-for="item in model" :key="item._id" :href="`#${item.name}`">
            {{ item.name }}
            <span>({{ item.tagsList.length }})个</span>
          </a>
        </div>
      </div>
    </div>
    <div class="main-content archive-page">
      <div v-for="item in model" :key="item._id" :id="`${item.name}`" class="post-lists">
        <div v-if="item.tagsList.length > 0">
          <div class="categorys-title">{{ item.name }} : {{ item.tagsList.length }}</div>
          <div v-for="tag in item.tagsList" :key="tag._id" class="post-list-item">
            <div class="post-list-item-container bg-postcolor show">
              <div class="item-label">
                <div class="item-title pl-4">
                  <router-link
                    :data-hover="`${tag.title}`"
                    :to="`/article/list/${tag._id}`"
                  >{{ tag.title }}</router-link>
                </div>
                <div class="item-meta">
                  <div class="item-meta-date">
                    <router-link
                      class="text-grey-1"
                      :to="`/archives`"
                      :data-hover="getDataHover(tag.createdAt)"
                    >
                      {{
                      tag.createdAt | date("YYYY-MM-DD HH:mm:ss")
                      }}
                    </router-link>
                    <router-link
                      class="text-grey-1"
                      :data-hover="`${item.name}`"
                      to="/tags"
                    >{{ item.name }}</router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
export default {
  data() {
    return {
      model: []
    };
  },
  methods: {
    async fetch() {
      this.$insProgress.start();
      const res = await this.$http.get("/tags");
      this.model = res.data;
      this.$insProgress.finish();
    },
    getDataHover(val) {
      return dayjs(val).format("YYYY-MM-DD HH:mm:ss");
    }
  },
  created() {
    this.fetch();
  }
};
</script>

<style lang="scss" scoped>
.post-tags {
  margin: 0;
  padding: 5px 0 20px;
  border-bottom: 1px solid #767676;
  a {
    font-size: 13px;
    font-weight: 600;
    display: inline-block;
    margin: 20px 8px 10px 0;
    padding: 5px 15px;
    &:nth-child(1n) {
      color: #fff;
      border: 1px solid #6fa3ef;
      border-radius: 15px;
      background: #6fa3ef;
    }
    &:nth-child(2n) {
      color: #fff;
      border: 1px solid #ff9800;
      border-radius: 15px;
      background: #ff9800;
    }
    &:nth-child(3n) {
      color: #fff;
      border: 1px solid #46c47c;
      border-radius: 15px;
      background: #46c47c;
    }
    &:nth-child(4n) {
      color: #fff;
      border: 1px solid #f9bb3c;
      border-radius: 15px;
      background: #f9bb3c;
    }
    &:nth-child(5n) {
      color: #fff;
      border: 1px solid #bc99c4;
      border-radius: 15px;
      background: #bc99c4;
    }
    &:nth-child(6n) {
      color: #fff;
      border: 1px solid #e8583d;
      border-radius: 15px;
      background: #e8583d;
    }
  }
}
.archive-page .categorys-title {
  font-size: 14px;
  position: relative;
  margin: 10px auto;
  padding: 0 30px;
  color: #bbbbbb;
}
</style>
