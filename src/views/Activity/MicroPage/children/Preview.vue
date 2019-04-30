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
      console.log("frame load");
      this.frame.postMessage({ type: "data-change", data: this.data }, "*");
    };
  },
  computed: {
    previewPath() {
      return "/mobile/#/MicroPage";
      return process.env.NODE_ENV === "development"
        ? "http://localhost:8081/#/MicroPage"
        : "/mobile/#/MicroPage";
    }
  },
  watch: {
    data: {
      handler(now) {
        // console.log(this.frame);
        if (!this.frame) return;
        this.frame.postMessage({ type: "data-change", data: now }, "*");
      },
      deep: true,
      immediate: true
    }
  }
};
</script>

<style lang="less" rel="stylesheet/less">
.preview {
  //.shadow;
  width: 377px;
  height: 667px;
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
