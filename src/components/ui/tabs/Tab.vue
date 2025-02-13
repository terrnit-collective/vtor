<script setup lang="ts">
import type { TabProps } from './types'
import { cn } from '../../../lib/utils'
import { useTabContext } from './useTabContext'

const props = defineProps<TabProps>()
const { setActiveTab } = useTabContext()

function handleClick() {
  setActiveTab(props.value)
}
</script>

<template>
  <div
    :class="cn(
      'inline-flex items-center justify-center whitespace-nowrap rounded-sm text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
      props.class,
    )"
    @click="handleClick"
  >
    <slot />
  </div>
</template>
