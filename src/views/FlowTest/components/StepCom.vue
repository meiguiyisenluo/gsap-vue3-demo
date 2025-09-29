<template>
  <div v-if="visible">
    <h4>{{ title }}</h4>
    <button @click="onclickCancel">cancel</button>
    <button @click="onclickConfirm">confirm</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

defineOptions({
  name: 'FlowTest',
})

const props = defineProps<{
  title: string
  step: number
}>()

const visible = ref(false)

const onclickConfirm = () => {
  visible.value = false
  resolveFlow!(input + props.step)
}

const onclickCancel = () => {
  visible.value = false
  rejectFlow!('用户取消')
}

let resolveFlow: Parameters<typeof Promise.prototype.then>[0]
let rejectFlow: Parameters<typeof Promise.prototype.then>[1]
let input: number = NaN
const show = (options: { input: number }) => {
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
