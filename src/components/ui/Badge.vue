<script setup lang="ts">
import { cn } from '../../lib/utils'
</script>

<template>
  <div :class="cn('flex h-[24px] bg-secondary rounded-[4px] p-2 w-fit text-white uppercase font-medium text-[11px] text-center items-center justify-center leading-[90%]', String($attrs.class))">
    <slot />
  </div>
</template>
