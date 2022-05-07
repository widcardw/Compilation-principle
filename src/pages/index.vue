<script setup lang="ts">

const router = useRouter()

</script>

<template>
  <div>
    <div i-carbon-campsite text-4xl inline-block />
    <p>
      <a rel="noreferrer" href="https://github.com/antfu/vitesse-lite" target="_blank">
        Vitesse Lite
      </a>
    </p>
    <p>
      <em text-sm op75>Opinionated Vite Starter Template</em>
    </p>

    <div>
      <button
        class="m-3 text-sm btn"
        @click="router.push('Lexical')"
      >
        词法分析
      </button>
    </div>
  </div>
</template>
