<script setup lang="ts">
import { provide, ref } from 'vue'
import { accordionValueKey, toggleAccordionKey } from './keys'

interface AccordionProps {
  type?: 'single' | 'multiple'
  defaultValue?: string | string[]
  collapsible?: boolean
}

const props = withDefaults(defineProps<AccordionProps>(), {
  type: 'single',
  collapsible: true,
})

const expandedItems = ref<string[]>(
  Array.isArray(props.defaultValue)
    ? props.defaultValue
    : props.defaultValue
      ? [props.defaultValue]
      : [],
)

function toggle(value: string) {
  if (props.type === 'single') {
    expandedItems.value = expandedItems.value.includes(value) && props.collapsible
      ? []
      : [value]
  }
  else {
    expandedItems.value = expandedItems.value.includes(value)
      ? expandedItems.value.filter(item => item !== value)
      : [...expandedItems.value, value]
  }
}

provide(toggleAccordionKey, toggle)
provide(accordionValueKey, expandedItems)
</script>

<template>
  <div class="w-full">
    <slot />
  </div>
</template>
