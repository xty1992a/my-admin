<template>
  <ul class="magic-code" :style="wrapStyle">
    <li
      class="code-item"
      v-for="item in data.data.map"
      :key="item.key"
      :style="getStyle(item)"
    >
      <img :src="item.path" alt="" v-if="item.path" />
    </li>
  </ul>
</template>

<script>
export default {
  name: "MagicCode",
  components: {},
  props: {
    data: {
      type: Object
    }
  },
  data() {
    return {
      ratio: 0.5
    };
  },
  created() {},
  methods: {
    getStyle({ x, y, w, h }) {
      let { w: width, h: height } = this.wrapRect;
      return {
        padding: (this.data.data.gap / 2) * this.ratio + "px",
        top: y * height + "px",
        left: x * width + "px",
        width: w * width + "px",
        height: h * height + "px"
      };
    }
  },
  computed: {
    wrapStyle() {
      let { w, h } = this.wrapRect;
      return {
        height: h + "px",
        width: w + "px"
      };
    },
    wrapRect() {
      return {
        w: this.data.data.size * this.data.data.col * this.ratio,
        h: this.data.data.size * this.data.data.row * this.ratio
      };
    }
  }
};
</script>

<style lang="less" rel="stylesheet/less">
.magic-code {
  position: relative;

  .code-item {
    position: absolute;
    background-color: #e8f7fd;
    box-shadow: 0 0 1px #a6e1fe;
    background-clip: content-box;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
