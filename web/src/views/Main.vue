<template>
  <div class="main">
    <Header></Header>
    <router-view style="min-height: 580px;"></router-view>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";

export default {
  components: {
    Header,
    Footer
  },
  data() {
    return {};
  }
};
</script>

