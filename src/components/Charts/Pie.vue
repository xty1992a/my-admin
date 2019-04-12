<template>
  <div class="charts-pie">
  </div>
</template>

<script>
  import echarts from 'echarts'
  import EleResize from '@/utils/resizeListener'

  export default {
	name: 'charts-pie',
	props: {
	  data: {
		type: Object,
	  },
	  title: {
		type: String,
		default: '饼图',
	  },
	},
	components: {},
	data() {
	  return {
		chart: {},    // echarts对象容器
	  }
	},
	mounted() {
	  this.initPie()
	  this.listenResize()
	},
	methods: {
	  initPie() {
		let pie = this.$el
		let data = this.data
		if (pie) {
		  this.chart = echarts.init(pie)
		  let seriesData = data.list.map(it => ({
			value: it.value,
			name: it.name,
			itemStyle: {
			  normal: {
				color: it.color,
			  },
			},
		  })).sort((a, b) => a.value - b.value)
		  let option = {
			tooltip: {
			  trigger: 'item',
			  formatter: '{a} {b}: {c} ({d}%)',
			},
			grid: {
			  top: 40,
			  left: '9%',
			  right: '9%',
			  bottom: 40,
			},
			series: [
			  {
				roseType: 'radius',
				name: this.title,
				type: 'pie',
				radius: '70%',
				center: ['50%', '50%'],
				label: {
				  normal: {
					formatter: ({percent}) => percent + '%',
					color: '#2c343c',
				  },
				},
				labelLine: {
				  show: true,
				  normal: {
					lineStyle: {
					  color: '#2c343c',
					},
					smooth: 0.2,
					length: 10,
					length2: 20,
				  },
				},
				data: seriesData,
			  },
			],
		  }
		  this.chart.setOption(option)
		}
	  },
	  listenResize() {
		EleResize.on(this.$el, this.resize)
	  },

	  resize() {
		clearTimeout(this.time)
		this.time = setTimeout(() => {
		  this.chart.resize && this.chart.resize()
		}, 300)
	  },
	},
	beforeDestroy() {
	  EleResize.off(this.$el, this.resize)
	},
	computed: {},
	watch: {
	  data: {
		handler(now, old) {
		  this.initPie()
		}, deep: true,
	  },
	},
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>

  .charts-pie {
    height: 100%;
  }
</style>
