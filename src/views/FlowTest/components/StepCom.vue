<template>
  <div v-if="visible">
    <h4>{{ title }}</h4>
    + <input type="number" v-model="num" />
    <button @click="onclickCancel">cancel</button>
    <button @click="onclickConfirm">confirm</button>
  </div>
</template>

<script setup lang="ts">
import { onErrorCaptured, ref } from 'vue'

defineOptions({
  name: 'FlowTest',
})

onErrorCaptured((err) => {
  rejectFlow!(err)
  return false // 阻止错误继续传播
})

const visible = ref(false)
const num = ref(0)

const onclickConfirm = () => {
  visible.value = false
  resolveFlow!({ confirm: true, value: input + num.value })
}

const onclickCancel = () => {
  visible.value = false
  resolveFlow!({ confirm: false })
}

let resolveFlow: Parameters<typeof Promise.prototype.then>[0]
let rejectFlow: Parameters<typeof Promise.prototype.then>[1]
let input: number = NaN
const title = ref('')
const show = (options: { input: number; title: string }) => {
  title.value = options.title
  input = options.input

  visible.value = true

  return new Promise<number | void>((resolve, reject) => {
    resolveFlow = resolve
    rejectFlow = reject
  })
}

defineExpose({
  show,
})
</script>
