<template>
  <div class="charts-line"></div>
</template>

<script>
  import Common from './Common'

  export default {
	name: 'ChartsLine',
	mixins: [Common],
	props: {
	  data: {
		type: Object,
		required: true,
		validator: val => ['xAxis', 'list'].every(k => val.hasOwnProperty(k)),
	  },
	},
	methods: {
	  getOption() {
		let series = this.data.list.map(it => ({
		  name: it.name,
		  type: 'line',
		  data: it.data,
		}))
		return {
		  ...this.defaultOptions,
		  xAxis: {
			type: 'category',
			boundaryGap: true,
			data: this.data.xAxis,
			axisLabel: {
			  color: '#909399',
			},
			axisLine: {
			  lineStyle: {
				color: '#EBEEF5',
			  },
			},
		  },
		  series,
		}
	  },
	},
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>

  .charts-line {
    height: 350px;
  }
</style>
