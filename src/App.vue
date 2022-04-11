<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import Analysis from './components/Analysis.vue'
import CarbonLogoGithub from './components/icon/CarbonLogoGithub.vue';
import SimpleIconVite from './components/icon/SimpleIconVite.vue';
import MdiVuejs from './components/icon/MdiVuejs.vue';
</script>

<template>
  <Analysis style="margin: 20px; width: calc(100%-40px);" />
  <div style="display: flex; justify-content: center;">
    <SimpleIconVite class="m-1" />
    <MdiVuejs class="m-1" />
    <CarbonLogoGithub class="m-1" />
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
