<script setup lang="ts">
// 写得超级丑的一个表格
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
  if (col && col.render) {
    const res = col.render(value.row)
    // console.log(res)
    return h('td', { class: 'px-2 py-1' }, res)
  }
  return h('td', { class: 'px-2 py-1' }, value.cell)
}

const renderRow = (row: any, index: number) => {
  // debugger
  const cells: Cell[] = []
  globalProps.column.forEach((col: DataColumn) => {
    cells.push({
      cell: row[col.key],
      index: col.key,
      row,
    })
  })
  const res = cells.map(renderCell)
  return h(
    'tr',
    {
      class: index % 2 === 1
        ? 'bg-gray-100 dark:bg-gray-800'
        : '',
    },
    res,
  )
}

const renderBody = () => {
  const res = globalProps.data.map(renderRow)
  return h('tbody', {}, res)
}

const renderHeadCell = (col: DataColumn) => {
  return h(
    'th',
    {
      style: {
        width: col.width,
      },
      class: {
        'bg-gray-200 dark:bg-gray-700': true,
        'px-4': true,
        'py-2': true,
      },
    },
    col.label,
  )
}

const renderHead = () => {
  return h(
    'thead',
    {},
    globalProps.column.map(renderHeadCell),
  )
}

</script>

<template>
  <table
    v-if="data.length > 0"
    border-collapse
    w-full
    border="~ rounded gray-200"
  >
    <render-head />
    <render-body />
  </table>
  <div
    v-else
    border="~ rounded gray-200"
  >
    <div i-carbon-earth color="gray-500" text-8xl m-auto mt-20 />
    <div color="gray-500" mb-20>
      暂无数据
    </div>
  </div>
</template>

<style scoped>
</style>
