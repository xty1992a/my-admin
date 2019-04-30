<template>
  <div class="code-editor">
    <Layout
      v-bind="{ canDelete, row, col, size, ratio, gap }"
      :value="value"
      @input="p => $emit('input', p)"
      @edit="k => (currentCodeKey = k)"
    />
    <el-form style=" margin-top: 15px;" label-width="75px">
      <el-form-item label="编辑图片">
        <el-button
          :disabled="!Boolean(currentCodeKey)"
          @click="callImageCropper"
          >添加图片</el-button
        >
      </el-form-item>
      <!--      <el-form-item label="链接">
            <el-input type="text" v-model="linkUrl" :disabled="!currentCodeKey" placeholder="请输入链接[选填]"/>
            </el-form-item>-->
      <el-form-item label="区间间隙">
        <el-slider
          :value="gap"
          @input="v => $emit('update:gap', v)"
          :max="10"
        ></el-slider>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Layout from "./Layout";
import ImageUploader from "@redbuck/image-uploader";
import "@redbuck/image-uploader/lib/imageUploader.css";
import * as API from "@/api";

export default {
  name: "code-editor",
  components: { Layout },
  props: {
    value: {
      type: Array,
      required: true,
      validator: list =>
        list.every(o =>
          ["x", "y", "w", "h", "cellID"].every(k => o.hasOwnProperty(k))
        )
    },
    canDelete: {
      type: Boolean
    },
    gap: {
      type: Number,
      default: 0
    },
    col: {
      // 列数
      type: Number,
      default: 4
    },
    row: {
      type: Number,
      default: 4
    },
    size: {
      // 单位格子的尺寸
      type: Number,
      default: 187.5
    },
    ratio: {
      // 编辑尺寸与使用尺寸.
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      currentCodeKey: "" // 当前所编辑code的key.
    };
  },
  mounted() {
    this.createUploader();
  },
  methods: {
    createUploader() {
      this.uploader = new ImageUploader({
        width: 100,
        height: 100,
        blob: true,
        uploadUrl: "http://up-z2.qiniup.com",
        async getFormDataAsync(callback) {
          let res = await API.getQiNiuToken();
          callback(res.success ? res.data : {});
        },
        fileName: "file"
      });

      this.uploader.on("upload", res => {
        console.log(res.data.path);
        this.upDateCode({ ...this.currentCode, path: res.data.path });
      });
    },

    callImageCropper() {
      this.freshUploader();
      this.uploader && this.uploader.showCropper();
    },

    upDateCode(item) {
      let rest = this.value.filter(it => it.key !== item.key);
      this.$emit("input", [...rest, JSON.parse(JSON.stringify(item))]);
    },

    freshUploader() {
      let code = this.currentCode;
      if (!code) return;
      let { w, h } = code;
      let width = w * this.size * this.col;
      let height = h * this.size * this.row;
      this.uploader && this.uploader.changeCropSize({ width, height });
    }
  },
  computed: {
    currentCode() {
      if (!this.value || !this.currentCodeKey) return null;
      return this.value.find(it => it.key === this.currentCodeKey);
    },
    linkUrl: {
      get() {
        return this.currentCode ? this.currentCode.href : 0;
      },
      set(v) {
        this.upDateCode({ ...this.currentCode, href: v });
      }
    }
  },
  watch: {
    currentCodeKey(now) {
      // this.freshUploader()
    }
  }
};
</script>

<style lang="less" rel="stylesheet/less">
.code-editor {
}
</style>
