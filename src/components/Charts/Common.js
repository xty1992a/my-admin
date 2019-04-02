import EleResize from '@/utils/resizeListener'
import echarts from 'echarts'

export default {
  props: {
	toolbox: Boolean,
	color: {
	  type: [String, Array],
	  default: '#1890FF',
	},
	title: String,
	dashLine: Boolean,
	average: Boolean,
	zoom: Boolean,
	yUnit: {
	  type: String,
	  default: '',
	},
  },
  data() {
	return {
	  chart: null,
	  defaultOptions: {
		title: {
		  left: 'center',
		  text: this.title || '',
		  textStyle: {
			color: '#909399',
			fontSize: 14,
		  },
		},
		color: Array.isArray(this.color) ? this.color : [this.color],
		tooltip: {
		  trigger: 'axis',
		},
		toolbox: this.toolbox ? {
		  show: true,
		  feature: {
			dataZoom: {
			  yAxisIndex: 'none',
			},
			dataView: {readOnly: false},
			magicType: {type: ['line', 'bar']},
			restore: {},
			saveAsImage: {},
		  },
		} : null,
		grid: {
		  top: 50,
		  left: '50',
		  right: '50',
		  bottom: '50',
		  containLabel: true,
		},
		yAxis: {
		  symbol: 'arrow',
		  type: 'value',
		  axisLine: {
			show: true,
			lineStyle: {
			  color: '#EBEEF5',
			},
		  },
		  axisTick: {
			show: false,
		  },
		  axisLabel: {
			formatter: `{value}${this.yUnit}`,
			color: '#909399',
		  },
		  splitNumber: 5,
		  minInterval: 1,
		},
		dataZoom: this.zoom ? [
		  {
			show: true,
			start: 0,
			end: 100,
		  },
		  {
			type: 'inside',
			start: 0,
			end: 100,
		  },
		] : null,
	  },
	}
  },
  mounted() {
	this.initCharts()
	this.listenResize()
  },
  methods: {
	initCharts() {
	  this.chart = echarts.init(this.$el)
	  this.chart.setOption(this.fmtOption())
	},

	fmtOption() {
	  let option = this.getOption()
	  option.series && option.series.forEach(it => {
		if (this.average) {
		  it.markLine = {
			data: [{type: 'average', name: '平均值'}],
		  }
		}
		if (this.dashLine) {
		  it.lineStyle = {
			normal: {
			  type: 'dotted',
			  width: 1,
			},
		  }
		}
	  })
	  // console.log(this.$options.name, option)
	  return option
	},

	getOption() {
	  return this.defaultOptions
	},

	refresh() {
	  this.chart && this.chart.setOption(this.fmtOption())
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
  watch: {
	data() {
	  this.refresh()
	},
  },
}
