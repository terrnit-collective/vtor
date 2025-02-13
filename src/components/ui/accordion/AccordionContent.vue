<script setup lang="ts">
import type { ComputedRef } from 'vue'
import { inject } from 'vue'

const isExpanded = inject('isExpanded') as ComputedRef<boolean>
</script>

<template>
  <div
    v-show="isExpanded"
    class="overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    :data-state="isExpanded ? 'open' : 'closed'"
  >
    <div class="pb-4 pt-0">
      <slot />
    </div>
  </div>
</template>
