<script setup lang="ts">
import { ChevronDownIcon } from '@radix-icons/vue'
import { computed, inject, ref } from 'vue'
import { cn } from '../../../lib/utils'
import { selectOpenKey, selectTriggerKey, selectValueKey } from './keys'

const props = defineProps<{
  class?: string
}>()

const emit = defineEmits<{
  (e: 'change', value: boolean): void
}>()

const value = inject(selectValueKey)!
const triggerRef = inject(selectTriggerKey)!
const open = inject(selectOpenKey)!

const placeholder = ref('Select an option')
const displayValue = computed(() => value.value || placeholder.value)

function toggle() {
  open.value = !open.value
  emit('change', open.value)
}
</script>

<template>
  <button
    ref="triggerRef"
    type="button"
    :class="cn(
      'flex h-10 w-full items-center justify-between rounded-md border',
      'border-white/30 focus:border-white hover:border-white',
      'px-[12px] py-[12px] text-sm ring-offset-primary placeholder:text-slate-500',
      'focus:outline-none focus:ring-2 focus:ring-white/30 focus:ring-offset-2',
      'disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-150 ease-in-out',
      props.class,
    )"
    :aria-expanded="open"
    @click="toggle"
  >
    <slot>
      <span class="flex items-center gap-2 truncate">{{ displayValue }}</span>
    </slot>
    <ChevronDownIcon
      class="h-4 w-4 opacity-50 transition-transform"
      :class="{ 'rotate-180': open }"
    />
  </button>
</template>
