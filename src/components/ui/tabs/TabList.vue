<script setup lang="ts">
import type { TabListProps } from './types'
import { cn } from '../../../lib/utils'
import { provideTabContext } from './useTabContext'

const props = defineProps<TabListProps>()
const { activeTab } = provideTabContext(props.defaultValue)
</script>

<template>
  <div :class="cn('w-full flex flex-col', props.class)">
    <div :class="cn('w-full', props.tabListClass)">
      <slot name="tabs" :active="activeTab" />
    </div>

    <div :class="cn('w-full', props.contentClass)">
      <slot name="content" />
    </div>
  </div>
</template>
