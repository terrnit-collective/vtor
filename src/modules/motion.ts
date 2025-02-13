import type { UserModule } from '@/types'
import { MotionPlugin } from '@vueuse/motion'

export const install: UserModule = ({ app }) => {
  app.use(MotionPlugin)
}
