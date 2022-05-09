<script setup lang="ts">
import type { VNode } from 'vue'

const globalProps = defineProps<{
  data: any[][]
  cellTemplate?: (cell: any) => VNode
}>()

const renderCell = (value: any) => {
  if (globalProps.cellTemplate) {
    const res = globalProps.cellTemplate(value)
    return h('td', { class: 'px-2 py-1' }, res)
  }
  return h('td', { class: 'px-2 py-1' }, value)
}

const renderRow = (row: any[], index: number) => {
  if (index === 0)
    return

  const res = row.map(renderCell)
  return h(
    'tr',
    {
      class: index % 2 === 0
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

const renderHeadCell = (value: any) => {
  const cl = {
    'bg-gray-200 dark:bg-gray-700': true,
    'px-4': true,
    'py-2': true,
  }
  if (globalProps.cellTemplate) {
    const res = globalProps.cellTemplate(value)
    return h('th', { class: cl }, res)
  }
  return h('th', { class: cl }, value)
}

const renderHead = () => {
  const res = globalProps.data[0].map(renderHeadCell)
  return h('thead', {}, h('tr', {}, res))
}

</script>

<template>
  <table
    v-if="data.length > 0" border-collapse w-full
    border="~ rounded gray-200 dark:gray-700"
  >
    <render-head />
    <render-body />
  </table>
  <div
    v-else
    border="~ rounded gray-200 dark:gray-700"
  >
    <div i-carbon-earth color="gray-500" text-8xl m-auto mt-20 />
    <div color="gray-500" mb-20>
      暂无数据
    </div>
  </div>
</template>
