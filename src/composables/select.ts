import { computed, ref } from 'vue'

interface SelectedOption {
  value: string | number
  label: string
}

interface UseSelectProps {
  modelValue: (string | number)[] | string | number | undefined
  multiple?: boolean
  disabled?: boolean
}

export function useSelect(props: UseSelectProps, emit: any) {
  const isOpen = ref(false)
  const selectedOptions = ref<SelectedOption[]>([])

  const normalizedValue = computed(() => {
    if (props.multiple) {
      return Array.isArray(props.modelValue) ? props.modelValue : []
    }
    return props.modelValue ? [props.modelValue] : []
  })

  const toggleDropdown = () => {
    if (!props.disabled) {
      isOpen.value = !isOpen.value
    }
  }

  const removeTag = (optionValue: string | number) => {
    if (props.disabled)
      return

    const newValue = normalizedValue.value.filter(value => value !== optionValue)
    selectedOptions.value = selectedOptions.value.filter(opt => opt.value !== optionValue)
    emit('update:modelValue', props.multiple ? newValue : newValue[0])
    emit('change', props.multiple ? newValue : newValue[0])
  }

  const selectOption = (value: string | number, label: string) => {
    if (props.multiple) {
      const values = normalizedValue.value as (string | number)[]
      const index = values.indexOf(value)

      let newValue: (string | number)[]
      if (index === -1) {
        newValue = [...values, value]
        selectedOptions.value.push({ value, label })
      }
      else {
        newValue = values.filter(v => v !== value)
        selectedOptions.value = selectedOptions.value.filter(opt => opt.value !== value)
      }

      emit('update:modelValue', newValue)
      emit('change', newValue)
    }
    else {
      isOpen.value = false
      selectedOptions.value = [{ value, label }]
      emit('update:modelValue', value)
      emit('change', value)
    }
  }

  const registerOption = (value: string | number, label: string) => {
    if (normalizedValue.value.includes(value)) {
      const exists = selectedOptions.value.some(opt => opt.value === value)
      if (!exists) {
        selectedOptions.value.push({ value, label })
      }
    }
  }

  const closeDropdown = (e: MouseEvent) => {
    const target = e.target as HTMLElement
    if (!target.closest('.select-container')) {
      isOpen.value = false
    }
  }

  return {
    isOpen,
    selectedOptions,
    normalizedValue,
    toggleDropdown,
    removeTag,
    selectOption,
    registerOption,
    closeDropdown,
  }
}
