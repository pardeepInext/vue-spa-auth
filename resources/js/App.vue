<template>
  <div>
    <Header />
    <router-view></router-view>
    <Footer />
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import { mapState } from 'vuex';
export default {
  name: "App",
  components: {
    Header,
    Footer,
  },
  watch: {
    $route: {
      handler: (to, from) => {
        document.title = to.meta.title || "home";
      },
      immediate: true,
    },
  },
};
</script>
