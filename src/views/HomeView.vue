<template>
  <div
    v-for="(item, index) in 5"
    :key="index"
    :class="`container container${item}`"
    :ref="(el) => (containers[index] = el as HTMLDivElement)"
  >
    <p>{{ 'container' + item }}</p>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'HomeView',
})

import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

import { onMounted } from 'vue'
const containers: HTMLDivElement[] = []
onMounted(() => {
  for (const i in containers) {
    const container = containers[i]
    if (!container) continue
    const p = container.querySelector('p')
    const { height } = p!.getBoundingClientRect()

    let start = 'center bottom'
    if (i === '0') {
      start = 'top top'
    }
    gsap.to(p, {
      y: window.innerHeight - height,
      scrollTrigger: {
        trigger: container,
        scrub: true,
        start,
        end: 'bottom top',
      },
    })
  }
})
</script>

<style scoped>
.container {
  width: 100vw;
  height: 100vh;

  font-size: 5rem;
  color: #fff;
  text-align: center;

  &.container1 {
    background-color: red;
  }
  &.container2 {
    background-color: blue;
  }
  &.container3 {
    background-color: purple;
  }
  &.container4 {
    background-color: darkblue;
  }
  &.container5 {
    background-color: darkgreen;
  }
}
</style>
