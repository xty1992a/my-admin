<template>
  <div class="container" :style="style">
    <transition name="router" mode="out-in">
      <router-view v-if="visibility" />
    </transition>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";

export default {
  name: "Container",
  data() {
    return {
      visibility: true
    };
  },
  methods: {
    reload(delay = 20) {
      this.visibility = false;
      setTimeout(() => {
        this.visibility = true;
      }, delay);
    }
  },
  computed: {
    ...mapState("App", ["navShow", "asideShow", "isMobile"]),
    ...mapGetters("App", ["asideWidth", "navHeight"]),
    style() {
      if (this.isMobile) return {};
      return {
        paddingLeft: this.asideWidth + "px"
        // paddingTop: this.navHeight + 'px',
      };
    }
  }
};
</script>

<style lang="less" rel="stylesheet/less" scoped>
.container {
  position: relative;
  padding-top: 90px;
  transition: padding 0.3s;
  min-height: 100vh;

  .router-enter,
  .router-leave-to {
    transform: translate3d(50px, 0, 0);
    opacity: 0;
  }

  .router-enter-active,
  .router-leave-active {
    overflow: hidden;
    transition: transform 0.15s ease, opacity 0.15s ease;
  }
}
</style>
