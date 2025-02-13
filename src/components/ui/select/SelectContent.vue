<script setup lang="ts">
import { inject, onMounted, onUnmounted, ref } from 'vue'
import { cn } from '../../../lib/utils'
import { selectOpenKey, selectTriggerKey } from './keys'

const props = defineProps<{ class?: string }>()
const triggerRef = inject(selectTriggerKey)!
const open = inject(selectOpenKey)!
const contentRef = ref<HTMLDivElement | null>(null)

function updatePosition() {
  if (!triggerRef.value || !contentRef.value)
    return

  const triggerRect = triggerRef.value.getBoundingClientRect()
  const contentEl = contentRef.value

  contentEl.style.width = `${triggerRect.width}px`
  contentEl.style.left = `${triggerRect.left}px`
  contentEl.style.top = `${triggerRect.bottom + 5}px`
}

onClickOutside(contentRef, () => (open.value = false))

onMounted(() => {
  window.addEventListener('resize', updatePosition)
})

onUnmounted(() => {
  window.removeEventListener('resize', updatePosition)
})
</script>

<template>
  <div
    v-if="open"
    ref="contentRef"
    :class="cn('fixed z-50 mt-2 min-w-[8rem] overflow-hidden rounded-md bg-secondary text-white shadow-md', props.class)"
  >
    <div class="max-h-[var(--radix-select-content-available-height)] overflow-hidden p-1">
      <slot />
    </div>
  </div>
</template>
