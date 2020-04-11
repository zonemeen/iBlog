<template>
  <div id="app">
    <router-view />
    <vue-ins-progress-bar></vue-ins-progress-bar>
  </div>
</template>

<script>
export default {
  name: "App",
  mounted() {
    this.$insProgress.finish();
  },
  created() {
    this.$insProgress.start();

    this.$router.beforeEach((to, from, next) => {
      this.$insProgress.start();
      next();
    });

    this.$router.afterEach(() => {
      this.$insProgress.finish();
    });
  }
};
</script>
