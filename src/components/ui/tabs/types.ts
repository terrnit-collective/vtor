export interface TabProps {
  value: string
  class?: string
}

export interface TabListProps {
  defaultValue?: string
  class?: string
  tabListClass?: string
  contentClass?: string
}

export interface TabContextState {
  activeTab: Ref<string | undefined>
  setActiveTab: (value: string) => void
}
