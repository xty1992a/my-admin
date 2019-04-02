<template>
  <div class="route-tags">
    <RowScroller>
      <ul class="tag-list">
        <router-link
                v-for="tag in visitedRoutes"
                class="tag-item hover-border"
                :class="tag.fullPath.toLowerCase()===$route.fullPath.toLowerCase()?'active':''"
                :to="tag.fullPath"
                :key="tag.fullPath">
          <span>{{tag.meta.title}}</span>
          <span class="tag-close-btn" @click.prevent.stop="closeTag(tag)">
            <svg-icon icon="delete"/>
          </span>
        </router-link>
      </ul>
    </RowScroller>
  </div>
</template>

<script>
  import RowScroller from '@/components/RowScroller'
  import {mapState, mapGetters} from 'vuex'

  export default {
	name: 'RouteTags',
	components: {RowScroller},
	data() {
	  return {}
	},
	created() {
	},
	methods: {
	  closeTag(tag) {
		this.$store.commit('Router/DEL_TAG', tag)
		const latestView = this.visitedRoutes.slice(-1)[0]
		console.log(this.visitedRoutes.map(it => it.meta.title))
		if (latestView) {
		  this.$router.push(latestView.path)
		}
		else {
		  this.$router.push('/')
		}
	  },
	},
	computed: {
	  ...mapState('Router', [
		'visitedRoutes',
	  ]),
	},
	watch: {
	  $route: {
		handler(now) {
		  console.log(now)
		  this.$store.commit('Router/ADD_TAG', now)
		}, immediate: true,
	  },
	},
  }
</script>

<style lang="less" rel="stylesheet/less">

  .route-tags {
    height: 40px;
    padding-left: 10px;

    .tag-list {
      white-space: nowrap;

      .tag-item {
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
