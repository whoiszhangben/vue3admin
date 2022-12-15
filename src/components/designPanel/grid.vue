<template>
    <div>
    <template v-for="(keys,index) in props.layout" :key="index">
      <control-container
        :index="index"
        :controlKeys="keys"
        :controls="props.controls"
        :clearParentShowEmptyTask="props.clearParentShowEmptyTask"
        @control-add="onControlAdd"
        @control-move="onControlMove"
        @control-delete="onControlDelete"
      ></control-container>
    </template>

    <control-container 
      :index="-2"
      :clearParentShowEmptyTask="clearParentShowEmptyTask"
      @control-add="onControlAdd" 
    ></control-container>
  </div>
</template>

<script lang="ts" setup>
import ControlContainer from './control-container.vue'
import {ref, provide } from 'vue'
const props = defineProps<{
    controls?: any,
    layout?: string[][],
    clearParentShowEmptyTask?: () => void;
    path?: string[],
}>()

let ctrlCKey = ref('')

provide('setCtrlCKey', (key: string) => {
    ctrlCKey.value = key
})

provide('getCtrlCKey', () => {
    return ctrlCKey.value
})

const onControlAdd = () => {
    console.log('trigger onControlAdd')
}
const onControlMove = () => {
    console.log('trigger onControlMove')
}

const onControlDelete = () => {
    console.log('trigger onControlDelete')
}

</script>

<style lang="less" scoped>
:deep(.ant-radio-wrapper)  {
  white-space: pre-wrap;
}
</style>
