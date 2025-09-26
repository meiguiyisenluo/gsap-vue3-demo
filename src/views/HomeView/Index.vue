<template>
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
</template>

<script setup lang="ts">
defineOptions({
  name: 'HomeView',
})

import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

import bg01 from '@/views/HomeView/assets/img/01.png'
import bg02 from '@/views/HomeView/assets/img/02.png'
import bg03 from '@/views/HomeView/assets/img/03.png'
import bg04 from '@/views/HomeView/assets/img/04.png'

const imageList = [
  {
    src: bg01,
    from: '【哲风壁纸】夜景-夜色风光-星空',
    text: 'Every setback is a setup for a comeback.',
  },
  {
    src: bg02,
    from: '【哲风壁纸】夜景-富士山',
    text: 'You are stronger than you think, and braver than you believe.',
  },
  {
    src: bg03,
    from: '【哲风壁纸】富士山-富士山倒影',
    text: 'Progress is progress, no matter how small.',
  },
  {
    src: bg04,
    from: '【哲风壁纸】森林-车站',
    text: 'Keep going—your future self will thank you.',
  },
]

import { onMounted } from 'vue'
const containers: HTMLDivElement[] = []
onMounted(() => {
  for (const i in containers) {
    const container = containers[i]
    if (!container) continue
    // const p = container.querySelector('p')
    // const { height } = p!.getBoundingClientRect()

    // gsap.to(p, {
    //   ease: 'none',
    //   y: window.innerHeight - height,
    //   scrollTrigger: {
    //     trigger: container,
    //     scrub: true,
    //     start: i === '0' ? 'top top' : 'center bottom',
    //     end: 'bottom top',
    //   },
    // })

    if (i !== '0') {
      gsap.fromTo(
        container,
        {
          backgroundPositionY: `-${window.innerHeight / 2}px`,
        },
        {
          backgroundPositionY: `${window.innerHeight / 2}px`,
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
    font-size: 3rem;
    color: #fff;
    text-align: center;
    mix-blend-mode: difference;
  }
}
</style>
