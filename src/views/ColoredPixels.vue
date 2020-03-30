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
          :fill="squareColor[row - 1][col - 1]"
        />
      </g>
    </svg>
  </div>
</template>

<script>
import color from 'color'

export default {
  name: 'ColoredPixels',
  data() {
    return {
      numRows: 0,
      numColumns: 0,
      squareEdge: 10,
      squareColor: [[]],
    }
  },
  mounted() {
    this.getNumOfRowColumn()
    this.getSquareColor()
  },
  methods: {
    getNumOfRowColumn() {
      const rootWidth = this.$refs.root.offsetWidth
      const rootHeight = this.$refs.root.offsetHeight

      this.numColumns = Math.ceil(rootWidth / this.squareEdge)
      this.numRows = Math.ceil(rootHeight / this.squareEdge)
    },
    getSquareColor() {
      const vm = this
      function getRgbSingleValue() {
        return Math.round(255 * Math.random())
      }
      function randomColor() {
        for (let row = 0; row < vm.numRows; row++) {
          vm.squareColor[row] = []
          for (let col = 0; col < vm.numColumns; col++) {
            vm.squareColor[row][col] = color(`rgb(${getRgbSingleValue()},
                            ${getRgbSingleValue()},
                            ${getRgbSingleValue()})`)
              .rgb()
              .string()
          }
        }
        vm.$forceUpdate()
      }

      randomColor()
      setInterval(function() {
        randomColor()
      }, 2000)
    },
  },
}
</script>
