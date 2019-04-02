<template>
  <div class="charts-linear"></div>
</template>

<script>
  import echarts from 'echarts'
  import Common from './Common'

  export default {
	name: 'ChartsLinear',
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
		let series = this.data.list.map((it, index) => ({
		  name: this.data.labels[index],
		  type: 'line',
		  data: it,
		  lineStyle: {color: this.data.colors[index]},
		  areaStyle: {
			normal: {
			  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
				{offset: 0, color: this.data.colors[index]},
				{offset: 1, color: '#fff'},
			  ]),
			},
		  },
		  smooth: true,
		  label: {show: true},
		}))
		return {
		  ...this.defaultOptions,
		  tooltip: {
			trigger: 'axis',
			axisPointer: {
			  type: 'cross',
			},
			padding: 10,
			formatter: (params) => {
			  let val = params.find(it => it.data !== '-')
			  return `${val.name}<br/>${val.seriesName}:${val.data}`
			},
		  },
		  xAxis: {
			type: 'category',
			boundaryGap: false,
			data: this.data.xAxis,
			axisLine: {
			  lineStyle: {
				color: '#EBEEF5',
			  },
			},
			axisLabel: {
			  color: '#909399',
			},
		  },
		  yAxis: {
			type: 'value',
			axisLabel: {
			  formatter: '{value}',
			  color: '#999',
			},
			axisLine: {
			  lineStyle: {
				color: '#EBEEF5',
			  },
			},
			axisPointer: {
			  snap: true,
			},
		  },
		  series,
		}
	  },
	},
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>

  .charts-linear {
    height: 350px;
  }
</style>
