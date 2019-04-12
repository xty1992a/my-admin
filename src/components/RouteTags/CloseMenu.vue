<template>
  <ul class="close-menu" v-show="show" :style="{transform}">
    <li @click="closeTag">关闭当前</li>
    <li @click="closeOther" :class="visitedRoutes.length===1?'disabled':''">关闭其他</li>
    <li @click="closeAll" :class="visitedRoutes.length===1?'disabled':''">关闭全部</li>
    <li @click="closeRight" :class="isLasted()?'disabled':''">关闭右侧</li>
  </ul>
</template>

<script>
  import {mapMutations, mapState} from 'vuex'

  export default {
	name: 'CloseMenu',
	components: {},
	data() {
	  return {
		show: false,
		selectTag: null,
		transform: `translateX(0)`,
	  }
	},
	created() {
	},
	methods: {
	  ...mapMutations('Router', {
		delTags: 'DEL_TAGS',
		delTag: 'DEL_TAG',
	  }),

	  openMenu(tag, offset) {
		this.selectTag = tag
		this.show = true
		this.transform = `translateX(${offset}px)`
	  },
	  closeTag() {
		this.delTag(this.selectTag)
	  },
	  closeOther() {
		let tags = this.visitedRoutes.filter(it => it.fullPath.toLowerCase() !== this.selectTag.fullPath.toLowerCase())
		this.delTags(tags)
	  },
	  closeAll() {
		this.delTags(this.visitedRoutes)
	  },
	  closeRight() {
		let index = this.visitedRoutes.findIndex(it => it.fullPath.toLowerCase() === this.selectTag.fullPath.toLowerCase())
		let tags = this.visitedRoutes.slice(index + 1)
		this.delTags(tags)
	  },
	  closeMenu() {
		this.show = false
		this.selectTag = null
	  },

	  isLasted() {
		if (!this.selectTag) return false
		return this.visitedRoutes.slice(-1)[0].fullPath.toLowerCase() === this.selectTag.fullPath.toLowerCase()
	  },
	},
	computed: {
	  ...mapState('Router', [
		'visitedRoutes',
		'tagCache',
	  ]),
	},
	watch: {
	  show(value) {
		if (value) {
		  document.body.addEventListener('click', this.closeMenu)
		}
		else {
		  document.body.removeEventListener('click', this.closeMenu)
		}
	  },
	},
  }
</script>

<style lang="less" rel="stylesheet/less">
  @import "../../styles/variable";

  .close-menu {
    margin: 0;
    background: #fff;
    z-index: 100;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    .shadow;

    li {
      margin: 0;
      padding: 7px 16px;

      &:not(.disabled) {
        cursor: pointer;

        &:hover {
          background: #eee;
        }
      }

      &.disabled {
        cursor: not-allowed;
        color: #999;
      }
    }
  }
</style>
