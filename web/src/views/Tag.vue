<template>
  <div class="main-container" v-if="model">
    <div class="main-content archive-page">
      <div class="post-title text-green fs-xxxxl">标签分类的博文--点击自动查找相应`Tag`</div>
      <div class="text-grey-2 fs-sm mt-6">Published on March 11th 2020</div>
      <div>
        <div class="post-tags">
          <a v-for="item in model" :key="item._id" :href="`#${item._id}`">
            {{ item._id }}
            <span>({{ item.count }})个</span>
          </a>
        </div>
      </div>
    </div>
    <div class="main-content archive-page">
      <div v-for="item in model" :key="item._id" :id="`${item._id}`" class="post-lists anchor">
        <div>
          <div class="categorys-title">{{ item._id }} : {{ item.count }}</div>
          <div v-for="tag in item.list" :key="tag.categories._id" class="post-list-item">
            <div class="post-list-item-container bg-postcolor show">
              <div class="item-label">
                <div class="item-title pl-4">
                  <router-link
                    :data-hover="`${tag.categories.title}`"
                    :to="`/article/list/${tag.categories._id}`"
                  >{{ tag.categories.title }}</router-link>
                </div>
                <div class="item-meta">
                  <div class="item-meta-date">
                    <router-link
                      class="text-grey-1"
                      :to="`/archives`"
                      :data-hover="getDataHover(tag.categories.createdAt)"
                    >{{ tag.categories.createdAt | date("YYYY-MM-DD HH:mm:ss") }}</router-link>
                    <router-link
                      class="text-grey-1"
                      :data-hover="`${item._id}`"
                      to="/tags"
                    >{{ item._id }}</router-link>
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
      const res = await this.$http.get("/tags");
      this.model = res.data;
    },
    getDataHover(val) {
      return dayjs(val).format("YYYY-MM-DD HH:mm:ss");
    }
  },
  mounted() {
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
.anchor {
  margin-top: -80px;
  padding-top: 80px;
  .categorys-title {
    font-size: 14px;
    position: relative;
    margin: 10px auto;
    padding: 0 30px;
    color: #bbbbbb;
  }
}
</style>
