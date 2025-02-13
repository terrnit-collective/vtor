import type { TabContextState } from './types'
import { inject, provide, ref, type Ref } from 'vue'

const TAB_CONTEXT_KEY = Symbol('TabContext')

export function provideTabContext(defaultValue?: string): TabContextState {
  const activeTab = ref(defaultValue)

  const setActiveTab = (value: string) => {
    activeTab.value = value
  }

  provide(TAB_CONTEXT_KEY, { activeTab, setActiveTab })

  return { activeTab, setActiveTab }
}

export function useTabContext() {
  const context = inject<{
    activeTab: Ref<string | undefined>
    setActiveTab: (value: string) => void
  }>(TAB_CONTEXT_KEY)

  if (!context) {
    throw new Error('useTabContext must be used within a TabList component')
  }

  return context
}
