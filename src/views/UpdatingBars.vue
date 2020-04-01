<template>
  <div>
    <h1 class="text-center text-purple-500 text-xl my-10">
      Updating Bars via Vue Reactivity
    </h1>
    <div class="flex justify-center">
      <svg
        viewBox="0 0 846 846"
        class="w-1/3 h-1/3 border border-grey-100 border-solid"
      >
        <template v-for="(item, index) in vizData">
          <text :key="index + 'text'" x="15" :y="(index + 1) * 71">
            {{ item.name }}
          </text>
          <rect
            :key="index + 'rect'"
            x="65"
            :y="(index + 1) * 71 - 14"
            :width="item.data * 750"
            height="16"
            :fill="getBarColor()"
          />
        </template>
      </svg>
    </div>
    <div class="flex justify-center mt-5">
      <table class="table-fixed border border-solid border-grey-500">
        <thead>
          <tr>
            <th class="p-3 border border-solid border-grey-500">Bar</th>
            <th class="p-3 border border-solid border-grey-500">Data</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in vizData" :key="index + '_tr'" class="">
            <td class="border border-solid border-grey-500 text-center">
              {{ item.name }}
            </td>
            <td class="border border-solid border-grey-500 text-center">
              {{ item.data.toFixed(3) }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import color from 'color'

const rgb = () => Math.round(255 * Math.random())

export default {
  data() {
    return {
      vizData: [
        { name: 'Bar1', data: Math.random() },
        { name: 'Bar2', data: Math.random() },
        { name: 'Bar3', data: Math.random() },
        { name: 'Bar4', data: Math.random() },
        { name: 'Bar5', data: Math.random() },
        { name: 'Bar6', data: Math.random() },
        { name: 'Bar7', data: Math.random() },
        { name: 'Bar8', data: Math.random() },
        { name: 'Bar9', data: Math.random() },
        { name: 'Bar10', data: Math.random() },
        { name: 'BarX', data: 1 },
      ],
    }
  },
  mounted() {
    setInterval(() => {
      for (let i = 0; i < this.vizData.length - 1; i++)
        this.vizData[i].data = Math.random()
    }, 1000)
  },
  methods: {
    getBarColor() {
      return color(`rgb(${rgb()}, ${rgb()}, ${rgb()})`)
        .rgb()
        .string()
    },
  },
}
</script>
