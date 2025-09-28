<template>
  <div>
    <div
      v-for="(item, index) in imageList"
      :key="index"
      :class="`container`"
      :ref="(el) => (containers[index] = el as HTMLDivElement)"
      :style="{
        backgroundImage: `url(${item.src})`,
      }"
    >
      <p>{{ item.text }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'HomeView',
})

import imageList from './imageList'

import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

import { onMounted } from 'vue'
const onMountedP = new Promise((resolve) => onMounted(resolve))

// 锁定window.innerHeight
const lockedWindowInnerHeight = window.innerHeight
const containers: HTMLDivElement[] = []
const initGsap = async () => {
  await onMountedP
  for (let i = 0; i < containers.length; i++) {
    const container = containers[i]
    if (!container) continue
    if (i === 0) {
      const p = container.querySelector('p')
      gsap.fromTo(
        p,
        {
          translateY: 0,
        },
        {
          translateY: `-${lockedWindowInnerHeight / 3}px`,
          ease: 'none',
          scrollTrigger: {
            trigger: container,
            scrub: true,
            start: 'top top',
            end: 'bottom top',
          },
        },
      )
    }

    if (i !== 0) {
      gsap.fromTo(
        container,
        {
          backgroundPositionY: `-${lockedWindowInnerHeight / 2.5}px`,
        },
        {
          backgroundPositionY: `${lockedWindowInnerHeight / 2.5}px`,
          ease: 'none',
          scrollTrigger: {
            trigger: container,
            scrub: true,
            start: 'top bottom',
            end: 'bottom top',
          },
        },
      )
    }
  }
}
initGsap()

import { useDebounceFn, useEventListener } from '@vueuse/core'
const refreshScrollTrigger = useDebounceFn(() => {
  ScrollTrigger.refresh()
}, 1000)
onMounted(() => {
  useEventListener(window, 'resize', refreshScrollTrigger)
})
</script>

<style scoped>
.container {
  /* will-change: scroll-position; */
  user-select: none;
  width: 100vw;
  height: 100vh;

  background-position-x: center;
  background-size: cover;
  background-repeat: no-repeat;

  display: flex;
  justify-content: center;
  align-items: center;

  isolation: isolate; /* Without isolation, the background color will be taken into account */

  p {
    text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
    font-size: 3rem;
    color: #fff;
    text-align: center;
    mix-blend-mode: difference;
  }
}
</style>
