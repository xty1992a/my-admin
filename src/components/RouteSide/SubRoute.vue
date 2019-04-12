<template>
  <component :is="componentName" :index="routePath">

    <!--有子级路由-->
    <template v-if="route.hasOwnProperty('children') && route.children.length">

      <!--只有一个子级路由-->
      <template v-if="route.children.length ===1&&single" slot="title">
        <svg-icon :icon="route.children[0].meta.icon" v-if="route.children[0].meta.icon"/>
        <span style="padding-left: 10px;">{{route.children[0].meta.title}}</span>
      </template>

      <!--复数子级路由-->
      <template v-else>
        <template slot="title">
          <svg-icon :icon="route.meta.icon" v-if="route.meta.icon"/>
          <span style="padding-left: 10px;">{{route.meta.title}}</span>
        </template>
        <el-menu-item-group>
          <!--递归子级路由-->
          <SubRoute v-for="child in route.children" :key="child.name" :route="child" :path="route.path" :single="single"/>
        </el-menu-item-group>
      </template>

    </template>

    <!--叶子路由-->
    <template v-else>
      <svg-icon :icon="route.meta.icon" v-if="route.meta.icon"/>
      <span style="padding-left: 10px;">{{route.meta.title}}</span>
    </template>

  </component>
</template>

<script>
  export default {
	name: 'SubRoute',
	components: {},
	props: {
	  route: Object,
	  path: String, // 父级path
	  single: Boolean, // 当父级路由只有一个子路由时,是否直接显示子路由
	},
	methods: {},
	computed: {
	  routePath() {
		let {path, route} = this

		if (route.children && route.children.length === 1 && this.single) {
		  return `${path}/${route.children[0].path}`.toLowerCase()
		}
		return `${path}/${route.path}`.toLowerCase()
	  },
	  asideShow() {
		return this.$store.state.App.asideShow
	  },
	  componentName() {
		let route = this.route
		if (route.children && route.children.length) {
		  return (route.children.length === 1 && this.single) ? 'el-menu-item' : 'el-submenu'
		}
		return 'el-menu-item'
	  },
	},
  }
</script>

<style lang="less" rel="stylesheet/less">

  .sub-route {
  }

  .el-menu-item-group__title {
    padding: 0;
  }
</style>
