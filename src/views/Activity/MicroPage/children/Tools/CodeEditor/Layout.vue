<template>
  <div class="code-layout" :style="wrapStyle">
    <ul class="code-list">
      <li
        class="code-item"
        v-for="item in value"
        :key="item.key"
        :class="currentCode === item.key ? 'edit' : ''"
        :style="getStyle(item)"
        @click="editItem(item)"
      >
        <span
          class="close-btn"
          @click.stop="delItem(item)"
          v-if="canDelete"
        ></span>
        <img :src="item.path" alt="" v-if="item.path" />
        <p v-else>
          {{ displaySize(item.w * wrapRect.w) }} *
          {{ displaySize(item.h * wrapRect.h) }}
        </p>
      </li>
    </ul>
    <ul class="cell-list">
      <li
        class="cell-item"
        v-for="(item, index) in cellList"
        :key="index"
        :style="{ width: item.w + 'px', height: item.h + 'px' }"
        :class="getCellCLS(item)"
        @click="editCell(item)"
        @mouseenter="overCell(item)"
      >
        <span>+</span>
      </li>
    </ul>
  </div>
</template>

<script>
const random = () =>
  Math.random()
    .toString(36)
    .substr(2, 15);
/*
  组件所绑定的value是一个描述code(块)的json数组.
  块的底部,按照props绘制一个由cell(格子)组成的栅格.
  点击块,可以编辑块所绑定的path,修改图片,链接.
  点击格子,可以进入新建块的拉选模式,再次点击格子,可以新建一个拉选范围大小的新块.
  拉选模式时,如果越过一个被已有块占用的格子,拉选范围不会在增长.
  */
export default {
  name: "layout",
  components: {},
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
      currentCode: "",
      startCellKey: "", // 点击格子,鼠标所在格子的key.
      currentCellKey: "" // 点击格子,移动后鼠标所在格子的key.
    };
  },
  methods: {
    // 根据value布置元素
    getStyle({ x, y, w, h }) {
      let { w: width, h: height } = this.wrapRect;

      return {
        padding: (this.gap / 2) * this.ratio + "px",
        top: y * height + "px",
        left: x * width + "px",
        width: w * width + "px",
        height: h * height + "px"
      };
    },
    // 拉选覆盖范围
    getCellCLS(item) {
      return this.coverCell.map(i => i.key).includes(item.key) && "picked";
    },
    displaySize(size) {
      let displaySize = (size / this.ratio).toFixed(1);
      let float = +displaySize.split(".")[1];
      return float ? displaySize : displaySize.split(".")[0];
    },
    // 选择编辑块
    editItem(item) {
      if (this.currentCode === item.key) {
        this.currentCode = "";
      } else {
        this.currentCode = item.key;
      }
      this.$emit("edit", this.currentCode);
    },
    // 删除块
    delItem(item) {
      this.$emit("del", item.key);
      this.$emit("input", this.value.filter(i => i.key !== item.key));
      // 如果删除的code正好在编辑中,派发一个空的
      if (this.currentCode === item.key) {
        this.$emit("edit", "");
      }
    },
    // 编辑格子,开始/结束回调
    editCell(item) {
      // 开始
      if (this.startCellKey === "") {
        this.startCellKey = this.currentCellKey = item.key;
      }
      // 结束
      else {
        let newCode = { ...this.coverRect, key: random(), path: "", href: "" };
        console.log(newCode);
        this.$emit("input", [...this.value, newCode]);
        this.startCellKey = this.currentCellKey = "";
      }
    },
    overCell(item) {
      if (this.startCellKey === "") return; // 已选格子数组为空,未开始勾选
      if (!this.canOver(item)) return; // 检查能否继续覆盖该格子.
      this.currentCellKey = item.key;
    },
    // 检查这个格子与起始格子所覆盖的范围是否有已选格子.
    canOver(item) {
      let start = this.cellList.find(it => it.key === this.startCellKey);
      let now = this.cellList.find(it => it.key === item.key);
      // 用这个格子获取一个覆盖范围,检查范围内是否有已使用的格子.
      let willCoverRange = getCoverRange(start, now);
      let willCoverCellID = getCoverCell(willCoverRange)(this.cellList).map(
        it => it.key
      );
      return willCoverCellID.every(id => !this.usedCell.includes(id));
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
    cellList() {
      let { col, size, row, ratio } = this;
      let len = col * row;
      return [...Array(len)].map((n, i) => {
        return {
          col: i % col,
          row: Math.floor(i / col),
          w: size * ratio,
          h: size * ratio,
          key: i
        };
      });
    },

    // 由点击格子及移动之后产生的覆盖范围
    coverRange() {
      let start = this.cellList.find(it => it.key === this.startCellKey);
      let now = this.cellList.find(it => it.key === this.currentCellKey);
      return getCoverRange(start, now);
    },

    coverRect() {
      if (!this.coverRange) return null;
      let { minCol, maxCol, minRow, maxRow } = this.coverRange;
      let cellSize = this.size;
      let { w, h } = this.wrapRect;
      return {
        x: (minCol * cellSize * this.ratio) / w,
        y: (minRow * cellSize * this.ratio) / h,
        h: ((maxRow - minRow + 1) * cellSize * this.ratio) / h,
        w: ((maxCol - minCol + 1) * cellSize * this.ratio) / w,
        cellID: this.coverCell.map(it => it.key)
      };
    },

    coverCell() {
      return getCoverCell(this.coverRange)(this.cellList);
    },

    usedCell() {
      return this.value.reduce((p, n) => [...p, ...n.cellID], []);
    },

    wrapRect() {
      return {
        w: this.size * this.col * this.ratio,
        h: this.size * this.row * this.ratio
      };
    }
  }
};

// region helper

// 在两点拉选的范围中返回顶点坐标
function getCoverRange(start, now) {
  if (!start) return null;
  return {
    minCol: Math.min(start.col, now.col),
    maxCol: Math.max(start.col, now.col),
    minRow: Math.min(start.row, now.row),
    maxRow: Math.max(start.row, now.row)
  };
}

// 高阶函数,接受一个范围,返回一个函数,用于在数组中筛选出与范围重合的新数组
function getCoverCell(coverRange) {
  if (!coverRange) return () => [];
  let { minCol, maxCol, minRow, maxRow } = coverRange;
  return list =>
    list.filter(it => {
      // 一定没有被覆盖的情况
      let flag =
        it.col > maxCol ||
        it.col < minCol ||
        it.row > maxRow ||
        it.row < minRow;
      return !flag; // 取反即被覆盖的格子
    });
}

// endregion
</script>

<style lang="less" rel="stylesheet/less">
.code-layout {
  .code-list {
    position: relative;

    .code-item {
      position: absolute;
      background-color: #e8f7fd;
      box-shadow: 0 0 1px #a6e1fe;
      background-clip: content-box;
      display: flex;
      align-items: center;
      justify-content: center;

      p {
        color: #89c4fe;
        padding: 0 20px;
        text-align: center;
      }

      img {
        width: 100%;
        height: 100%;
      }

      &.edit {
        z-index: 1;
        box-shadow: 0 0 1px #2f6dfe;
      }

      &:hover {
        .close-btn {
          opacity: 1;
        }
      }

      .close-btn {
        z-index: 2;
        border-radius: 50%;
        position: absolute;
        font-size: 20px;
        width: 1em;
        height: 1em;
        background-color: #f44;
        top: -0.5em;
        right: -0.5em;
        transform: rotate(45deg);
        opacity: 0;
        cursor: pointer;

        &:before,
        &:after {
          content: "";
          position: absolute;
          bottom: 0.2em;
          top: 0.2em;
          background-color: #fff;
          width: 1px;
          left: 50%;
        }

        &:after {
          transform: rotate(90deg);
        }
      }
    }
  }

  .cell-list {
    display: flex;
    flex-wrap: wrap;
    user-select: none;

    .cell-item {
      box-shadow: 0 0 1px rgba(0, 0, 0, 0.1);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 30px;
      color: #999;

      &.picked {
        background-color: #e8f7fd;
      }
    }
  }
}
</style>
