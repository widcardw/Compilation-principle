<script setup lang="ts">
// 写得超级丑的一个表格
import { createTextVNode } from 'vue'
import type DataColumn from '~/types/DataColumn'

const globalProps = defineProps<{
  column: DataColumn[]
  data: any[]
}>()

interface Cell {
  cell: any
  index: string
  row: any
}

const renderCell = (value: Cell) => {
  const col = globalProps.column.filter((v: DataColumn) => {
    return v.key === value.index
  })[0]
  if (col.render) {
    const res = col.render(value.row)
    // console.log(res)
    return res
  }
  else {
    return createTextVNode(value.cell)
  }
}

</script>

<template>
  <table border-collapse w-full>
    <thead>
      <tr>
        <th
          v-for="(c, i) in column" :key="i" :style="{ width: c.width }"
          p="x-4 y-2" bg-gray-200 dark:bg-gray-700
        >
          {{ c.label }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(d, i) in data" :key="i" :class="i % 2 === 1 ? 'bg-gray-100 dark:bg-gray-800' : ''">
        <td v-for="(d2, j) in d" :key="j" p="x-4 y-2">
          <render-cell :cell="d2" :index="j" :row="d" />
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
</style>
