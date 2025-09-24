<script setup lang="ts"></script>

<template>
  <router-view v-slot="{ Component }">
    <template v-if="Component">
      <transition name="fade" mode="out-in">
        <keep-alive>
          <Suspense timeout="0">
            <component :is="Component" />
            <template #fallback>
              <div style="width: 100%; height: 100%">loading...</div>
            </template>
          </Suspense>
        </keep-alive>
      </transition>
    </template>
  </router-view>
</template>

<style>
.fade-leave-active {
  transition: opacity linear 0.2s;
}
.fade-leave-from {
  opacity: 1;
}
.fade-leave-to {
  opacity: 0;
}
.fade-enter-active {
  transition: opacity linear 0.2s;
}
.fade-enter-from {
  opacity: 0;
}
.fade-enter-to {
  opacity: 1;
}
</style>
