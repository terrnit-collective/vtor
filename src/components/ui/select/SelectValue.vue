<script setup lang="ts">
import { cn } from '../../../lib/utils'
import { selectValueKey } from './keys'

const props = defineProps<{
  class?: string
  placeholder?: string
}>()

const value = inject(selectValueKey)!

const { placeholder, class: className } = toRefs(props)

const displayValue = computed(() => value.value || placeholder.value)
</script>

<template>
  <span :class="cn('flex items-center gap-2 truncate', className)">{{ displayValue }}</span>
</template>
