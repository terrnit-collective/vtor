<script setup lang="ts">
import type { Ref } from 'vue'
import { computed, inject, provide } from 'vue'
import { accordionValueKey } from './keys'

const props = defineProps<{
  value: string
}>()

const accordionValue = inject(accordionValueKey) as Ref<string[]>
// const toggleAccordion = inject(toggleAccordionKey) as (value: string) => void

const isExpanded = computed(() =>
  accordionValue.value.includes(props.value),
)

provide('isExpanded', isExpanded)
</script>

<template>
  <div class="bg-secondary p-4 rounded-[8px]">
    <slot />
  </div>
</template>
