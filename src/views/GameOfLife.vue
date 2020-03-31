<template>
  <div>
    <!-- title -->
    <div class="flex justify-center mt-5">
      <h1 class="text-xl text-green-600">
        Conway's Game of Life
      </h1>
      <a
        class="ml-2 flex"
        href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life"
        target="_blank"
      >
        <Link class="w-5 h-5 m-auto fill-current text-green-300" />
      </a>
    </div>
    <!-- board -->
    <div class="flex justify-center my-5">
      <table>
        <tr v-for="r in rows" :key="r">
          <td
            class="w-3 h-3 border border-solid border-gray-400 cursor-pointer"
            v-for="c in cols"
            :key="c"
            @click="toggleCell(r - 1, c - 1)"
            :class="game[r - 1][c - 1] ? 'bg-green-500' : null"
          ></td>
        </tr>
      </table>
    </div>
    <!-- controls -->
    <div class="flex justify-center">
      <input
        class="w-16 border border-gray-300 rounded mr-1 text-center"
        placeholder="rows"
        v-model.number="rows"
        :disabled="controlDisabled"
      />
      x
      <input
        class="w-16 border border-gray-400 rounded ml-1 text-center"
        placeholder="columns"
        v-model.number="cols"
        :disabled="controlDisabled"
      />
      <button
        class="ml-2 bg-transparent hover:bg-green-500 text-green-600 hover:text-white px-2 border border-green-500 hover:border-transparent rounded"
        @click="gameStart()"
        :disabled="controlDisabled"
        :class="controlDisabled ? 'opacity-50 cursor-not-allowed' : null"
        :title="
          controlDisabled ? `more than ${limit} cells will be lagging` : null
        "
      >
        {{ startButtonText }}
      </button>
      <button
        class="ml-2 bg-transparent hover:bg-green-500 text-green-600 hover:text-white px-2 border border-green-500 hover:border-transparent rounded"
        @click="gameClear"
      >
        Clear
      </button>
      <button
        class="ml-2 bg-transparent hover:bg-green-500 text-green-600 hover:text-white px-2 border border-green-500 hover:border-transparent rounded"
        @click="randomGame"
      >
        Random
      </button>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'

import Link from '../components/icons/Link.vue'

export default {
  name: 'GameOfLife',
  components: { Link },
  data() {
    return {
      rows: 50,
      cols: 50,
      limit: 3600,
      started: false,
      paused: false,
      startButtonText: 'Start',
      game: [],
      timer: null,
    }
  },
  created() {
    this.game = new Array(this.rows).fill(new Array(this.cols))
    this.$watch(
      vm => [vm.rows, vm.cols],
      () => (this.game = new Array(this.rows).fill(new Array(this.cols))),
      {
        immediate: true,
      },
    )
  },
  computed: {
    controlDisabled() {
      return this.rows * this.cols > this.limit
    },
  },
  methods: {
    gameStart() {
      if (this.started === false && this.paused === false) {
        const tempGame = _.cloneDeep(this.game)
        for (let i = 0; i < this.rows; i++) {
          if (!tempGame[i]) tempGame[i] = []
          for (let j = 0; j < this.cols; j++) {
            tempGame[i][j] ? null : (tempGame[i][j] = 0)
          }
        }
        this.game = tempGame
        this.started = true
        this.startButtonText = 'Pause'
        this.play()
      } else if (this.started === true && this.paused === false) {
        this.paused = true
        this.startButtonText = 'Continue'
        clearInterval(this.timer)
      } else if (this.started === true && this.paused === true) {
        this.paused = false
        this.startButtonText = 'Pause'
        this.play()
      }
    },
    play() {
      const calc = () => {
        const clone = _.cloneDeep(this.game)
        for (let i = 0; i < this.rows; i++) {
          for (let j = 0; j < this.cols; j++) {
            applyRules(this.game, i, j, this.rows, this.cols, clone)
          }
        }
        this.game = clone
      }
      this.timer = setInterval(calc, 150)
    },
    gameClear() {
      clearInterval(this.timer)
      this.startButtonText = 'Start'
      this.started = false
      this.paused = false
      this.game = new Array(this.rows).fill(new Array(this.cols))
    },
    randomGame() {
      this.gameClear()
      const tempGame = []
      for (let i = 0; i < this.rows; i++) {
        tempGame[i] = []
        for (let j = 0; j < this.cols; j++) {
          if (Math.random() < 0.1) {
            tempGame[i][j] = 1
          } else {
            tempGame[i][j] = 0
          }
        }
      }
      this.game = tempGame
    },
    toggleCell(i, j) {
      const tempGame = _.cloneDeep(this.game)
      if (!tempGame[i]) tempGame[i] = []
      tempGame[i][j] ? (tempGame[i][j] = 0) : (tempGame[i][j] = 1)
      this.game = tempGame
    },
  },
}

// GAME RULES
// Any live cell with fewer than two live neighbours dies, as if caused by under-population.
// Any live cell with two or three live neighbours lives on to the next generation.
// Any live cell with more than three live neighbours dies, as if by overcrowding.
// Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
function applyRules(grid, row, col, rows, cols, gridClone) {
  const numNeighbors = countNeighbors(grid, row, col, rows, cols)
  if (grid[row][col] === 1) {
    if (numNeighbors < 2) {
      gridClone[row][col] = 0
    } else if (numNeighbors === 2 || numNeighbors === 3) {
      gridClone[row][col] = 1
    } else if (numNeighbors > 3) {
      gridClone[row][col] = 0
    }
  } else if (grid[row][col] === 0) {
    if (numNeighbors === 3) {
      gridClone[row][col] = 1
    }
  }
}

function countNeighbors(grid, row, col, rows, cols) {
  let count = 0
  if (row - 1 >= 0) {
    if (grid[row - 1][col] === 1) count++
  }
  if (row - 1 >= 0 && col - 1 >= 0) {
    if (grid[row - 1][col - 1] === 1) count++
  }
  if (row - 1 >= 0 && col + 1 < cols) {
    if (grid[row - 1][col + 1] === 1) count++
  }
  if (col - 1 >= 0) {
    if (grid[row][col - 1] === 1) count++
  }
  if (col + 1 < cols) {
    if (grid[row][col + 1] === 1) count++
  }
  if (row + 1 < rows) {
    if (grid[row + 1][col] === 1) count++
  }
  if (row + 1 < rows && col - 1 >= 0) {
    if (grid[row + 1][col - 1] === 1) count++
  }
  if (row + 1 < rows && col + 1 < cols) {
    if (grid[row + 1][col + 1] === 1) count++
  }
  return count
}
</script>
