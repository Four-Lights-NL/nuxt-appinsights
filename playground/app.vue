<template>
  <div>Nuxt module playground!</div>
</template>

<script lang="ts" setup>
const appInsights = useAppInsights()

appInsights.trackEvent({ name: 'hello from playground' })
</script>
