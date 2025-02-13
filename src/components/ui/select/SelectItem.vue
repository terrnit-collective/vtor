<script setup lang="ts">
import { computed, inject } from 'vue'
import { selectValueKey, updateSelectValueKey } from './keys'

const props = defineProps<{
  value: string
}>()

const selectedValue = inject(selectValueKey)!
const updateValue = inject(updateSelectValueKey)!

const isSelected = computed(() => selectedValue.value === props.value)
</script>

<template>
  <div
    class="relative flex w-full cursor-pointer select-none items-center rounded-sm p-[12px] lg:text-[15px] md:text-[12px] text-[12px] outline-none hover:bg-[#172027] focus:bg-[#172027] focus:text-white uppercase gap-x-[10px]"
    :class="{ 'bg-[#172027]': isSelected }"
    @click="updateValue(value)"
  >
    <!-- <span class="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <Check v-if="isSelected" class="h-4 w-4" />
    </span> -->
    <slot />
  </div>
</template>
