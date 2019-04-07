<template>
  <div class="nav-bar" :style="style">
    <transition name="tool">
      <div class="tool-bar" v-show="navShow">

        <div class="left-bar">
          <el-button @click="toggleAside" :title="asideShow?'收起':'展开'">
            <svg-icon :icon="asideShow?'left_step':'right_step'"/>
          </el-button>
        </div>

        <div class="right-bar">
          <Avatar :size="30" :src="userInfo.avatar" style="margin-right: 10px;" :title="userInfo.name" v-if="userInfo"/>

          <el-button @click="logout" title="登出">
            <svg-icon icon="exit"/>
          </el-button>
        </div>

      </div>
    </transition>
    <RouteTags/>
  </div>
</template>

<script>
  import Avatar from '@/components/Avatar'
  import RouteTags from '@/components/RouteTags'
  import scroll from '@/utils/wheelEvent'
  import {mapGetters, mapState} from 'vuex'

  export default {
    name: 'NavBar',
    components: {RouteTags, Avatar},
    data() {
      return {}
    },
    created() {
      scroll.off('wheel', this.wheel)
      scroll.on('wheel', this.wheel)
      document.documentElement.removeEventListener('mouseup', this.scrollTopCheck)
      document.documentElement.addEventListener('mouseup', this.scrollTopCheck)
    },
    methods: {
      scrollTopCheck(e) {
        // 操作滚动条,检查滚动高度
        // 滚动条部分属于可滚动元素,即,如果鼠标在HTML自身抬起,则一定是在操作滚动条
        if (!e.target || e.target !== document.documentElement) return
        let scrollTop = document.documentElement.scrollTop
        if (scrollTop < this.navHeight) {
          this.$store.commit('App/TOGGLE_NAV', true)
        }
      },

      toggleAside() {
        this.$store.commit('App/TOGGLE_ASIDE')
      },

      wheel(down) {
        this.$store.commit('App/TOGGLE_NAV', !down)
      },

      async logout() {
        this.$store.dispatch('User/Logout')
        this.$router.push('/Login')
      },
    },
    computed: {
      ...mapState('App', [
        'navShow',
        'asideShow',
      ]),
      ...mapGetters('App', [
        'asideWidth',
        'navHeight',
      ]),
      ...mapState('User', [
        'userInfo'
      ]),
      style() {
        return {
          left: this.asideWidth + 'px',
          height: this.navHeight + 'px',
        }
      },
      toolStyle() {
        return {
          height: this.navShow ? '50px' : 0,
        }
      },
      btnText() {
        return this.asideShow ? '收起' : '展开'
      },
    },
    beforeDestroy() {
      scroll.off('wheel', this.wheel)
      document.documentElement.removeEventListener('mouseup', this.scrollTopCheck)
    },
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>

  .nav-bar {
    z-index: 10;
    position: fixed;
    background-color: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    right: 0;
    top: 0;
    transition: left .3s, height .3s;

    .tool-bar {
      height: 50px;
      overflow: hidden;
      display: flex;
      align-items: center;
      padding: 0 10px;
      justify-content: space-between;

      .el-button {
        padding: 10px;
        border: 0;
      }

      .right-bar {
        display: flex;
        align-items: center;
      }
    }

    .tool-enter, .tool-leave-to {
      height: 0;
      transform: translateY(-100%);
    }

    .tool-enter-active, .tool-leave-active {
      transition: .3s;
    }
  }
</style>
