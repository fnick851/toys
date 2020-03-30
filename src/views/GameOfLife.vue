<template>
  <div>
    <div class="flex justify-center">
      <table class="mb-5">
        <tr v-for="row in rows" :key="row">
          <td
            class="w-2 h-2 border border-solid border-gray-500"
            v-for="col in cols"
            :key="col"
          ></td>
        </tr>
      </table>
    </div>

    <div class="flex justify-center">
      <input
        class="w-16 border border-gray-300 rounded mr-1"
        placeholder="rows"
        v-model.number="rows"
      />
      x
      <input
        class="w-16 border border-gray-300 rounded ml-1"
        placeholder="columns"
        v-model.number="cols"
      />
      <button
        class="ml-2 bg-transparent hover:bg-blue-500 text-blue-700 hover:text-white px-2 border border-blue-500 hover:border-transparent rounded"
      >
        Start
      </button>
      <button
        class="ml-2 bg-transparent hover:bg-blue-500 text-blue-700 hover:text-white px-2 border border-blue-500 hover:border-transparent rounded"
      >
        Clear
      </button>
      <button
        class="ml-2 bg-transparent hover:bg-blue-500 text-blue-700 hover:text-white px-2 border border-blue-500 hover:border-transparent rounded"
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
      rows: 100,
      cols: 100,
      table: [],
    }
  },
}
</script>
