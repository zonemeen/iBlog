<template>
  <div class="main">
    <Header></Header>
    <Snow></Snow>
    <router-view style="min-height: 800px"></router-view>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import Snow from '../components/snow.vue'

export default {
  components: {
    Header,
    Footer,
    Snow,
  },
  data() {
    return {}
  },
}
</script>
