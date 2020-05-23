<template>
  <div class="head nav d-flex jc-around ai-center bg-navcolor">
    <div class="hand">
      <router-link tag="div" to="/">
        <img
          src="https://miqilin-blog.oss-cn-shenzhen.aliyuncs.com/logo.png"
          height="42"
          class="main-img"
        />
      </router-link>
    </div>
    <div class="d-flex text-grey-1 hand">
      <router-link
        exact
        tag="div"
        :to="item.link"
        v-for="item in items"
        :key="item.text"
        active-class="active"
        class="nav-item px-5 icon"
      >{{ item.text }}</router-link>
      <div class="pl-3 play">
        <i
          v-show="!isPlay"
          active-class="active"
          class="el-icon-video-play fs-xxxl nav-item"
          @click="playMusic(true)"
        ></i>
        <i
          v-show="isPlay"
          active-class="active"
          class="el-icon-video-pause fs-xxxl nav-item"
          @click="playMusic(false)"
        ></i>
      </div>
      <div v-show="isPlay">
        <audio
          id="music"
          ref="music"
          src="https://miqilin-blog.oss-cn-shenzhen.aliyuncs.com/Prospect.mp3"
          loop
        ></audio>
      </div>

      <el-dropdown trigger="click" @visible-change="(v) => (isShowMenu = v)">
        <div
          class="menu-button hand"
          @click="isShowMenu = !isShowMenu"
          :class="{ isShowMenu: isShowMenu }"
        >
          <i></i>
          <i></i>
          <i></i>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <router-link tag="div" to="/">首页</router-link>
          </el-dropdown-item>
          <el-dropdown-item divided>
            <router-link tag="div" to="/archives">归档</router-link>
          </el-dropdown-item>
          <el-dropdown-item divided>
            <router-link tag="div" to="/tags">标签</router-link>
          </el-dropdown-item>
          <el-dropdown-item divided>
            <router-link tag="div" to="/links">友链</router-link>
          </el-dropdown-item>
          <el-dropdown-item divided>
            <router-link tag="div" to="/message">留言</router-link>
          </el-dropdown-item>
          <el-dropdown-item divided>
            <router-link tag="div" to="/about">关于</router-link>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShowMenu: false,
      isPlay: false,
      items: [
        { text: "首页", link: "/" },
        { text: "归档", link: "/archives" },
        { text: "标签", link: "/tags" },
        { text: "友链", link: "/links" },
        { text: "留言", link: "/message" },
        { text: "关于", link: "/about" }
      ]
    };
  },
  methods: {
    playMusic(play) {
      this.isPlay = !this.isPlay;
      if (play) {
        this.$refs.music.play();
      } else {
        this.$refs.music.pause();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/style.scss";

.nav-item.active {
  color: map-get($colors, "red");
}

.nav-item:hover {
  color: map-get($colors, "red");
}

.head {
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 999;
  height: 65px;
}
.menu-button {
  border: none;
  display: none;
  i {
    display: block;
    width: 24px;
    height: 3px;
    background-color: #fff;
    margin: 5px auto;
    transition: 0.2s ease-in-out;
  }
}
.isShowMenu {
  i {
    &:nth-child(2) {
      opacity: 0;
    }
    &:nth-child(1) {
      transform: translateY(8px) rotate(-45deg);
    }
    &:nth-child(3) {
      transform: translateY(-8px) rotate(45deg);
    }
  }
}
.el-dropdown-link {
  cursor: pointer;
}
@media screen and (max-width: 650px) {
  .nav-item {
    display: none;
  }
  .play {
    display: none;
  }
  .menu-button {
    display: block;
    margin-left: 120px;
  }
}
</style>
