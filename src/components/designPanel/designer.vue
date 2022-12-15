<template>
    <div class="designer">
    <div :class="warpCls">
      <div :class="`${warpCls}-header`"></div>

      <grid
        ref="grid"
        :class="`${warpCls}-content`"
        :controls="controls"
        :layout="layout"
        @change="onGridChange"
        @control-add="emitControlAdd"
        @control-delete="emitControlDelete"
      ></grid>
    </div>
    <div class="designer-drag-tips" v-if="showDragTips">
      <div>
        <img src="~@/assets/images/drag-tips.svg" />
        <p>请从左侧拖入控件</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Grid from "./grid.vue";
import { ref, provide } from 'vue'
const props = defineProps<{
    controls?: [],
    initLayout?: string[][],
    device?: string,
    warpCls?: string,
    formData?: any,
    showDragTips?: boolean
}>()
const emit = defineEmits(['control-add', 'control-delete', 'control-update', 'control-select'])
let selected = ref('') 
let ctrlCKey = ref('')
let layout = ref<string[][]>([])

provide("isSelected", (control: any) => {
    const localselected: any = selected.value;
    if (!localselected) {
      return false;
    }
    return (
        localselected.key === control.key && localselected.parentKey === control.parentKey
    );

})
provide('layoutTypeFn', () => {
    props.formData.layoutTypeFn = true;
    return localStorage.getItem("layoutType") === "vertical";
})

provide('setCtrlCKey', (key: string) => {
    ctrlCKey.value = key
})

provide('getCtrlCKey', () => {
    return ctrlCKey.value
})

provide('emitControlUpdate', (key: string, properties: { [key: string]: any }) => {
    emit('control-update',key, properties)
})

provide('emitControlSelect', (control: any) => {
    selected.value = control.selected;
    emit('control-select', control)
    if (control) {
        // item.focus()
    }
})

const onGridChange = (layoutParams: string[][]) => {
    layout.value = layoutParams
}

const emitControlAdd = (control: any, controlKey: string) => {
    emit('control-add', control, controlKey)
}

const emitControlDelete = (controlKey: string) => {
    emit('control-delete', controlKey)
}


</script>

<style lang="less" scoped>
.designer {
  position: relative;
  flex-grow: 1;
  overflow-y: auto;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  height: 100%;
  .designer-drag-tips {
    display: flex;
    justify-content: center;
    position: absolute;
    top: 290px;
    width: 100%;
    & > div {
      width: 160px;
      p {
        font-size: 14px;
        color: rgba(0, 0, 0, 0.65);
        margin-top: 14px;
        font-weight: 400;
      }
    }
  }

  & > .web-view {
    flex-grow: 1;
    display: flex;

    & > .web-view-content {
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      width: 100%;
      padding: 0 10px;
    }
  }

  :deep(.h-icon-all-down-o) {
    font-size: 12px;
  }
}

:deep(.ant-radio-wrapper)  {
  white-space: pre-wrap;
}
</style>