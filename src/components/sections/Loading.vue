<script setup lang="ts">
const { percentage } = useLoadingAnimation()
</script>

<template>
  <section
    class="w-full loading-screen h-full fixed left-0 bottom-0 z-[100] flex items-end"
  >
    <div
      class="h-full w-full flex items-center md:flex-row flex-col-reverse justify-start md:justify-center md:py-[44px] py-[50px] md:px-[48px]"
    >
      <div class="text-foreground text-[52px] h-fit inline-block uppercase">
        {{ percentage }}%
      </div>
    </div>
  </section>
</template>
