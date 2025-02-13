<script setup lang="ts">
import type { TabProps } from './types'
import { computed } from 'vue'
import { cn } from '../../../lib/utils'
import { useTabContext } from './useTabContext'

const props = defineProps<TabProps>()
const { activeTab } = useTabContext()

const isActive = computed(() => activeTab.value === props.value)
</script>

<template>
  <div v-show="isActive" :class="cn('mt-2', props.class)">
    <slot />
  </div>
</template>
