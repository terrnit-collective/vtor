<script setup lang="ts">
import { provide, ref } from 'vue'
import { cn } from '../../../lib/utils'
import { selectOpenKey, selectTriggerKey, selectValueKey, updateSelectValueKey } from './keys'

interface SelectProps {
  defaultValue?: string
  class?: string
}

const props = withDefaults(defineProps<SelectProps>(), {
  defaultValue: '',
  class: '',
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const value = ref(props.defaultValue)
const triggerRef = ref<HTMLButtonElement | null>(null)
const open = ref(false)

function updateValue(newValue: string) {
  value.value = newValue
  emit('update:modelValue', newValue)
  open.value = false
}

provide(selectValueKey, value)
provide(selectTriggerKey, triggerRef)
provide(selectOpenKey, open)
provide(updateSelectValueKey, updateValue)
</script>

<template>
  <div :class="cn('relative w-full', props.class)">
    <slot />
  </div>
</template>
