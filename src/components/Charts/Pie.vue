<template>
  <div class="charts-pie">
    <div class="pie" ref="pie"></div>
  </div>
</template>

<script>
  import echarts from 'echarts'
  export default {
	name: 'charts-pie',
	props: {
	  data: {
		type: Object
	  },
	  title: {
		type: String,
		default: '饼图'
	  }
	},
	components: {},
	data() {
	  return {
		chart: {},    // echarts对象容器
	  }
	},
	mounted() {
	  this.initPie()
	},
	methods: {
	  initPie() {
		let pie = this.$refs.pie
		let data = this.data
		if (pie) {
		  this.chart.pie = echarts.init(pie)
		  let seriesData = data.list.map(it => ({
			value: it.value,
			name: it.name,
			itemStyle: {
			  normal: {
				color: it.color
			  }
			}
		  }))
		  let option = {
			color: ['#4CA1FE', '#FEBE3A'],
			tooltip: {
			  trigger: 'item',
			  formatter: "{a} {b}: {c} ({d}%)",
			  textStyle: {
				fontSize: 14
			  }
			},
			grid: {
			  top: 40,
			  left: '9%',
			  right: '9%',
			  bottom: 40
			},
			series: [
			  {
				name: this.title,
				type: 'pie',
				radius: ['55%', '80%'],
				avoidLabelOverlap: false,
				label: {
				  normal: {
					formatter: ({percent}) => percent + '%',
					color: '#999'
				  },
				},
				labelLine: {
				  show: true,
				  normal: {
					lineStyle: {
					  color: 'rgba(0, 0, 0, 0.3)'
					},
					smooth: 0.2,
					length: 10,
					length2: 20
				  }
				},
				data: seriesData
			  }
			]
		  }
		  this.chart.pie.setOption(option)
		}
	  },
	},
	computed: {},
	watch: {
	  data: {
		handler(now, old) {
		  this.initPie()
		}, deep: true
	  }
	}
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>

  .charts-pie {
    height: 100%;
    .pie {
      height: 100%;
    }
  }
</style>
