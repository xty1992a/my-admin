<template>
  <div class="icons-container">
    <div class="icons-wrapper layout-block">
      <div v-for="item of iconsMap" :key="item">
        <el-tooltip placement="top">
          <div slot="content">{{generateIconCode(item)}}</div>
          <div class="icon-item">
            <svg-icon class-name="disabled" :icon="item" @click="handleClipboard(generateIconCode(item),$event)"/>
            <span @click="copyText(item, $event)" style="font-size: 12px;">{{item}}</span>
          </div>
        </el-tooltip>
      </div>
    </div>
  </div>
</template>

<script>
  import icons from './generateIconsView'
  import clipboard from '@/utils/clipboard'

  export default {
	name: 'icons',
	data() {
	  return {
		iconsMap: [],
	  }
	},
	mounted() {
	  this.iconsMap = icons.state.iconsMap.map((i) => {
		return i.default.id.split('-')[1]
	  })
	},
	methods: {
	  generateIconCode(symbol) {
		return `<svg-icon icon-class="${symbol}" />`
	  },
	  handleClipboard(text, event) {
		clipboard(text, event)
	  },
	  copyText(text, event) {
		clipboard(text, event)
	  },
	},
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .icons-container {
    .icons-wrapper {
      margin: 0 auto;
    }

    .icon-item {
      margin: 20px;
      height: 110px;
      text-align: center;
      width: 110px;
      float: left;
      font-size: 66px;
      color: #24292e;
      cursor: pointer;

      svg {
        /*animation: jump .8s ease-in infinite;*/
      }
    }

    span {
      display: block;
      font-size: 24px;
      margin-top: 10px;
    }

    .disabled {
      pointer-events: none;
    }
  }

  @keyframes jump {
    0% {
      transform: translateY(0) scale(1.15, .8)
    }

    20% {
      transform: translateY(-35px) scaleY(1.1)
    }

    50% {
      transform: translateY(-50px) scale(1)
    }

    80% {
      transform: translateY(-35px) scale(1)
    }

    to {
      transform: translateY(0) scale(1.15, .8)
    }
  }
</style>
