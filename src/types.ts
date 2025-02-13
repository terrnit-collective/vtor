import type { ViteSSGContext } from 'vite-ssg'

export type UserModule = (ctx: ViteSSGContext) => void

export type AnimationPhases = 'first' | 'second' | 'third' | 'fourth'
