<template>
    <div class="smart-search clearfix">
      <div :class="{ collapsed: collapsed }">
        <div ref="queryFormLeft" class="query-form-left">
          <slot name="search"></slot>
        </div>
        <div class="query-form-right">
          <span v-show="queryWidth" @click="toggle">
            <span class="query-form__controller">{{
              collapsed ? '更多' : '收起'
            }}</span>
            <Icon type="down" :class="{ collapsed: collapsed }" />
          </span>
          <slot name="actions"></slot>
          <!-- <a-button style="margin-top: 14px" @click="$emit('reset')">
            重置
          </a-button>
          <a-button type="primary" @click="okBtn"> 查询 </a-button>
          <a-button @click="exportData"> 导出 </a-button> -->
        </div>
      </div>
    </div>
</template>

<script lang="ts" setup>
import Icon from '/@/components/Icon/index.vue';

    let collapsed = ref<boolean>(true);
    let screenWidth = ref<number>(document.body.clientWidth);
    let queryWidth = ref<boolean>(false);
    let timer = ref<boolean>(false);

    const emit = defineEmits(['search'])
    const queryFormLeft = ref()

    const onresize = () => {
        screenWidth.value = document.body.clientWidth;
        if (!timer.value) {
            timer.value = true;
            setTimeout(() => {
                isWidth();
                timer.value = false;
            }, 300)
        }
    }

    const isWidth = () => {
        const block: any = queryFormLeft.value
        if (!block) {
            return;
        }
        queryWidth.value = block.offsetHeight > 60;
    }
 
    const toggle = () => {
        collapsed.value = !collapsed.value;
    }

    const okBtn = () => {
        collapsed.value = true;
        emit('search')
    }

    const exportData = () => {

    }

    onMounted(() => {
        window.addEventListener('resize', onresize);
    })
    onUnmounted(() => {
        window.removeEventListener('resize', onresize);
    })
</script>

<style lang="less">
.smart-search {
  height: 32px;
  position: relative;
  & > div {
    padding: 0 24px;
    z-index: 10;
    position: absolute;
    background: #fcfcfc;
    box-shadow: 0px 1px 0px 0px #eeeeee;
    width: 100%;
    // border: solid 1px #eee;
    padding-top: 10px !important;
    padding-bottom: 10px !important;
    &.collapsed {
      overflow: hidden;
      height: 55px;
    }
    .query-form-left {
      float: left;
      width: calc(100% - 300px);
    }
    .query-form-right {
      float: left;
      width: 300px;
      position: relative;
      top: -13px;
      text-align: right;
      button {
        margin-left: 8px;
        &:first-of-type {
          margin-left: 16px;
        }
      }
      :deep(.ant-btn) {
        width: 60px;
        height: 32px;
        padding: 0 10px;
        &:focus {
          border-color: #d9d9d9;
          // color: rgba(17, 18, 24, 0.5);
        }
        &:hover {
          border-color: @primary-color;
          // color: @primary-color;
        }
      }

      i {
        transform: rotate(180deg);
        &.collapsed {
          transform: rotate(0);
        }
      }
    }
    .query-form__controller {
      cursor: pointer;
      margin-right: 8px;
      height: 20px;
      font-size: 14px;
      font-weight: 400;
      color: rgba(17, 18, 24, 0.5);
      line-height: 20px;
    }
  }
}
</style>