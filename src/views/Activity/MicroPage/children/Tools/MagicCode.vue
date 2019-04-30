<template>
  <div class="magic-code">
    <div class="row">
      <div class="row-label">
        <span>模板选择</span>
      </div>
      <div class="row-body">
        <CodeModePicker
          :value="data.data.mode"
          @input="modeChange"
          :options="modeList"
        />
      </div>
    </div>
    <div class="row">
      <div class="row-label">
        <span>区域布置</span>
      </div>
      <div class="row-body">
        <CodeEditor
          v-if="codeOption"
          :can-delete="data.data.mode === 6"
          :row="codeOption.row"
          :col="codeOption.col"
          :size="codeOption.size"
          :gap.sync="data.data.gap"
          :value="data.data.map"
          @input="codeUpdate"
          :ratio="0.36"
        />
      </div>
    </div>
  </div>
</template>

<script>
import CodeModePicker from "./CodeEditor/CodeModePicker";
import CodeEditor from "./CodeEditor/index";

const copy = data => JSON.parse(JSON.stringify(data));
const random = () =>
  Math.random()
    .toString(36)
    .substr(2, 15);
// 模板选择的默认模板
const optionModel = JSON.stringify([
  null,
  {
    map: [
      {
        x: 0,
        y: 0,
        h: 1,
        w: 0.5,
        cellID: [0],
        key: random(),
        path: "",
        href: ""
      },
      {
        x: 0.5,
        y: 0,
        h: 1,
        w: 0.5,
        cellID: [1],
        key: random(),
        path: "",
        href: ""
      }
    ],
    row: 1,
    col: 2,
    size: 375
  },
  {
    map: [
      {
        x: 0,
        y: 0,
        h: 1,
        w: 0.333,
        cellID: [0],
        key: random(),
        path: "",
        href: ""
      },
      {
        x: 0.333,
        y: 0,
        h: 1,
        w: 0.333,
        cellID: [1],
        key: random(),
        path: "",
        href: ""
      },
      {
        x: 0.666,
        y: 0,
        h: 1,
        w: 0.333,
        cellID: [2],
        key: random(),
        path: "",
        href: ""
      }
    ],
    row: 1,
    col: 3,
    size: 250
  },
  {
    map: [
      {
        x: 0,
        y: 0,
        h: 1,
        w: 0.25,
        cellID: [0],
        key: random(),
        path: "",
        href: ""
      },
      {
        x: 0.25,
        y: 0,
        h: 1,
        w: 0.25,
        cellID: [1],
        key: random(),
        path: "",
        href: ""
      },
      {
        x: 0.5,
        y: 0,
        h: 1,
        w: 0.25,
        cellID: [2],
        key: random(),
        path: "",
        href: ""
      },
      {
        x: 0.75,
        y: 0,
        h: 1,
        w: 0.25,
        cellID: [3],
        key: random(),
        path: "",
        href: ""
      }
    ],
    row: 1,
    col: 4,
    size: 187.5
  },
  {
    map: [
      {
        x: 0,
        y: 0,
        h: 1,
        w: 0.5,
        cellID: [0, 2],
        key: random(),
        path: "",
        href: ""
      },
      {
        x: 0.5,
        y: 0,
        h: 0.5,
        w: 0.5,
        cellID: [1],
        key: random(),
        path: "",
        href: ""
      },
      {
        x: 0.5,
        y: 0.5,
        h: 0.5,
        w: 0.5,
        cellID: [3],
        key: random(),
        path: "",
        href: ""
      }
    ],
    row: 2,
    col: 2,
    size: 375
  },
  {
    map: [
      {
        x: 0.5,
        y: 0,
        h: 0.5,
        w: 0.5,
        cellID: [2, 3],
        key: random(),
        path: "",
        href: ""
      },
      {
        x: 0.5,
        y: 0.5,
        h: 0.5,
        w: 0.25,
        cellID: [6],
        key: random(),
        path: "",
        href: ""
      },
      {
        x: 0.75,
        y: 0.5,
        h: 0.5,
        w: 0.25,
        cellID: [7],
        key: random(),
        path: "",
        href: ""
      },
      {
        x: 0,
        y: 0,
        h: 1,
        w: 0.5,
        cellID: [0, 1, 4, 5],
        key: random(),
        path: "",
        href: ""
      }
    ],
    row: 2,
    col: 4,
    size: 187.5
  },
  {
    map: [],
    row: 4,
    col: 4,
    size: 187.5
  }
]);

export default {
  name: "MagicCode",
  components: { CodeEditor, CodeModePicker },
  props: {
    data: Object,
    edit: Function
  },
  data() {
    return {
      modeList: [
        { label: "1行2个", value: 1 },
        { label: "1行3个", value: 2 },
        { label: "1行4个", value: 3 },
        { label: "1左2右", value: 4 },
        { label: "1左3右", value: 5 },
        { label: "自定义", value: 6 }
      ],
      modeValue: 6,
      codeOptions: []
    };
  },
  created() {},
  methods: {
    // 切换mode,更新Component
    modeChange(index) {
      // this.modeValue = index
      let newData = {
        ...this.data,
        data: { ...this.data.data, ...this.codeOptions[index], mode: index }
      };
      this.edit && this.edit(newData);
    },

    codeUpdate(map) {
      this.edit &&
        this.edit({ ...this.data, data: { ...this.data.data, map } });
    },
    mergeOptionWithData() {
      // 魔方模板
      if (!this.data) return;
      let options = JSON.parse(optionModel);
      options.forEach((it, index) => {
        if (index === this.data.data.mode) {
          let data = copy(this.data.data);
          Object.keys(it).forEach(k => {
            it[k] = data[k];
          });
        }
      });
      return options;
    }
  },
  computed: {
    codeOption() {
      return this.codeOptions[this.data.data.mode];
    }
  },
  watch: {
    "data.key": {
      handler() {
        this.codeOptions = this.mergeOptionWithData();
      },
      immediate: true
    }
  }
};
</script>

<style lang="less" rel="stylesheet/less">
.magic-code {
  padding-top: 10px;

  .row {
    margin-bottom: 10px;
    display: flex;

    .row-label {
      width: 75px;
    }
  }

  .ranger-wrap {
    width: 220px;
    padding-top: 5px;
  }
}
</style>
