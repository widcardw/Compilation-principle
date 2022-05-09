<script setup lang="ts">
import { isDark, toggleDark } from '~/composables'

const emits = defineEmits(['naive-dark-theme-toggle'])

const toggleGlobalDark = () => {
  toggleDark()
  emits('naive-dark-theme-toggle', isDark)
}

</script>

<template>
  <nav text-xl mt-6 inline-flex gap-2>
    <button class="icon-btn !outline-none" bg-transparent @click="toggleGlobalDark">
      <div v-if="isDark" i-carbon-moon />
      <div v-else i-carbon-sun />
    </button>

    <a
      class="icon-btn"
      i-carbon-logo-github text-zinc-600 href="https://github.com/widcardw/Compilation-principle"
      target="_blank"
    />
  </nav>
</template>
