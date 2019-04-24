<template>
  <div class="route-side">
    <el-menu
      :collapse="collapse"
      router
      ref="menu"
      style="border: 0"
      unique-opened
      :default-active="$route.fullPath.toLowerCase()"
      :background-color="theme.side.bgColor"
      :text-color="theme.side.textColor"
      :collapse-transition="false"
      :active-text-color="theme.side.activeColor"
    >
      <SubRoute
        v-for="route in sideRoutes"
        :key="route.name"
        :route="route"
        :path="route.path"
      />
    </el-menu>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import SubRoute from "./SubRoute";

export default {
  name: "RouteSide",
  components: { SubRoute },
  data() {
    return {
      collapse: false
    };
  },
  computed: {
    ...mapState("App", ["asideShow", "isMobile"]),
    ...mapGetters("Router", ["sideRoutes"]),
    ...mapGetters("App", ["theme"])
  },
  watch: {
    asideShow(now) {
      if (this.isMobile) return false;
      if (now) {
        this.collapse = false;
      } else {
        const menu = this.$refs.menu;
        const index = menu.openedMenus[0];
        menu.close(index);
        setTimeout(() => {
          this.collapse = true;
        }, 200);
      }
    }
  }
};
</script>

<style lang="less" rel="stylesheet/less">
@import "../../styles/variable";

.route-side {
  .shadow;
  min-height: 100%;
  overflow: hidden;
  margin-left: -5px;
}
</style>
