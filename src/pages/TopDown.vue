<script setup lang="ts">
import type { DataTableColumns } from 'naive-ui'
import { NButton, NCard, NDataTable, NDynamicInput, NDynamicTags, NTag, useMessage } from 'naive-ui'
import type { Ref } from 'vue'
import getFirstSets from '~/core/top_down_pre/getFirstSets'
import getFollowSets from '~/core/top_down_pre/getFollowSets'
import preProcessLaws from '~/core/top_down_pre/preProcessLaws'
import type { Law, Pair } from '~/core/top_down_pre/static'
import { EMPTY, recordToArray } from '~/core/top_down_pre/static'

const message = useMessage()
const laws = $ref<Pair<string, string>[]>([{
  key: 'E',
  value: 'T E\'',
}, {
  key: 'E\'',
  value: '+ T E\' | @empty',
}, {
  key: 'T',
  value: 'F T\'',
}, {
  key: 'T\'',
  value: '* F T\' | @empty',
}, {
  key: 'F',
  value: '( E ) | id',
}])

const terminators = $ref<string[]>([EMPTY, '+', '*', '(', ')', 'id'])
const nonTerminators = $ref<string[]>(['E', 'T', 'F', 'T\'', 'E\''])
let firstSets = $ref<Record<string, string[]>>()
let followSets = $ref<Record<string, string[]>>()

const firstColumns = ref<DataTableColumns<Pair<string, string[]>>>([
  {
    key: 'key',
    title: '符号',
    defaultFilterOptionValues: ['non-terminator'],
    filterOptions: [
      { label: '非终结符', value: 'non-terminator' },
      { label: '终结符', value: 'terminator' },
    ],
    filter: (value, row) => {
      return (value === 'terminator'
        ? terminators.includes(row.key)
        : false)
              || (value === 'non-terminator'
                ? nonTerminators.includes(row.key)
                : false)
    },
  },
  {
    key: 'value',
    title: 'First 集',
    render: (row) => {
      return row.value.map((v) => {
        return h(NTag, { style: { marginRight: '6px' } }, { default: () => v })
      })
    },
  },
]) as Ref<DataTableColumns<Pair<string, string[]>>>

const followColumns = ref<DataTableColumns<Pair<string, string[]>>>([
  {
    key: 'key',
    title: '符号',
    defaultFilterOptionValues: ['non-terminator'],
    filterOptions: [
      { label: '非终结符', value: 'non-terminator' },
      { label: '终结符', value: 'terminator' },
    ],
    filter: (value, row) => {
      return (value === 'terminator'
        ? terminators.includes(row.key)
        : false)
              || (value === 'non-terminator'
                ? nonTerminators.includes(row.key)
                : false)
    },
  },
  {
    key: 'value',
    title: 'Follow 集',
    render: (row) => {
      return row.value.map((v) => {
        return h(NTag, { style: { marginRight: '6px' } }, { default: () => v })
      })
    },
  },
]) as Ref<DataTableColumns<Pair<string, string[]>>>

const analyzeLaw = () => {
  const realLaws: Law[] = preProcessLaws(laws)
  try {
    firstSets = getFirstSets(terminators, nonTerminators, realLaws)
    followSets = getFollowSets(terminators, nonTerminators, realLaws, firstSets)
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
</template>
