<template>
  <div>
    <div v-for="(item, index) in imageList" :key="index" class="image_container">
      <img :src="item.src" alt="" loading="lazy" />
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

// 锁定window.innerHeight
const initGsap = () => {
  ScrollTrigger.batch('.image_container', {
    onEnter: (elements) => {
      elements.forEach((element) => {
        gsap.fromTo(
          element.querySelector('img'),
          {
            y: `-50%`,
          },
          {
            y: `50%`,
            ease: 'none',
            scrollTrigger: {
              trigger: element,
              scrub: true,
              start: 'top bottom',
              end: 'bottom top',
            },
          },
        )
      })
    },
    start: 'top-30 bottom',
    end: 'bottom top',
  })
}
onMounted(initGsap)

import { useDebounceFn, useEventListener } from '@vueuse/core'
const refreshScrollTrigger = useDebounceFn(() => {
  ScrollTrigger.refresh()
}, 1000)
onMounted(() => {
  useEventListener(window, 'resize', refreshScrollTrigger)
})
</script>

<style scoped>
.image_container {
  overflow: hidden;
  user-select: none;
  width: 100vw;
  height: 100vh;

  background-position-x: center;
  background-size: cover;
  background-repeat: no-repeat;

  isolation: isolate; /* Without isolation, the background color will be taken into account */

  position: relative;

  p {
    position: absolute;
    inset: 0;
    margin: auto;
    z-index: 2;
    height: fit-content;

    text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
    font-size: 3rem;
    color: #fff;
    text-align: center;
    mix-blend-mode: difference;

    will-change: transform;
  }

  img {
    position: absolute;
    inset: 0;
    margin: auto;
    z-index: 1;

    width: 100%;
    height: 100%;
    object-fit: cover;

    will-change: transform;
  }
}
</style>
