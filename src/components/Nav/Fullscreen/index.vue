<template>
  <el-button @click="fullScreen" class="fullscreen" title="全屏">
    <svg-icon icon="nav_fullscreen"/>
  </el-button>
</template>

<script>
  import screenfull from 'screenfull'

  export default {
	name: 'Fullscreen',
	methods: {
	  fullScreen() {
		if (screenfull.enabled) {
		  screenfull.toggle(document.documentElement)
		  return
		}
		this.$message({
		  message: '您的浏览器不支持或禁用了全屏功能!',
		  type: 'warning',
		})
	  },
	},
  }
</script>

<style scoped lang="less">
  @import "../../../styles/variable";

  .fullscreen {
    fill: #5a5e66;;

    &:hover {
      svg {
        animation: scale .7s;
      }
    }

  }

  @keyframes scale {
    from {
      transform: scale(.6);
      opacity: .5;
    }
  }
</style>
