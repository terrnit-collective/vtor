import type { Ref } from 'vue'
import { useMotion } from '@vueuse/motion'

export function useFadeInUp(element: Ref<null>, delay: number = 0): void {
  useMotion(element, {
    initial: {
      opacity: 0,
      y: 100,
    },
    enter: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 800,
        delay,
      },
    },
  })
}

export function useScaleIn(element: Ref<null>, delay: number = 0): void {
  useMotion(element, {
    initial: {
      opacity: 0,
      scale: 0.8,
    },
    enter: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 600,
        delay,
      },
    },
  })
}
