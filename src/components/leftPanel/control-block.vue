<template>
    <div :title="text" :draggable="true" style="white-space:">
    {{ text }}
  </div>
</template>

<script lang='ts' setup>
import { computed } from "vue";

const props = defineProps<{
    options?: any
}>()

const text = computed(() => {
    const opts = props.options;
    let name = opts.name;
    return name;
})
</script>

<style lang="less" scoped>
@primary-color: #2970FF;
div {
  display: inline-block;
  align-items: center;
  font-size: 12px;
  font-family: PingFang-SC-Regular;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.65);
  width: 98px;
  height: 30px;
  background: rgba(0, 0, 0, 0.02);
  border: 1px dashed #d1d1d1;
  padding-left: 8px;
  cursor: move;
  margin-right: 8px;
  margin-bottom: 8px;
  line-height: 29px;
}

div.long {
  display: block;
  margin-bottom: 8px;
  width: calc(100% - 8px);
  height: 32px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

div > i {
  font-size: 12px;
  width: 12px;
  height: 12px;
  margin-right: 3px;
}

div.dragging,
div:hover {
  &:not(.disabled) {
    color: @primary-color;
    border-color: @primary-color;
  }
}
div.disabled {
  cursor: not-allowed;
  color: #d1d1d1;
}
</style>