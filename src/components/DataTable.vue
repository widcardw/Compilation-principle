<script setup lang="ts">
import type LexicalResult from '~/core/lexical_analysis/LexicalResult'
import ColorMap from '~/core/lexical_analysis/static/ColorMap'
import type Token from '~/core/lexical_analysis/static/Token'

defineProps<{
  data: LexicalResult[]
  columns: string[]
}>()

const renderValueCell = (v: LexicalResult) => {
  return h(
    'span',
    { style: { color: ColorMap.get(v?.type as Token), fontFamily: '\'Fira Code\', \'Courier New\', Courier, monospace' } },
    { default: () => v.value },
  )
}
</script>

<template>
  <table v-if="data.length > 0" border-collapse w-full>
    <thead>
      <tr>
        <th v-for="c in columns" :key="c" p="x-4 y-2" bg-gray-100 dark:bg-gray-800>
          {{ c }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(d, i) in data" :key="i">
        <td p="x-4 y-2" class="cell-type">
          {{ d.type }}
        </td>
        <td p="x-4 y-2" class="cell-value">
          <render-value-cell :type="d.type" :value="d.value" :str-index="d.strIndex" />
        </td>
      </tr>
    </tbody>
  </table>
  <div v-else m-auto>
    <div i-carbon-earth color="gray-500" text-8xl m-auto mt-20 />
    <div color="gray-500" mb-20>
      暂无数据
    </div>
  </div>
</template>

<style scoped>
.cell-type {
    width: 30%;
}
.cell-value {
    width: 70%;
}
</style>
