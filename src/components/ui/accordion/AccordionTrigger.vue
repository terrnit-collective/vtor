<script setup lang="ts">
import type { ComputedRef } from 'vue'
import { ChevronDownIcon } from '@radix-icons/vue'
import { inject } from 'vue'
import { cn } from '../../../lib/utils'
import { toggleAccordionKey } from './keys'

const props = defineProps<{
  value: string
  class?: string
}>()

const toggleAccordion = inject(toggleAccordionKey) as (value: string) => void
const isExpanded = inject('isExpanded') as ComputedRef<boolean>
</script>

<template>
  <button
    type="button"
    :class="cn('flex w-full items-center justify-between py-4 text-sm font-medium transition-all [&[data-state=open]>div>svg]:rotate-180', props.class)"
    :data-state="isExpanded ? 'open' : 'closed'"
    @click="toggleAccordion(props.value)"
  >
    <slot />
    <slot name="icon">
      <div class="bg-white/5 md:p-3 p-2 ml-auto rounded-[8px] flex items-center justify-center text-[16px] font-medium text-white">
        <ChevronDownIcon
          class="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200"
        />
      </div>
    </slot>
  </button>
</template>
