<template>
  <div>
    <button @click="startFlow">start flow</button>
    <StepCom ref="StepARef" title="StepA" :step="1"></StepCom>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'FlowTest',
})
import { useTemplateRef } from 'vue'
import StepCom from './components/StepCom.vue'

const StepARef = useTemplateRef<InstanceType<typeof StepCom>>('StepARef')

const startFlow = async () => {
  const res1 = await StepARef.value?.show({ input: 1 })
  console.log(res1)
}
</script>
