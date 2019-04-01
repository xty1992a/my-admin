<template>
  <component :is="componentName" :index="routePath">
    <template v-if="route.hasOwnProperty('children') && route.children.length">
      <template slot="title">
        <svg-icon :icon="route.meta.icon" v-if="route.meta.icon"/>
        <span style="padding-left: 10px;">{{route.meta.title}}</span>
      </template>
      <el-menu-item-group>
        <SubRoute v-for="child in route.children" :key="child.name" :route="child" :path="route.path"/>
      </el-menu-item-group>
    </template>
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
	},
	data() {
	  return {}
	},
	created() {
	},
	methods: {},
	computed: {
	  routePath() {
		let {path, route} = this
		return `${path.toLowerCase()}/${route.path.toLowerCase()}`
	  },
	  asideShow() {
		return this.$store.state.App.asideShow
	  },
	  componentName() {
		let route = this.route
		return (route.hasOwnProperty('children') && route.children.length) ? 'el-submenu' : 'el-menu-item'
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
