<script setup lang="ts">
import { ref } from 'vue'

import { GsapIcon, ShadcnUiIcon, TailwindIcon, TypescriptIcon, VueIcon } from './icons'

const techStack = ref(null)

const technologies = [
  { name: 'Vue', icon: VueIcon, link: 'https://vuejs.org' },
  { name: 'TypeScript', icon: TypescriptIcon, link: 'https://www.typescriptlang.org' },
  { name: 'TailwindCSS', icon: TailwindIcon, link: 'https://tailwindcss.com' },
  { name: 'Shadcn Vue', icon: ShadcnUiIcon, link: 'https://www.shadcn-vue.com' },
  { name: 'GSAP', icon: GsapIcon, link: 'https://greensock.com/gsap' },
]

useFadeInUp(techStack, 50)
</script>

<template>
  <div ref="techStack" class="mt-16">
    <p class="text-sm text-center text-muted-foreground mb-4">
      {{ $t("hero.technologies.title") }}
    </p>
    <div class="flex flex-wrap justify-center gap-4">
      <a
        v-for="tech in technologies"
        :key="tech.name"
        :href="tech.link"
        target="_blank"
        rel="noopener noreferrer"
        class="flex items-center gap-2 px-4 py-2 bg-muted rounded-full hover:bg-accent transition-colors duration-300"
      >
        <component :is="tech.icon" class="w-4 h-4" />
        <span class="text-sm font-medium text-accent-foreground">{{ tech.name }}</span>
      </a>
    </div>
  </div>
</template>
