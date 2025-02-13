<script lang="ts" setup>
function onToggleTheme() {
  toggleDark()
}
</script>

<template>
  <Button
    size="lg"
    variant="outline"
    class="w-fit px-4"
    @click="onToggleTheme()"
  >
    <span class="block">
      {{ isDark ? "🌙" : "🌞" }}
    </span>
  </Button>
</template>
