<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import Analysis from './components/Analysis.vue'
</script>

<template>
  <Analysis style="margin: 20px; width: calc(100%-40px);" />
  <div m2 flex justify-center text-1xl hover="op80" op30 duration-300>
    <a i-file-icons-vite text-zinc-600 href="https://vitejs.cn" target="_blank" m1></a>
    <a i-file-icons-vue text-zinc-600 href="https://github.com/vuejs/vue" target="_blank" m1></a>
    <a i-carbon-logo-github text-zinc-600 href="https://github.com/widcardw/Compilation-principle" target="_blank" m1></a>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Fira+Code&display=swap');

.m-1 {
  margin: 0 10px;
  font-size: 20px;
  color: grey
}
</style>
