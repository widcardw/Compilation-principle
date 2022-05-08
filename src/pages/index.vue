<script setup lang="ts">
import { createTextVNode } from 'vue'
import type { DataTableColumns } from 'naive-ui'
import { NDataTable } from 'naive-ui'

const router = useRouter()

interface Experiment {
  no: number
  name: string
  optional: boolean
  description: string
  url: string
}

const experiments: Experiment[] = [
  {
    no: 1,
    name: '词法分析',
    optional: false,
    description: '从源代码中分离出合法的单词，包括标识符、整数、保留字等，采用文法和有限自动机等方式实现',
    url: 'Lexical',
  },
  {
    no: 2,
    name: '不确定有限自动机的确定化',
    optional: true,
    description: '由文法生成不确定的有限自动机，然后确定化',
    url: '',
  }, {
    no: 3,
    name: '自顶向下的预测分析',
    optional: false,
    description: '实现由文法求 First 和 Follow 集，最后得到预测分析表，并实现简单的语法结构',
    url: 'TopDown',
  },
  {
    no: 4,
    name: '算符优先文法实现表达式求值',
    optional: false,
    description: '由算符优先文法求出优先矩阵，然后分析表达式的合法性并求出值',
    url: '',
  },
  {
    no: 5,
    name: 'SLR(1) 文法算法',
    optional: true,
    description: '构造 SLR(1) 分析表，并识别句子',
    url: '',
  },
  {
    no: 6,
    name: '语义分析',
    optional: true,
    description: '由简单文法得到语义文法',
    url: '',
  },
]

const columns: DataTableColumns<Experiment> = [
  { key: 'no', title: '编号' },
  {
    key: 'name',
    title: '名称',
    render: (row: Experiment) => {
      if (row.url !== '') {
        return h(
          'button',
          {
            class: 'underline decoration-teal-600 decoration-dashed hover:text-teal-600',
            onclick: () => { router.push(`/${row.url}`) },
          },
          { default: () => row.name },
        )
      }
      return createTextVNode(row.name)
    },
  },
  { key: 'optional', title: '可选', render: (row: Experiment) => createTextVNode(row.optional ? '可选' : '必做') },
  { key: 'description', title: '描述' },
]

</script>

<template>
  <div>
    <a href="https://github.com/antfu/vitesse-lite" i-carbon-campsite text-4xl inline-block />
    <p>
      编译原理实验
    </p>
    <n-data-table :columns="columns" :data="experiments" max-w-1000px m-auto />
  </div>
</template>
