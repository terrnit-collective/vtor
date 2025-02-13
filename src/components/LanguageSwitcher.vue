<script lang="ts" setup>
import { loadLanguageAsync } from '../modules/i18n'

const { locale } = useI18n()

function onToggleLocales() {
  const currentLocale = locale.value
  loadLanguageAsync(currentLocale === 'en' ? 'ru' : 'en')
}
</script>

<template>
  <Button
    size="lg"
    variant="outline"
    class="w-fit px-4"
    @click="onToggleLocales()"
  >
    <span class="block">
      {{ locale === "en" ? "🇬🇧" : "🇷🇺" }}
    </span>
  </Button>
</template>
