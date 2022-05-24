<script setup lang="ts">
import { NButton, NCard, NDataTable, NDynamicInput, NDynamicTags, useMessage } from 'naive-ui'
import { createTextVNode } from 'vue'
import getFirstSets from '~/core/top_down_pre/getFirstSets'
import getFollowSets from '~/core/top_down_pre/getFollowSets'
import getPredictiveTable from '~/core/top_down_pre/getPredictiveTable'
import getSelectSets from '~/core/top_down_pre/getSelectSets'
import preProcessLaws from '~/core/top_down_pre/preProcessLaws'
import type { Law, Pair } from '~/core/top_down_pre/static'
import { recordToArray } from '~/core/top_down_pre/static'
import { createFirstSetColumnTemplate } from '~/core/top_down_pre/useFirstTemplate'
import { createFollowSetColumnTemplate } from '~/core/top_down_pre/useFollowTemplate'
import { gramma2 } from '~/core/top_down_pre/sample_laws'

const message = useMessage()
const laws = $ref<Pair<string, string>[]>(gramma2.laws)

const terminators = $ref<string[]>(gramma2.terminators)
const nonTerminators = $ref<string[]>(gramma2.nonTerminators)
let firstSets = $ref<Record<string, string[]>>()
let followSets = $ref<Record<string, string[]>>()
let pTable = $ref<Array<Array<string | Array<string | Law>>>>([])

const firstColumns = computed(() => {
  return createFirstSetColumnTemplate(terminators, nonTerminators)
})

const followColumns = computed(() => {
  return createFollowSetColumnTemplate(terminators, nonTerminators)
})

const predictiveCell = (cellValue: string | Array<string | Law>) => {
  if (typeof cellValue === 'string') {
    if (cellValue.trim() !== '')
      return createTextVNode(cellValue)
    else
      return createTextVNode('')
  }
  else {
    return h('div', {},
      cellValue.map((it) => {
        if (typeof it === 'string') {
          return it
        }
        else {
          return h('div', {}, {
            default: () => {
              const { left, right } = it
              return `${left} → ${right.join(' ')}`
            },
          })
        }
      }),
    )
  }
}

const analyzeLaw = () => {
  const realLaws: Law[] = preProcessLaws(laws)
  try {
    firstSets = getFirstSets(terminators, nonTerminators, realLaws)
    followSets = getFollowSets(terminators, nonTerminators, realLaws, firstSets)
    const selectSets = getSelectSets(terminators, nonTerminators, realLaws, firstSets, followSets)
    pTable = getPredictiveTable(terminators, nonTerminators, realLaws, selectSets)
  }
  catch (e: any) {
    message.warning(e.message)
    // eslint-disable-next-line no-console
    console.log(e)
  }
}

</script>

<template>
  <div text-left lg:flex lg:justify-center>
    <div>
      <n-card title="非终结符" class="h-1\/2">
        <n-dynamic-tags v-model:value="nonTerminators" />
      </n-card>
      <n-card title="终结符" class="h-1\/2">
        <n-dynamic-tags v-model:value="terminators" />
      </n-card>
    </div>
    <n-card title="产生式规则">
      <n-dynamic-input
        v-model:value="laws" preset="pair"
        key-placeholder="产生式左部" value-placeholder="产生式右部"
      />
      <template #footer>
        符号之间用空格隔开
      </template>
      <template #header-extra>
        <n-button @click="analyzeLaw">
          分析
        </n-button>
      </template>
    </n-card>
  </div>
  <n-data-table :columns="firstColumns" :data="recordToArray(firstSets)" />
  <n-data-table :columns="followColumns" :data="recordToArray(followSets)" />
  <no-tem-table :data="pTable" :cell-template="predictiveCell" />
</template>
