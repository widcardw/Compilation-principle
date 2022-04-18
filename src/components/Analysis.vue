<script setup lang="ts">
import { ref } from 'vue'
import { NInput, NCard, NTabs, NTabPane, NButton } from 'naive-ui'
import LexicalAnalysis from './LexicalAnalysis.vue';
import LexicalResult from '../core/lexical_analysis/LexicalResult';
import lexialAnalysisProcess from '../core/lexical_analysis/lexialAnalysisProcess';
const inputCode = ref("")
const lexicalResult = ref<LexicalResult[]>([])

const analyze = () => {
  lexicalResult.value = lexialAnalysisProcess(inputCode.value + '\n');
}

const tabKeyDown = (e: Event) => {
  inputCode.value += '\t'
  e.preventDefault();
}

</script>

<template>
  <div lg:flex lg:justify-center>
    <n-card title="输入代码">
      <template #header-extra>
        <n-button @click="analyze" :disabled="inputCode.trim() === ''">分析</n-button>
      </template>
      <n-input v-model:value="inputCode" type="textarea" placeholder="请输入代码" clearable class="code"
        @keydown.tab="tabKeyDown" />
    </n-card>
    <n-card content-style="padding: 0;">
      <n-tabs type="line" size="large" :tabs-padding="20" pane-style="padding: 0;">
        <n-tab-pane name="词法分析">
          <lexical-analysis :tableData="lexicalResult" />
        </n-tab-pane>
        <n-tab-pane name="语法分析">
          还没做😅
        </n-tab-pane>
      </n-tabs>
    </n-card>
  </div>
</template>

<style scoped>
.code {
  font-family: 'Fira Code', 'Courier New', Courier, monospace;
  width: 100%;
  min-height: 20em;
}
</style>
