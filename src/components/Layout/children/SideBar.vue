<template>
  <div class="side-bar-container">
    <transition name="fade">
      <div
        class="side-bar-modal"
        v-if="isMobile"
        @click="toggleAside"
        v-show="asideShow"
      ></div>
    </transition>
    <div class="side-bar" :style="style" @wheel.stop @DOMMouseScroll.stop>
      <div class="logo-block" :style="logoStyle">
        <p class="text" v-if="asideShow">设置中心</p>
        <p class="icon" v-else style="padding-left: 5px;">
          <svg-icon icon="menu_activity_creation" />
        </p>
      </div>
      <RouteSide />
    </div>
  </div>
</template>

<script>
import RouteSide from "@/components/RouteSide";
import { mapGetters, mapState } from "vuex";

export default {
  name: "SideBar",
  components: { RouteSide },
  methods: {
    toggleAside() {
      this.$store.commit("App/TOGGLE_ASIDE");
    }
  },
  computed: {
    ...mapGetters("App", ["asideWidth", "theme"]),
    ...mapState("App", ["asideShow", "isMobile"]),
    style() {
      let transform = "";
      if (this.isMobile) {
        transform = `translate3d(${this.asideShow ? 0 : -200}px,0,0)`;
      }
      return {
        transform,
        width: this.isMobile ? 200 + "px" : this.asideWidth + "px",
        backgroundColor: this.theme.side.bgColor,
        color: this.theme.side.textColor
      };
    },

    logoStyle() {
      return {
        backgroundColor: this.theme.logo.bgColor,
        color: this.theme.logo.textColor
      };
    }
  }
};
</script>

<style lang="less" rel="stylesheet/less" scoped>
@import "../../../styles/variable";

.side-bar {
  z-index: 10;
  transition: width 0.3s, transform 0.3s;
  position: fixed;
  width: 300px;
  bottom: 0;
  top: 0;
  left: 0;

  .logo-block {
    text-align: center;
    font-size: 18px;
    height: 50px;
    line-height: 50px;
  }
}

.side-bar-modal {
  position: absolute;
  bottom: 0;
  right: 0;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 10;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: 0.3s;
}
</style>
