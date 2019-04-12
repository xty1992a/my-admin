<template>
  <div class="icons-container page">
    <div class="icons-wrapper layout-block">
      <div v-for="item of iconsMap" :key="item">
        <el-tooltip placement="top">
          <div slot="content">{{generateIconCode(item)}}</div>
          <div class="icon-item">
            <div @click="copyText(generateIconCode(item),$event)">
              <svg-icon class-name="disabled" :icon="item"/>
            </div>
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

    }

    span {
      display: block;
      font-size: 12px;
      margin-top: 10px;
    }

    svg {
      pointer-events: none;
    }
  }

</style>
