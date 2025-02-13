<script lang="ts" setup>
interface ParallaxyProps {
  axis: string
  speed: number
  direction: string
  animation: () => | undefined
  disabled: boolean
  debug: boolean
  breakpoints?: { [key: number]: ParallaxyProps } | undefined
}

const props = withDefaults(defineProps<ParallaxyProps>(), {
  axis: 'y',
  speed: 50,
  direction: 'normal',
  animation: undefined,
  disabled: false,
  debug: false,
  breakpoints: undefined,
})

interface ParallaxyOptions {
  axis: string | undefined
  speed: number | undefined
  direction: string | undefined
  animation: (value: number | string) => | undefined
  disabled: boolean | undefined
  debug: boolean | undefined
}

const $outer = ref<HTMLElement>()
const delta = ref(0)
const loaded = ref(false)

const options: ParallaxyOptions = reactive({
  axis: props.axis,
  speed: props.speed,
  direction: props.direction,
  animation: props.animation,
  disabled: props.disabled,
  debug: props.debug,
})

const _animation = computed(() => {
  if (options.disabled) {
    return ''
  }

  if (options.axis === 'y') {
    return options.animation ? options.animation(delta.value) : `transform: translate3d(0, ${delta.value}px, 0);`
  }
  else {
    return options.animation ? options.animation(delta.value) : `transform: translate3d(${delta.value}px, 0, 0);`
  }
})
const directionVector = computed(() => ['normal'].includes(options.direction!) ? 1 : -1)

function calculateDelta() {
  if ($outer.value === undefined)
    return
  delta.value = ((window.innerHeight - $outer.value.getBoundingClientRect().top) * ((options.speed as number) / -1000)) * directionVector.value
}

function init() {
  loaded.value = true

  options.axis = props.axis
  options.speed = props.speed
  options.direction = props.direction
  options.animation = props.animation
  options.disabled = props.disabled
  options.debug = props.debug

  if (props.breakpoints !== undefined) {
    const breaks = Object.keys(props.breakpoints).sort().reverse()
    for (const breakpoint of breaks) {
      if (window.innerWidth >= Number.parseInt(breakpoint)) {
        options.axis = props.breakpoints[Number.parseInt(breakpoint)].axis || options.axis
        options.speed = props.breakpoints[Number.parseInt(breakpoint)].speed || options.speed
        options.direction = props.breakpoints[Number.parseInt(breakpoint)].direction || options.direction
        options.animation = props.breakpoints[Number.parseInt(breakpoint)].animation || options.animation
        options.disabled = props.breakpoints[Number.parseInt(breakpoint)].disabled || options.disabled
        options.debug = props.breakpoints[Number.parseInt(breakpoint)].debug || options.debug
        break
      }
    }
  }

  calculateDelta() // init calculation
  window.addEventListener('scroll', calculateDelta) // recalculate on scroll
}

onMounted(() => {
  if (typeof window === 'undefined') {
    return
  }

  if (document.readyState === 'complete') {
    init()
  }
  else {
    window.addEventListener('load', init)
    window.addEventListener('resize', init)
  }
})

onUnmounted(() => {
  if (typeof window === 'undefined') {
    return
  }

  window.removeEventListener('load', init)
  window.removeEventListener('resize', init)
  window.removeEventListener('scroll', calculateDelta)
})
</script>

<template>
  <div
    ref="$outer" class="parallaxy"
    :class="[{ 'parallaxy--loaded': loaded, 'parallaxy--disabled': options.disabled, 'parallaxy--debug': options.debug }]"
    :style="_animation"
  >
    <slot />

    <div v-if="options.debug" class="parallaxy__debug">
      speed: <input v-model="options.speed" type="number" step="1"><br>
      delta: {{ Math.round(delta * 10000) / 10000 }}<br>
      axis: {{ options.axis }}<br>
      direction: {{ options.direction }}<br>
      animation: <abbr :title="options.animation">{{ options.animation }}</abbr>
    </div>
  </div>
</template>

<style lang="css" scoped>
.parallaxy {
  transition: all 0.2s linear;
  opacity: 0;
  transform: translate3d(0, 0, 0);
}

.parallaxy--loaded {
  opacity: 1;
}

.parallaxy--disabled {
  opacity: 1;
}

.parallaxy--debug {
  position: relative;
}

.parallaxy__debug {
  position: absolute;
  top: 1rem;
  left: 1rem;
  z-index: 9999999;
  background: #fc036f;
  font-family: monospace;
  font-size: 11px;
  border-radius: 5px;
  padding: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
  width: clamp(200px, 50%, 400px);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.parallaxy__debug input {
  width: 4rem;
}
</style>
