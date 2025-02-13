<script lang="ts" setup>
export interface MarqueeProps {
  vertical?: boolean
  direction: 'normal' | 'reverse'
  duration: number
  delay: number
  loop: number
  clone: boolean
  animateOnOverflowOnly: boolean
  gradient: boolean
  gradientColor: any
  gradientWidth: string
  gradientLength: string
  pauseOnHover: boolean
  pauseOnClick: boolean
  pause: boolean
}

const props = withDefaults(defineProps<Partial<MarqueeProps>>(), {
  vertical: false,
  direction: 'normal',
  duration: 10,
  delay: 0,
  loop: 0,
  clone: false,
  animateOnOverflowOnly: false,
  gradient: false,
  gradientColor: [255, 255, 255],
  gradientWidth: '100%',
  gradientLength: '100%',
  pauseOnHover: false,
  pauseOnClick: false,
  pause: false,
})

const emit = defineEmits([
  'onComplete',
  'onLoopComplete',
  'onPause',
  'onResume',
  'onOverflowDetected',
  'onOverflowCleared',
])

const cloneAmount = ref(0)

const minWidth = ref('100%')
const minHeight = ref('100%')

const componentKey = ref(0)

const verticalAnimationPause = ref(false)

const animateOnOverflowPause = ref(true)

const containerWidth = ref(0)
const contentWidth = ref(0)

const containerHeight = ref(0)
const contentHeight = ref(0)

const mouseOverMarquee = ref(false)
const mouseDownMarquee = ref(false)

const loopCounter = ref(0)
const loopInterval = ref<any>(null)

const gradientLength = ref('200px')

const ready = ref(false)

const marqueeContent = ref<HTMLDivElement | any>(null)
const marqueeOverlayContainer = ref<HTMLDivElement | any>(null)

async function checkForClone() {
  if (props.vertical) {
    // pause the animation to prevent flickering
    verticalAnimationPause.value = true
  }

  setInterval(() => {
    minWidth.value = '0%'
    minHeight.value = '0%'

    if (
      marqueeContent.value !== null
      && marqueeOverlayContainer.value !== null
      && marqueeContent.value
      && marqueeOverlayContainer.value
    ) {
      if (
        props.vertical
        && 'clientHeight' in marqueeContent.value
        && 'clientHeight' in marqueeOverlayContainer.value
      ) {
        contentHeight.value = marqueeContent.value.clientHeight
        containerHeight.value = marqueeOverlayContainer.value.clientHeight

        const localCloneAmount = Math.ceil(
          containerHeight.value / contentHeight.value,
        )

        cloneAmount.value = props.animateOnOverflowOnly
          ? 0
          : Number.isFinite(localCloneAmount)
            ? localCloneAmount
            : 0

        // resume the animation
        verticalAnimationPause.value = false

        return cloneAmount.value
      }
      else if (
        !props.vertical
        && 'clientWidth' in marqueeContent.value
        && 'clientWidth' in marqueeOverlayContainer.value
      ) {
        contentWidth.value = marqueeContent.value.clientWidth
        containerWidth.value = marqueeOverlayContainer.value.clientWidth

        if (props.animateOnOverflowOnly && ready.value) {
          if (contentWidth.value <= containerWidth.value) {
            animateOnOverflowPause.value = true
            emit('onOverflowCleared')
          }
          else {
            animateOnOverflowPause.value = false
            emit('onOverflowDetected')
          }

          return 0 // don't clone if animateOnOverflowOnly is true
        }

        const localCloneAmount = Math.ceil(
          containerWidth.value / contentWidth.value,
        )

        cloneAmount.value = Number.isFinite(localCloneAmount)
          ? localCloneAmount
          : 0

        return cloneAmount.value
      }
      else {
        minWidth.value = '100%'
        minHeight.value = '100%'
        return 0
      }
    }
    else {
      minWidth.value = '100%'
      minHeight.value = '100%'
      return 0
    }
  }, 100)
}

async function ForcesUpdate() {
  await checkForClone()

  componentKey.value++
}

watch(contentWidth, async () => {
  if (props.clone) {
    ForcesUpdate()
  }
})

watch(containerWidth, async () => {
  if (props.clone || props.animateOnOverflowOnly) {
    ForcesUpdate()
  }
})

// watch pauseAnimation for emitting events
watch(
  () => props.pause,
  (newVal, oldVal) => {
    if (newVal !== oldVal) {
      if (newVal) {
        emit('onResume')
      }
      else {
        emit('onPause')
      }
    }
  },
)

function hoverStarted() {
  if (props.pauseOnHover) {
    emit('onPause')

    mouseOverMarquee.value = true
  }
}

function hoverEnded() {
  if (props.pauseOnHover) {
    emit('onResume')

    mouseOverMarquee.value = false
  }
}

function mouseDown() {
  if (props.pauseOnClick) {
    emit('onPause')

    mouseDownMarquee.value = true
  }
}

function mouseUp() {
  if (props.pauseOnClick) {
    emit('onResume')

    mouseDownMarquee.value = false
  }
}

const animationState = computed(() => {
  if (props.pause) {
    return 'paused'
  }

  if (props.vertical && verticalAnimationPause.value) {
    return 'paused'
  }

  if (props.animateOnOverflowOnly && animateOnOverflowPause.value) {
    return 'paused'
  }

  return 'running'
})

const hoverAnimationState = computed(() => {
  if (
    props.pauseOnHover
    && (mouseOverMarquee.value || mouseDownMarquee.value)
  ) {
    return 'paused'
  }

  if (!props.pauseOnHover && animationState.value === 'paused') {
    return 'paused'
  }

  return 'running'
})

const clickAnimationState = computed(() => {
  if (props.pauseOnHover && mouseOverMarquee.value) {
    return 'paused'
  }

  if (props.pauseOnClick && mouseDownMarquee.value) {
    return 'paused'
  }

  if (!props.pauseOnHover && animationState.value === 'paused') {
    return 'paused'
  }

  return 'running'
})

const getCurrentStyle = computed(() => {
  const cssVariables = {
    '--duration': `${props.duration}s`,
    '--delay': `${props.delay}s`,
    '--direction': `${props.direction}`,
    '--pauseOnHover': `${hoverAnimationState.value}`,
    '--pauseOnClick': `${clickAnimationState.value}`,
    '--pauseAnimation': `${animationState.value}`,
    '--loops': `${props.loop === 0 ? 'infinite' : props.loop}`,
    '--gradient-color': `rgba(${props.gradientColor[0]}, ${props.gradientColor[1]}, ${props.gradientColor[2]}, 1), rgba(${props.gradientColor[0]}, ${props.gradientColor[1]}, ${props.gradientColor[2]}, 0)`,
    '--gradient-length': `${gradientLength.value}`,
    '--min-width': `${minWidth.value}`,
    '--min-height': `${minHeight.value}`,
  }

  const animationStyles = {
    '--orientation': 'scrollX',
    'orientation': 'horizontal',
  }

  if (props.vertical) {
    animationStyles['--orientation'] = 'scrollY'
  }

  const styles = {
    ...cssVariables,
    ...animationStyles,
  }

  return styles
})

const showGradient = computed(() => {
  if (props.gradient) {
    return true
  }
  return false
})

async function setupMarquee() {
  if (props.vertical) {
    minHeight.value = '100%'
    minWidth.value = 'auto'

    if (props.animateOnOverflowOnly) {
      console.warn(
        'The `animateOnOverflowOnly` prop is not supported for vertical marquees.',
      )
    }
  }
  else {
    minHeight.value = 'auto'

    if (props.animateOnOverflowOnly) {
      minWidth.value = 'auto'
    }
    else {
      minWidth.value = '100%'
    }
  }

  // Deprecate the gradientWidth prop in favor of gradientLength
  if (props.gradient) {
    if (props.gradientWidth) {
      console.warn(
        'The `gradientWidth` prop has been deprecated and will be removed in a future release. Please use `gradientLength` instead.',
      )

      gradientLength.value = props.gradientWidth
    }
    else if (props.gradientLength) {
      gradientLength.value = props.gradientLength
    }
  }

  if (props.clone || props.animateOnOverflowOnly) {
    await checkForClone()
    ForcesUpdate()
    ready.value = true
  }
  else {
    ready.value = true
  }
}

onMounted(async () => {
  setupMarquee()

  loopInterval.value = setInterval(() => {
    loopCounter.value++

    if (props.loop !== 0 && loopCounter.value === props.loop) {
      emit('onComplete')
      clearInterval(loopInterval.value)
    }

    emit('onLoopComplete')

    // Converting the duration into milliseconds here
  }, props.duration * 1000)
})

onBeforeUnmount(() => {
  clearInterval(loopInterval.value)
})
</script>

<template>
  <div
    v-if="ready"
    :key="componentKey"
    class="marquee"
    :class="{ vertical, horizontal: !vertical }"
    :style="getCurrentStyle"
    @mouseenter="hoverStarted"
    @mouseleave="hoverEnded"
    @mousedown="mouseDown"
    @mouseup="mouseUp"
  >
    <div
      ref="marqueeOverlayContainer"
      class="transparent-overlay"
      :aria-hidden="true"
    />

    <div
      v-if="showGradient"
      :aria-hidden="true"
      class="overlay"
      :class="{ vertical, horizontal: !vertical }"
    />

    <div ref="marqueeContent" class="marquee">
      <slot />
    </div>

    <div
      v-if="
        !animateOnOverflowOnly
          || (animateOnOverflowOnly && !animateOnOverflowPause)
      "
      :aria-hidden="true"
      class="marquee"
    >
      <slot />
    </div>

    <div
      v-for="num in cloneAmount"
      :key="num"
      :aria-hidden="true"
      class="marquee cloned"
    >
      <slot />
    </div>
  </div>
</template>

<style>
.marquee {
  display: flex !important;
  position: relative;
}

.marquee.horizontal {
  overflow-x: hidden !important;
  flex-direction: row !important;
  width: 100%;
  height: max-content;
}

.marquee.vertical {
  overflow-y: hidden !important;
  flex-direction: column !important;
  height: 100%;
  width: max-content;
}

.marquee:hover > .marquee {
  animation-play-state: var(--pauseOnHover);
}

.marquee:active > .marquee {
  animation-play-state: var(--pauseOnClick);
}

.marquee > .marquee {
  flex: 0 0 auto;
  min-width: var(--min-width);
  min-height: var(--min-height);
  z-index: 1;

  animation: var(--orientation) var(--duration) linear var(--delay) var(--loops);
  animation-play-state: var(--pauseAnimation);
  animation-direction: var(--direction);
}

.marquee.horizontal > .marquee {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.marquee.vertical > .marquee {
  display: flex;
  flex-direction: column;
  align-items: center;
}

@keyframes scrollX {
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(-100%);
  }
}

@keyframes scrollY {
  0% {
    transform: translateY(0%);
  }
  100% {
    transform: translateY(-100%);
  }
}

.marquee > .overlay {
  position: absolute;
  width: 100%;
  height: 100%;
}

.marquee > .transparent-overlay {
  position: absolute;
  width: 100%;
  height: 100%;
}

.marquee > .overlay::before,
.marquee > .overlay::after {
  content: '';
  position: absolute;
  z-index: 2;
}

.marquee.horizontal > .overlay::before,
.marquee.horizontal > .overlay::after {
  background: linear-gradient(to right, var(--gradient-color));
  height: 100%;
  width: var(--gradient-length);
}

.marquee.vertical > .overlay::before,
.marquee.vertical > .overlay::after {
  background: linear-gradient(to bottom, var(--gradient-color));
  height: var(--gradient-length);
  width: 100%;
}

.marquee.horizontal > .overlay::after {
  transform: rotateZ(180deg);
}

.marquee.vertical > .overlay::after {
  transform: rotateZ(-180deg);
}

.marquee > .overlay::before {
  left: 0;
  top: 0;
}

.marquee.horizontal > .overlay::after {
  right: 0;
  top: 0;
}

.marquee.vertical > .overlay::after {
  left: 0;
  bottom: 0;
}
</style>
