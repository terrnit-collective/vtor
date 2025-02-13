<script setup lang="ts">
useLoadingAnimation()
</script>

<template>
  <div class="hero-section bg-background text-foreground w-full h-screen fixed left-0 top-0 bottom-0 md:max-w-full">
    <Hero />
  </div>
</template>

<route lang="yaml">
meta:
  layout: default
</route>
