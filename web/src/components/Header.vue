<template>
  <header class="head nav d-flex jc-around ai-center" :class="isScrolling ? `mini` : ''">
    <div class="hand">
      <router-link tag="div" to="/">
        <img
          src="https://miqilin-blog.oss-cn-shenzhen.aliyuncs.com/logo.png"
          height="42"
          class="main-img"
        />
      </router-link>
    </div>
    <div class="d-flex text-white hand">
      <router-link
        exact
        tag="div"
        :to="item.link"
        v-for="item in items"
        :key="item.text"
        active-class="active"
        class="nav-item px-5 icon"
      >{{ item.text }}</router-link>
      <div class="play pl-5">
        <i
          v-show="!isPlay"
          active-class="active"
          class="iconfont icon-music-o nav-item"
          @click="playMusic(true)"
        ></i>
        <i
          v-show="isPlay"
          active-class="active"
          class="iconfont icon-Pause1 nav-item"
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
  </header>
</template>

<script>
import Search from "../components/Search.vue";
export default {
  components: {
    Search
  },
  data() {
    return {
      isShowMenu: false,
      isPlay: false,
      isScrolling: false,
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
  mounted() {
    this.ajustNavigation();
    window.addEventListener("scroll", this.ajustNavigation);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.ajustNavigation);
  },
  methods: {
    ajustNavigation() {
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0;
      this.isScrolling = scrollTop > 0;
    },
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
  display: relative;
  height: 65px;
  background-color: transparent;
  box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.5);
  transition: 0.5s ease-in-out;
  .icon-music-o {
    font-size: 19px;
  }
  .icon-Pause1 {
    font-size: 19px;
  }
}

.mini {
  background-color: map-get($colors, "navcolor");
  height: 56px;
  transition: 0.5s ease-in-out;
}
.show-list {
  display: block !important;
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
