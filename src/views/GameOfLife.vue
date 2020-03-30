<template>
  <div>
    <h1 class="text-center text-xl text-green-600 mt-5">
      Conway's Game of Life
    </h1>
    <div class="flex justify-center my-5">
      <table>
        <tr v-for="(row, i) in board" :key="i">
          <td
            class="w-2 h-2 border border-solid border-gray-500 cursor-pointer"
            v-for="(cell, j) in row"
            :key="j"
            @click="toggleCell(i, j)"
            :class="cell === 0 ? '' : 'bg-green-500'"
          ></td>
        </tr>
      </table>
    </div>

    <div class="flex justify-center">
      <input
        class="w-16 border border-gray-300 rounded mr-1 text-center"
        placeholder="rows"
        v-model.number="rows"
      />
      x
      <input
        class="w-16 border border-gray-300 rounded ml-1 text-center"
        placeholder="columns"
        v-model.number="cols"
      />
      <button
        class="ml-2 bg-transparent hover:bg-green-500 text-green-600 hover:text-white px-2 border border-green-500 hover:border-transparent rounded"
        @click="gameStart()"
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
export default {
  name: 'GameOfLife',
  data() {
    return {
      rows: 50,
      cols: 50,
      started: false,
      paused: false,
      startButtonText: 'Start',
      game: [],
    }
  },
  computed: {
    board() {
      const board = []
      for (let i = 0; i < this.rows; i++) {
        board[i] = []
        for (let j = 0; j < this.cols; j++) {
          if (this.game[i]) {
            board[i][j] = this.game[i][j] ? 1 : 0
          } else {
            board[i][j] = 0
          }
        }
      }
      return board
    },
  },
  methods: {
    gameStart() {
      if (this.started === false && this.paused === false) {
        this.started = true
        this.startButtonText = 'Pause'
      } else if (this.started === true && this.paused === false) {
        this.paused = true
        this.startButtonText = 'Continue'
      } else if (this.started === true && this.paused === true) {
        this.paused = false
        this.startButtonText = 'Pause'
      }
    },
    gameClear() {
      this.game = []
      this.started = false
      this.paused = false
      this.startButtonText = 'Start'
    },
    randomGame() {
      console.log('random game')
    },
    toggleCell(i, j) {
      if (!this.game[i]) {
        this.$set(this.game, i, [])
      }
      this.game[i][j]
        ? this.$set(this.game[i], j, 0)
        : this.$set(this.game[i], j, 1)
    },
  },
}
</script>
