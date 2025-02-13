import { gsap } from 'gsap'

import ScrollTrigger from 'gsap/dist/ScrollTrigger'
import { ref } from 'vue'

gsap.registerPlugin(ScrollTrigger)

const percentage = ref<number>(0)

export function useLoadingAnimation() {
  const isEndOfAnimation = ref(false)
  const isLoading = ref(true)
  const isBlocked = ref(true)

  const unblockScreen = () => {
    document.body.style.overflow = 'auto'
    isBlocked.value = false
  }

  const blockScreen = () => {
    document.body.style.overflow = 'hidden'
    isBlocked.value = true
  }

  // Start loading animation
  const init = () => {
    isLoading.value = true
    blockScreen()

    const tl = gsap.timeline({
      onComplete: () => {
        unblockScreen()
        isLoading.value = false
      },
    })

    // Animate percentage loading
    tl.to(percentage, {
      value: 100,
      duration: 6,
      roundProps: 'value',
    })

    // Fade out loading screen
    tl.to('.loading-screen', {
      opacity: 0,
      duration: 0.5,
      ease: 'power2.inOut',
      onStart: () => {
        isLoading.value = false
        gsap.set('.loading-screen', { display: 'none' })
      },
    })
  }

  return {
    init,
    percentage,
    isLoading,
    isBlocked,
    isEndOfAnimation,
  }
}
