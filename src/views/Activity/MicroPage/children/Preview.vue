<template>
  <div class="preview">
    <iframe
      :src="previewPath"
      frameborder="0"
      height="640"
      width="100%"
      ref="frame"
    ></iframe>
  </div>
</template>

<script>
export default {
  name: "Preview",
  components: {},
  props: {
    data: Array
  },
  data() {
    return {};
  },
  mounted() {
    this.$refs.frame.onload = () => {
      this.frame = this.$refs.frame.contentWindow || null;
    };
  },
  methods: {},
  computed: {
    previewPath() {
      return process.env.NODE_ENV === "development"
        ? "http://localhost:3001/mobile/#/MicroPage"
        : "/mobile/#/MicroPage";
    }
  },
  watch: {
    data: {
      handler(now) {
        if (!this.frame) return;
        this.frame.postMessage({ type: "data-change", data: now }, "*");
      },
      deep: true
    }
  }
};
</script>

<style lang="less" rel="stylesheet/less">
.preview {
  //.shadow;
  width: 360px;
  height: 640px;
  overflow: hidden;

  iframe {
    margin-right: -10px;
  }
}

.shadow {
  position: relative;

  &:after {
    content: "";
    position: absolute;
    bottom: 10px;
    right: 10px;
    top: 0;
    left: 0;
  }
}
</style>
