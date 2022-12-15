<template>
    <div class="h3-panel">
      <div
        class="h3-panel-header"
        v-if="title"
        :class="[align,bold?'bold':'',vertical?'vertical':'']"
  
        @click="collapse">
  
        <i
          class="icon aufontAll h-icon-all-right-o"
          :class="{ expanded : show }"
          v-if="collapsible && !iconRight"
        />
  
        <span class="span-title" :style="labelStyle">{{ title }}</span>
        <a-tooltip placement="top" v-if="tips">
          <template slot="title">
            <span>{{ tips }}</span>
          </template>
        </a-tooltip>
  
        <i
          class="icon aufontAll h-icon-all-right-o"
          :class="{ expanded : show }"
          v-if="collapsible && iconRight"
        />
  
      </div>
      <div class="h3-panel-right">
        <slot name="fullIcon"></slot>
      </div>
  
      <transition name="h3-fade">
        <div class="h3-panel-body" v-show="show">
          <slot></slot>
        </div>
      </transition>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref, watch } from 'vue'
  const props = defineProps<{
    title?: string,
    tips?: string,
    collapsible?: boolean,
    collapsed?: boolean,
    align?: string,
    vertical?: boolean,
    labelStyle?: string,
    iconRight?: boolean,
    bold?: boolean,
  }>()

  let show = ref(true)
  const collapse = () => {
    if (props.collapsible) {
      show.value = !show.value
    }
  }
  watch(() => props.collapsed, (val) => {
    show.value = !val
  })

  </script>

<style lang="less" scoped>
@base10-padding-sm: 10px;
@base4-padding-sm: 12px;
.h3-panel {
  text-align: left;
  &.required > .h3-panel-header::before {
    content: "*";
    color: #F4454E;
    display: inline-block;
  }
}

.h3-panel-right {
  position: absolute;
  right: 0;
  top: 0;
  float: right;
  cursor: pointer;
  margin-top: 6px;
}
.h3-panel-header {
  width: 100%;
  display: inline-block;
  // align-items: center;
  text-align: left;
  padding: @base10-padding-sm 38px @base10-padding-sm @base10-padding-sm !important;
  position: relative;
  // border-bottom: 1px solid #979797;
  .anticon-question-circle{
    margin-right: 0px;
  }
  cursor: pointer;

  &.bold > span {
    font-weight: bold;
  }

  &.center {
    // justify-content: center;
    text-align: center;
  }

  &.right {
    // justify-content: flex-end;
    text-align: right;
  }

  &.left {
    text-align: left;
  }

  &.vertical {
    padding-left: 8px !important;
  }

  & > span {
    font-size: 14px;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.65);
  }

  & > i {
    margin-left: 0.5em;
    margin-right: 17px;
    font-size: 12px;
    display: inline-block;
    transition: transform 0.24s;

    &.expanded {
      transform: rotate(90deg);
    }
    color: rgba(0, 0, 0, 0.65);
    // & > svg {
    //   color: rgba(0, 0, 0, 0.65);
    // }
  }
}

.h3-panel-body {
  overflow: hidden;
}
.form-detail{
  .h3-panel {
    margin-bottom: 28px;
  }
  .h3-panel-header {
    i{
      line-height: 21px;
      vertical-align: text-bottom;
    }
    &:hover{
      background-color: #EEF3FF;
    }
  }
  .h3-panel-body {
    padding: 0 16px;
  }
}
.form-sheet{
  .h3-panel-header {
    padding-left: 0!important;
    i{
      line-height: 17px;
      font-size: 10px;
      vertical-align: text-bottom;
    }
  }
}
.h3-panel.xl > .h3-panel-header {
  padding: @base4-padding-sm 0;

  & > span {
    font-size: 18px;
  }
}

.h3-fade-enter-active,
.h3-fade-leave-active {
  max-height: 100rem;
  // transition: all 3s ease;
  transition: all 0.15s cubic-bezier(0.645, 0.045, 0.355, 1) !important;
}

.h3-fade-enter,
.h3-fade-leave-to {
  opacity: 0;
  max-height: 0;
}
</style>
