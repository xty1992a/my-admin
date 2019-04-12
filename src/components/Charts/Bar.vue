<template>
  <div class="charts-bar"></div>
</template>

<script>
  import Common from './Common'

  export default {
	name: 'ChartsBar',
	mixins: [Common],
	props: {
	  data: {
		type: Object,
		required: true,
	  },
	  ellipsisLength: {
		type: Number,
		default: 4,
	  },
	},
	methods: {
	  getOption() {
		let series = this.data.series ? [{
		  data: this.data.series,
		  type: 'bar',
		}] : this.data.list.map(it => ({
		  name: it.name,
		  type: 'bar',
		  data: it.data,
		}))
		return {
		  ...this.defaultOptions,
		  barWidth: 20,
		  xAxis: {
			type: 'category',
			boundaryGap: true,
			data: this.data.xAxis,
			axisLine: {
			  lineStyle: {
				color: '#EBEEF5',
			  },
			},
			axisLabel: {
			  formatter: p => p.slice(0, this.ellipsisLength) + (p.length < this.ellipsisLength ? '' : '...'),
			  color: '#909399',
			},
		  },
		  series,
		}
	  },
	},
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>

  .charts-bar {
    height: 100%;
  }
</style>
