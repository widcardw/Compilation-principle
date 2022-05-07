<script setup lang="ts">
import lexialAnalysisProcess from '~/core/lexical_analysis/lexialAnalysisProcess'
import type LexicalResult from '~/core/lexical_analysis/LexicalResult'
import DataTable from '~/components/DataTable.vue'
import Notification from '~/components/Notification.vue'

let inputCode = $ref('')
let lexicalResult = $ref<LexicalResult[]>([])

let notificationRead = $ref(false)
let notificationShown = $ref(false)

const tabKeyDown = (e: Event) => {
  inputCode += '\t'
  e.preventDefault()
}

const analyzeCode = () => {
  if (!notificationRead)
    notificationShown = true
  lexicalResult = lexialAnalysisProcess(`${inputCode}\n`)
}

const markRead = () => {
  notificationRead = true
  notificationShown = false
}

const closeNoti = () => {
  notificationShown = false
}
</script>

<template>
  <div lg:flex lg:justify-center space-x-4>
    <!-- 左边代码输入块 -->
    <div
      border="~ rounded gray-200 dark:gray-700"
      class="lg:w-1\/2 "
      p="x-4 y-2"
    >
      <div justify-between flex>
        <span class="text-sm my-3">
          输入代码
        </span>
        <button class="text-sm btn my-2" @click="analyzeCode">
          分析
        </button>
      </div>
      <div>
        <textarea
          v-model="inputCode"
          font-mono
          border="~ rounded gray-200 dark:gray-700"
          outline="none active:none"
          w-full
          h-full
          min-h-60
          p="x-4 y-2"
          @keydown.tab="tabKeyDown"
        />
      </div>
    </div>
    <!-- 右边分析块 -->
    <div
      border="~ rounded gray-200 dark:gray-700"
      class="lg:w-1\/2 "
    >
      <DataTable :columns="['类型', '值']" :data="lexicalResult" />
    </div>
  </div>
  <Notification
    v-if="notificationShown"
    :title="'注意'"
    :content="'若页面卡顿，请关闭页面！'"
    @mark-read="markRead"
    @close-notification="closeNoti"
  />
</template>
