<template>
  <div>
    <div
      v-for="(item, index) in imageList"
      :key="index"
      class="image_container"
      :style="{
        backgroundImage: `url(${item.src})`,
      }"
    >
      <p>{{ item.text }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
if(!CSS?.supports?.('height','1dvh')){
  alert('您的设备暂时还不支持最新的CSS特性: height，效果可能会不太好哦')
}
if(!CSS?.supports?.('mix-blend-mode','difference')){
  alert('您的设备暂时还不支持最新的CSS特性: mix-blend-mode: difference，效果可能会不太好哦')
}

defineOptions({
  name: 'HomeView',
})

import imageList from './imageList'

import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

import { onMounted } from 'vue'

const initGsap = () => {
  ScrollTrigger.batch('.image_container', {
    onEnter: (elements) => {
      elements.forEach((element) => {
        gsap.fromTo(
          element,
          {
            backgroundPositionY: -window.innerHeight / 2 + 'px',
          },
          {
            backgroundPositionY: window.innerHeight / 2 + 'px',
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
  height: 100dvh;

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
  }
}
</style>
