<template>
  <div class="link d-flex my-6 content">
    <div
      class="link-item show m-4 p-4 bg-postcolor bdr"
      v-for="item in model"
      :key="item.name"
    >
      <el-tooltip
        placement="right-end"
        effect="light"
        popper-class="text-grey-2 fs-lg"
      >
        <div slot="content" class="text-green">{{ item.site }}</div>
        <a class="hand" :href="item.site" target="_blank">
          <div class="ai-center d-flex">
            <span>
              <img class="link-img" :src="item.icon" />
            </span>
            <span class="fs-lg text-green pl-5 link-font text-ellipsis">
              {{ item.name }}
            </span>
          </div>
        </a>
      </el-tooltip>
      <div class="fs-xs text-grey-1 mt-3 text-ellipsis">
        {{ item.description }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      model: [],
    }
  },
  methods: {
    async fetchLinks() {
      const res = await this.$http.get('links/list')
      this.model = res.data
    },
  },
  mounted() {
    this.fetchLinks()
  },
}
</script>

<style lang="scss" scpoed>
.link-img {
  width: 32px;
  height: 32px;
  border-radius: 50%;
}

.link-item {
  float: left;
  width: 33.3333%;
  height: auto;
  // padding: 15px;
  align-items: center;
}
.content {
  line-height: 1.4 !important;
}

@media screen and (max-width: 880px) {
  .link {
    display: flex;
    flex-wrap: wrap;
    .link-item {
      width: 45%;
      align-items: center;
    }
  }
}
@media screen and (max-width: 480px) {
  .link {
    display: flex;
    flex-wrap: wrap;
    .link-item {
      width: 100%;
      align-items: center;
    }
  }
}
</style>
