<template>
  <div class="designPanel">
    <a-slider :options="leftSider" @resize="onSiderToggle">
      <control-panel></control-panel>
    </a-slider>
    <div class="designBody">
      <div
          ref="designer"
          class="content"
          @drop="handleDrop"
          @dragover="handleDragOver"
          @mousedown="handleMouseDown"
          @mouseup="deselectCurComponent"
        >
        <a-list item-layout="horizontal" :data-source="componentList">
          <template #renderItem="{ item }">
            <a-list-item>
              {{item.type}}
              <component :is="item" :data-name="item"></component>
            </a-list-item>
          </template>
        </a-list>
        </div>
    </div>
    <a-slider :options="leftSider" @resize="onSiderToggle">
    </a-slider>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
import ASlider from "../../components/slider/slider.vue";
import { SiderOptions } from "../../components/slider/sider-options";
import ControlPanel from "/@/components/leftPanel/control-panel.vue";

import { getComponentAssets } from '/@/utils/component-assets'



export default defineComponent({
  components: getComponentAssets(),
  setup() {
    const clacMargin = ref(["left", "right"]);
    let componentList = ref<any>([])

    let cacheComponents = ref<any>({})
    cacheComponents.value = getComponentAssets(1)

    const setClacMagin = (str: string) => {
      let arr = clacMargin.value;
      if (arr.includes(str)) {
        arr = arr.filter((item) => item !== str);
      } else {
        arr.push(str);
      }
      clacMargin.value = arr;
    };
    const onSiderToggle = (str: string) => {
      console.log("------", str);
      // 动态设置margin
      setClacMagin(str);
    };

    const handleDrop = (e) => {
      e.preventDefault()
      e.stopPropagation()
      const ctrlCode = e.dataTransfer.getData('code')
      console.log("拖拉拽参数：", ctrlCode);
      let selectComp = cacheComponents.value[ctrlCode].component;
      selectComp.props.danger = true
      selectComp.props.name = "hello, world"
      componentList.value.push(
        selectComp.name
      )
    }

    const handleDragOver = (e) => {
      e.preventDefault()
      e.dataTransfer.dropEffect = 'copy'
    }

    const handleMouseDown = (e) => {
      e.stopPropagation()
    }

    const deselectCurComponent = () => {

    }

    const leftSider = ref({
      width: 238,
      minWidth: 238,
      maxWidth: 700,
      direction: "left",
      collapsible: true,
      collapsed: false,
      slider: false,
    } as SiderOptions);

    return {
      clacMargin,
      setClacMagin,
      onSiderToggle,
      componentList,
      handleDrop,
      handleDragOver,
      handleMouseDown,
      deselectCurComponent,
      leftSider
    }
  },

})










</script>

<style>
.designPanel {
  display: flex;
  flex-flow: row;
  height: 100%;
}
.designBody {
  flex: 1;
}
.content {
  height: 100%;
}
</style>