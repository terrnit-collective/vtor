<script lang="ts" setup>
import type { DrawerRootEmits } from 'vaul-vue'
import { useForwardPropsEmits } from 'radix-vue'
import { DrawerRoot } from 'vaul-vue'

const props = withDefaults(defineProps<{ shouldScaleBackground?: boolean }>(), {
  shouldScaleBackground: true,
})

const emits = defineEmits<DrawerRootEmits>()

const forwarded = useForwardPropsEmits(props, emits)
</script>

<template>
  <DrawerRoot v-bind="forwarded" class="drawer">
    <slot />
  </DrawerRoot>
</template>
