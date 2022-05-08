<script setup lang="ts">
import type { GlobalTheme } from 'naive-ui'
import { NConfigProvider, NMessageProvider, NNotificationProvider, darkTheme } from 'naive-ui'
import type { Ref } from 'vue'

let theme = $ref<GlobalTheme | null>(null)

const toggleNaiveTheme = (isDark: Ref<boolean>) => {
  if (isDark.value)
    theme = darkTheme
  else
    theme = null
}

</script>

<template>
  <n-config-provider :theme="theme">
    <n-notification-provider>
      <n-message-provider>
        <main font-sans p="x-4 y-10" text="center gray-700 dark:gray-200">
          <router-view />
          <Footer @naive-dark-theme-toggle="toggleNaiveTheme" />
        </main>
      </n-message-provider>
    </n-notification-provider>
  </n-config-provider>
</template>
