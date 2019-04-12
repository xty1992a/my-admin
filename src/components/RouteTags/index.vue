<template>
  <div class="route-tags">
    <div style="height: 40px;overflow: hidden;">
      <RowScroller ref="scroll" :speed="50">
        <ul class="tag-list" ref="list">
          <router-link
                  tag="li"
                  v-for="tag in visitedRoutes"
                  ref="link"
                  class="tag-item hover-border"
                  :class="tag.fullPath===$route.fullPath.toLowerCase()?'active':''"
                  :to="tag.fullPath"
                  :title="getTitle(tag)"
                  :key="tag.fullPath"
                  @click.right.prevent.native="openMenu(tag,$event)">
            <span>{{tag.meta.title}}</span>
            <span class="tag-close-btn" @click.prevent.stop="closeTag(tag)">
              <svg-icon icon="delete"/>
            </span>
          </router-link>
        </ul>
      </RowScroller>
    </div>
    <CloseMenu ref="close"/>
  </div>
</template>

<script>
  import CloseMenu from './CloseMenu'
  import RowScroller from '@/components/RowScroller'
  import {mapState, mapGetters} from 'vuex'

  export default {
	name: 'RouteTags',
	components: {RowScroller, CloseMenu},
	inject: ['reload'],
	methods: {
	  closeTag(tag) {
		this.$store.commit('Router/DEL_TAG', tag)
	  },
	  getTitle(route) {
		let key = route.fullPath.toLowerCase()
		let cache = this.tagCache.find(it => it.key === key)
		return cache && cache.data && cache.data.title
	  },
	  openMenu(tag, e) {
		let menu = this.$refs.close
		let offset = this.$el.getBoundingClientRect().left
		menu && menu.openMenu(tag, e.clientX - offset)
	  },

	  scrollToTag() {
		if (!this.$refs.link) return
		let el = [...this.$refs.link].find(it => it.to === this.$route.path)
		el && this.$refs.scroll.scrollToElement(el)
	  },

	  cacheTags() {
		this.$storage.setItem('vuex_cache_tagCache', this.tagCache)
		this.$storage.setItem('vuex_cache_visitedRoutes', this.visitedRoutes)
	  },
	},
	computed: {
	  ...mapState('Router', [
		'visitedRoutes',
		'tagCache',
	  ]),
	},
	watch: {
	  $route: {
		handler(now, old) {
		  console.log('change', now.fullPath)
		  if (old && old.path === now.path) {
			// 路由变化,但是path不变(如 /detail?user=1变为/detail?user=2),刷新页面
			this.reload && this.reload(10)
		  }
		  this.$store.commit('Router/ADD_TAG', now)
		  this.scrollToTag()
		}, immediate: true,
	  },
	  visitedRoutes(now, old) {
		console.log(now.length, old.length)
		if (now.length === 0) {
		  this.$store.commit('Router/ADD_TAG', this.$route)
		}
		else {
		  // 关闭标签,跳到最后一个标签
		  if (now.length < old.length) {
			const latestView = this.visitedRoutes.slice(-1)[0]
			this.$router.push(latestView.fullPath)
		  }
		}

		this.cacheTags()
	  },
	},
  }
</script>

<style lang="less" rel="stylesheet/less">

  .route-tags {
    position: relative;
    height: 40px;
    padding-left: 10px;
    user-select: none;

    .tag-list {
      white-space: nowrap;

      .sorter-holder {
        display: inline-block;
        vertical-align: middle;
      }

      .tag-item {
        vertical-align: middle;
        cursor: pointer;
        display: inline-block;
        line-height: 38px;
        padding: 0 15px;
        margin-right: 10px;
        min-width: 100px;
        padding-right: 20px;
        text-align: center;
      }

      .tag-close-btn {
        position: absolute;
        right: 5px;
        top: 50%;
        transform: translateY(-50%);

        &:hover {
          color: #f35c5c;
        }
      }

      .hover-border {
        @size: 2px;
        position: relative;
        transition: border-color .3s, color .3s, background-color .3s;
        border-top: @size solid #e3e3e3;

        &:after {
          content: '';
          height: @size;
          left: 0;
          right: 0;
          position: absolute;
          background-color: #ebeef5;
          top: -@size;
          transition: transform .2s;
          transform-origin: 0 100%;
          transform: scaleX(0);
        }

        &:hover {
          color: #808080;
          background-color: #f7f7f7;

          &:after {
            transform: scaleX(1);
            background-color: #3A3E4B;
          }
        }

        &.active {
          background-color: #F2F3F4;

          &:after {
            transform: scaleX(1);
            background-color: #3A3E4B;
          }
        }
      }
    }
  }
</style>
