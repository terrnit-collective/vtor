import type { InjectionKey, Ref } from 'vue'

export const accordionValueKey = Symbol('accordionValue') as InjectionKey<Ref<string[]>>
export const toggleAccordionKey = Symbol('toggleAccordion') as InjectionKey<(value: string) => void>
