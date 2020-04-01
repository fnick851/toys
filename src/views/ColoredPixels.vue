<template>
  <div ref="root">
    <svg class="h-screen w-screen">
      <g
        v-for="row in numRows"
        :key="row + '_g_row'"
        :transform="
          'translate(' +
            -squareEdge / 2 +
            ',' +
            (squareEdge * (row - 1) - 5) +
            ')'
        "
      >
        <rect
          v-for="col in numColumns"
          :key="col + '_rect'"
          :x="squareEdge * (col - 0.5)"
          :y="squareEdge / 2"
          :width="squareEdge"
          :height="squareEdge"
          :fill="squareColors[row - 1][col - 1]"
        />
      </g>
    </svg>
  </div>
</template>

<script>
import color from 'color'

const rgb = () => Math.round(255 * Math.random())

export default {
  name: 'ColoredPixels',
  data() {
    return {
      numRows: null,
      numColumns: null,
      squareEdge: 10,
      squareColors: null,
    }
  },
  mounted() {
    const getNumOfRowColumn = () => {
      this.numColumns = Math.ceil(this.$refs.root.offsetWidth / this.squareEdge)
      this.numRows = Math.ceil(this.$refs.root.offsetHeight / this.squareEdge)
    }
    const genColors = () => {
      const tempColors = []
      for (let row = 0; row < this.numRows; row++) {
        tempColors[row] = []
        for (let col = 0; col < this.numColumns; col++) {
          tempColors[row][col] = color(`rgb(${rgb()},${rgb()},${rgb()})`)
            .rgb()
            .string()
        }
      }
      this.squareColors = tempColors
      setTimeout(this.genColors, 2000)
    }
    getNumOfRowColumn()
    genColors()
    window.onresize = () => {
      getNumOfRowColumn()
      genColors()
    }
  },
  beforeDestroy() {
    window.onresize = null
  },
}
</script>
