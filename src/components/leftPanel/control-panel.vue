<template>
<div>
    <panel v-for="(group,index) in groups"
      :title="group.name"
      :collapsible="true"
      :key="index"
      :bold="true">
        <div class="box">
            <control-block
                v-for="c in group.controls"
                @dragstart="handleDragStart"
                :key="c.code"
                :options="c"
                :data-code="c.code"
            ></control-block>
        </div>
    </panel>
</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import Panel from '../panel.vue'
import ControlBlock from "./control-block.vue";
import { getComponentAssets } from '/@/utils/component-assets'
const groups = ref([{
    name: '基础控件',
    controls: getComponentAssets(1)
}])

const handleDragStart = (e) => {
    e.dataTransfer.setData('code', e.target.dataset.code)
    console.log("当前参数dragStart:",e.target.dataset.code)
}

</script>

<style lang="less" scoped>
.box {
  text-align: left;
  padding-left: 8px;
}

:deep(.h3-panel-header){
    display: block !important;
}
</style>
