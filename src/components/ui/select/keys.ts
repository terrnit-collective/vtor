export const selectValueKey = Symbol('selectValue') as InjectionKey<Ref<string>>
export const selectTriggerKey = Symbol('selectTrigger') as InjectionKey<Ref<HTMLButtonElement | null>>
export const selectOpenKey = Symbol('selectOpen') as InjectionKey<Ref<boolean>>
export const updateSelectValueKey = Symbol('updateSelectValue') as InjectionKey<(value: string) => void>
