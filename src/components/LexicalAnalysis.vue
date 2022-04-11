<script setup lang="ts">
import { ref, reactive, withDefaults, h } from 'vue'
import { DataTableColumns, NDataTable, NButton, NTag } from 'naive-ui'
import LexicalResult from '../core/lexical_analysis/LexicalResult'
import ColorMap from '../core/lexical_analysis/static/ColorMap';
import Token from '../core/lexical_analysis/static/Token';

const columns: DataTableColumns = [
  { title: "类型", key: "type", width: "30%" },
  {
    title: "值", key: "value", width: "70%", render(row) {
      return h(
        "span",
        { style: { color: ColorMap.get(row?.type as Token), fontFamily: "'Fira Code', 'Courier New', Courier, monospace" } },
        { default: () => row?.value }
      )
    }
  },
]

interface Props {
  tableData: LexicalResult[]
}

const props = defineProps<Props>()

const pagination = {
  pageSize: 15
}

</script>

<template>
  <n-data-table :columns="columns" :data="tableData" :bordered="false" :pagination="pagination" />
</template>

<style scoped>
</style>
