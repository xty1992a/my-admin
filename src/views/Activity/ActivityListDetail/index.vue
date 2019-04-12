<template>
  <div class="activity-list-detail page">
    <layout-block title="标题">
      <div class="content">
        <p>this is activity <b style="font-size: 24px;">{{$route.params.activity_id}}</b></p>
      </div>
    </layout-block>
  </div>
</template>

<script>
  import LayoutBlock from '@/components/LayoutBlock'

  export default {
	name: 'ActivityListDetail',
	components: {LayoutBlock},
	data() {
	  return {}
	},
	created() {
	  this.setTagTitle()
	},
	methods: {
	  setTagTitle() {
		this.$store.commit('Router/UPDATE_TAG_CACHE', {
		  key: this.$route.fullPath.toLowerCase(),
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

  .activity-list-detail {

    .content {
      padding: 20px;

      p {
        font-size: 18px;
      }
    }
  }
</style>
