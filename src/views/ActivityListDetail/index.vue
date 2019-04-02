<template>
  <div class="activity-list-detail">
    <p>this is activity {{$route.params.activity_id}}</p>
  </div>
</template>

<script>
  export default {
	name: 'ActivityListDetail',
	components: {},
	data() {
	  return {}
	},
	created() {
	  this.setTagTitle()
	},
	methods: {
	  setTagTitle() {
		this.$store.commit('Router/UPDATE_TAG_CACHE', {
		  key: this.$route.fullPath,
		  data: {
			title: '活动--' + this.$route.params.activity_id,
		  },
		})
	  },
	},
	computed: {},
  }
</script>

<style lang="less" rel="stylesheet/less">

  .activity-detail {
  }
</style>
