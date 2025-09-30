<template>
  <div>
    <button @click="startFlow">start flow</button>
    <StepCom ref="StepARef"></StepCom>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'FlowTest',
})

import LYSFlow from './LYSFlow'

import { useTemplateRef } from 'vue'
import StepCom from './components/StepCom.vue'

const StepARef = useTemplateRef<InstanceType<typeof StepCom>>('StepARef')

let flow: any = null

const startFlow = async () => {
  flow = new LYSFlow([
    {
      name: 'stepA',
      action: () => StepARef.value!.show({ title: 'stepA', input: 0 }),
      afterAction(res, resMap, next) {
        console.log(res, resMap)
        if (res.confirm) {
          next()
        } else {
          throw Error('用户取消')
        }
      },
    },
    {
      name: 'stepB',
      action: (lastOutput) => StepARef.value!.show({ title: 'stepB', input: lastOutput.value }),
      afterAction(res, resMap, next) {
        console.log(res, resMap)
        if (res.confirm) {
          next()
        } else {
          next('stepA')
        }
      },
    },
    {
      name: 'stepC',
      action: (lastOutput) => StepARef.value!.show({ title: 'stepC', input: lastOutput.value }),
      afterAction(res, resMap, next) {
        console.log(res, resMap)
        if (res.confirm) {
          next()
        } else {
          next('stepB')
        }
      },
    },
  ])
  flow.run()
}
</script>
