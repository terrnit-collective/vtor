<script setup lang="ts">
import { onMounted } from 'vue'

const { init: startLoadingAnimation, isLoading } = useLoadingAnimation()

onMounted(() => {
  startLoadingAnimation()
})
</script>

<template>
  <div
    class="md:h-screen h-full relative z-[10] md:px-12 px-4 relative flex flex-col md:max-w-[1660px] w-full items-center justify-center mx-auto"
  >
    <div
      v-if="isLoading"
      v-motion-fade="{
        stagger: 150,
        initial: {
          opacity: 1,
          translateX: -20,
        },
        enter: {
          opacity: 0,
          translateX: 0,
          transition: {
            delay: 100,
          },
        },
      }"
      class="w-full h-screen fill bg-zinc-900/30 block absolute top-0 z-[-1]"
    />

    <div
      v-if="!isLoading"
      class="h-full gap-y-4 flex-col w-full flex items-center justify-center"
    >
      <h1 class="text-primary text-2xl font-medium">
        {{ $t("hero.title") }}
      </h1>
      <span class="text-foreground/40">{{ $t("hero.description") }}</span>
      <div class="flex gap-x-4 mt-2">
        <Button
          class="text-brand-foreground bg-brand hover:bg-brand/80"
          size="lg"
          as="a"
          href="https://github.com/terrnit-collective/vtor"
          target="_blank"
        >
          {{ $t("hero.cta") }}
        </Button>
        <LanguageSwitcher />
        <ThemeSwitcher />
      </div>
      <div class="grid grid-cols-3 gap-4 mt-12">
        <Button
          v-if="!isLoading"
          v-motion-fade="{
            stagger: 150,
            initial: {
              opacity: 0,
              translateX: -20,
            },
            enter: {
              opacity: 1,
              translateX: 0,
              transition: {
                delay: 100,
              },
            },
          }"
          class="w-[166px]"
        >
          {{ $t("hero.buttons.primary") }}
        </Button>
        <Button
          v-if="!isLoading"
          v-motion-fade="{
            stagger: 150,
            initial: {
              opacity: 0,
              translateX: -20,
            },
            enter: {
              opacity: 1,
              translateX: 0,
              transition: {
                delay: 100,
              },
            },
          }"
          variant="secondary"
          class="w-[166px]"
        >
          {{ $t("hero.buttons.secondary") }}
        </Button>
        <Button
          v-if="!isLoading"
          v-motion-fade="{
            stagger: 150,
            initial: {
              opacity: 0,
              translateX: -20,
            },
            enter: {
              opacity: 1,
              translateX: 0,
              transition: {
                delay: 300,
              },
            },
          }"
          variant="outline"
          class="w-[166px]"
        >
          {{ $t(`hero.buttons.outline`) }}
        </Button>
        <Button
          v-if="!isLoading"
          v-motion-fade="{
            stagger: 150,
            initial: {
              opacity: 0,
              translateX: -20,
            },
            enter: {
              opacity: 1,
              translateX: 0,
              transition: {
                delay: 300,
              },
            },
          }"
          variant="destructive"
          class="w-[166px]"
        >
          {{ $t(`hero.buttons.destructive`) }}
        </Button>
        <Button
          v-if="!isLoading"
          v-motion-fade="{
            stagger: 150,
            initial: {
              opacity: 0,
              translateX: -20,
            },
            enter: {
              opacity: 1,
              translateX: 0,
              transition: {
                delay: 300,
              },
            },
          }"
          variant="ghost"
          class="w-[166px]"
        >
          {{ $t(`hero.buttons.ghost`) }}
        </Button>
        <Button
          v-if="!isLoading"
          v-motion-fade="{
            stagger: 150,
            initial: {
              opacity: 0,
              translateX: -20,
            },
            enter: {
              opacity: 1,
              translateX: 0,
              transition: {
                delay: 300,
              },
            },
          }"
          variant="link"
          class="w-[166px]"
        >
          {{ $t(`hero.buttons.link`) }}
        </Button>
      </div>

      <TechStack />
    </div>
  </div>

  <Loading v-if="isLoading" />
</template>
