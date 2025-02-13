<script setup lang="ts">
const router = useRouter()
const { t } = useI18n()
</script>

<template>
  <main class="p-x-4 p-y-10 text-center text-teal-700 dark:text-gray-200">
    <div class="text-4xl">
      <div class="inline-block" i-carbon-warning />
    </div>
    <RouterView />
    <div>
      <button class="text-sm btn m-3 mt-8" @click="router.back()">
        {{ t('button.back') }}
      </button>
    </div>
  </main>
</template>
