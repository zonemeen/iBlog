<template>
  <div class="topbar nav jc-around bg-navcolor">
    <div class="mt-4 hand">
      <router-link tag="div" to="/">
        <img src="../assets/logo.png" height="42" class="main-img" />
      </router-link>
    </div>
    <div class="d-flex my-7 text-grey-1 hand main-font">
      <router-link
        exact
        tag="div"
        :to="item.link"
        v-for="item in items"
        :key="item.text"
        active-class="active"
        class="nav-item px-5 icon"
      >{{ item.text }}</router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        { text: "首页", link: "/" },
        { text: "归档", link: "/archives" },
        { text: "标签", link: "/tags" },
        { text: "友链", link: "/links" },
        { text: "留言", link: "/message" },
        { text: "关于", link: "/about" }
      ]
    };
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

.topbar {
  position: sticky;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 999;
}
</style>
