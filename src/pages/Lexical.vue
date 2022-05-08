<script setup lang="ts">
import type { DataTableColumns } from 'naive-ui'
import { NButton, NCard, NDataTable, NInput, useNotification } from 'naive-ui'
import lexialAnalysisProcess from '~/core/lexical_analysis/lexialAnalysisProcess'
import type LexicalResult from '~/core/lexical_analysis/LexicalResult'
import ColorMap from '~/core/lexical_analysis/static/ColorMap'
import type Token from '~/core/lexical_analysis/static/Token'

let inputCode = $ref('')
let lexicalResult = $ref<LexicalResult[]>([])

const notification = useNotification()

let markAsRead = $ref(false)
const n = notification.create({
  title: '注意',
  content: '若页面卡顿，请关闭页面！',
  action: () => h(
    NButton,
    {
      text: true,
      type: 'primary',
      onClick: () => {
        markAsRead = true
        n.destroy()
      },
    },
    { default: () => '已读' },
  ),
})

const columns: DataTableColumns<LexicalResult> = [
  { key: 'type', title: '类型', width: '30%' },
  {
    key: 'value',
    title: '值',
    width: '70%',
    render: (v: LexicalResult) => h(
      'span',
      { style: { color: ColorMap.get(v?.type as Token), fontFamily: '\'Fira Code\', \'Courier New\', Courier, monospace' } },
      { default: () => v.value },
    ),
  },
]

const tabKeyDown = (e: Event) => {
  inputCode += '\t'
  e.preventDefault()
}

const analyzeCode = () => {
  lexicalResult = lexialAnalysisProcess(`${inputCode}\n`)
}

</script>

<template>
  <div lg:flex lg:justify-center>
    <!-- 左边代码输入块 -->
    <n-card title="输入代码" text-left>
      <template #header-extra>
        <n-button :disabled="inputCode.trim().length === 0" @click="analyzeCode">
          分析
        </n-button>
      </template>
      <n-input
        v-model:value="inputCode"
        font-mono
        h-full
        min-h-60
        type="textarea"
        @keydown.tab="tabKeyDown"
      />
    </n-card>
    <!-- 右边分析块 -->
    <n-data-table :columns="columns" :data="lexicalResult" />
  </div>
</template>

