<script setup lang="ts">
withDefaults(defineProps<{
  title: string
  content: string
  width?: string
}>(), {
  title: '注意',
  content: '请输入内容',
  width: '230px',
})

const emits = defineEmits(['mark-read', 'close-notification'])
</script>

<template>
  <div
    border="~ rounded gray-200 dark:gray-700"
    :style="{width: width}"
    p="x-4 y-4"
    fixed
    top-4 right-4
    bg-white dark:bg-black
    shadow
  >
    <div flex justify-between>
      <h2>{{ title }}</h2>
      <button i-carbon-close @click="emits('close-notification')" />
    </div>
    <p p="y-2" text-left>
      {{ content }}
    </p>
    <button
      class="text-sm btn m-2"
      float-right
      @click="emits('mark-read')"
    >
      已读
    </button>
  </div>
</template>

<style scoped>
h2 {
    font-size: 1.2rem;
    font-weight: bold;
    text-align: left;
}
</style>
